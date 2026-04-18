(function () {
  const STORAGE_USERS = "ascc-quiz-users";
  const STORAGE_SESSION = "ascc-quiz-session";
  const XP_PER_CORRECT = 15;
  const XP_PER_LEVEL = 280;
  const AVATAR_MAX_BYTES = 180000;

  const BADGE_TIERS = [
    { id: "bronze", label: "Bronze", minXp: 50, emoji: "\u{1F949}" },
    { id: "silver", label: "Silver", minXp: 200, emoji: "\u{1F948}" },
    { id: "gold", label: "Gold", minXp: 500, emoji: "\u{1F947}" },
    { id: "platinum", label: "Platinum", minXp: 1000, emoji: "\u2728" },
    { id: "diamond", label: "Diamond", minXp: 2200, emoji: "\u{1F48E}" },
    { id: "crown", label: "Crown", minXp: 4500, emoji: "\u{1F451}" }
  ];

  function loadUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_USERS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveUsers(list) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(list));
  }

  function findUser(name) {
    const key = name.trim().toLowerCase();
    return loadUsers().find(u => u.usernameLower === key) || null;
  }

  async function hashPassword(pw) {
    if (window.crypto?.subtle) {
      const enc = new TextEncoder().encode(pw + "|ascc-quiz-salt");
      const buf = await crypto.subtle.digest("SHA-256", enc);
      return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    }
    let h = 2166136261;
    const s = pw + "|fallback";
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return "fb_" + (h >>> 0).toString(16);
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s?.username) return null;
      return findUser(s.username);
    } catch {
      return null;
    }
  }

  function setSession(username) {
    if (!username) {
      localStorage.removeItem(STORAGE_SESSION);
      return;
    }
    localStorage.setItem(STORAGE_SESSION, JSON.stringify({ username }));
  }

  function updateUserRecord(updated) {
    const list = loadUsers();
    const i = list.findIndex(u => u.usernameLower === updated.usernameLower);
    if (i === -1) return;
    list[i] = updated;
    saveUsers(list);
  }

  function updateBestQuizScoreIfNeeded(runScore) {
    const u = getSession();
    if (!u || typeof runScore !== "number") return;
    const prev = u.bestScore ?? 0;
    if (runScore > prev) {
      u.bestScore = runScore;
      updateUserRecord(u);
    }
  }

  function findUserForLeaderboardEntry(entry) {
    if (!entry || typeof entry.name !== "string") return null;
    if (entry.usernameLower) {
      const key = String(entry.usernameLower).toLowerCase();
      return loadUsers().find(u => u.usernameLower === key) || null;
    }
    return findUser(entry.name);
  }

  function recomputeBadges(user) {
    const set = new Set(user.badges || []);
    BADGE_TIERS.forEach(t => {
      if (user.xp >= t.minXp) set.add(t.id);
    });
    user.badges = Array.from(set);
  }

  function xpLevelProgress(totalXp) {
    const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
    const into = totalXp % XP_PER_LEVEL;
    const pct = XP_PER_LEVEL > 0 ? (into / XP_PER_LEVEL) * 100 : 0;
    return { level, into, pct, nextAt: XP_PER_LEVEL };
  }

  function notify(msg, type = "success") {
    const host =
      document.getElementById("auth-toast") ||
      document.getElementById("profile-toast-host") ||
      document.getElementById("toast-start");
    if (!host) return;
    const t = document.createElement("div");
    t.className = "toast " + type;
    t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  function safeNextUrl(param) {
    if (!param || typeof param !== "string") return "index.html";
    const p = param.trim();
    if (!p.endsWith(".html")) return "index.html";
    if (p.includes("/") || p.includes("\\") || p.startsWith(".")) return "index.html";
    return p;
  }

  function resizeImageFile(file, maxDim, quality) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const dataUrl = c.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("image"));
      };
      img.src = url;
    });
  }

  function closeUserMenu() {
    const dd = document.getElementById("userMenuDropdown");
    const btn = document.getElementById("userMenuBtn");
    if (dd) dd.hidden = true;
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function openUserMenu() {
    const dd = document.getElementById("userMenuDropdown");
    const btn = document.getElementById("userMenuBtn");
    if (dd) dd.hidden = false;
    if (btn) btn.setAttribute("aria-expanded", "true");
  }

  function toggleUserMenu() {
    const dd = document.getElementById("userMenuDropdown");
    if (!dd) return;
    if (dd.hidden) openUserMenu();
    else closeUserMenu();
  }

  function syncUserMenu() {
    const wrap = document.getElementById("user-menu-wrap");
    const nameEl = document.getElementById("userMenuName");
    const img = document.getElementById("userMenuAvatar");
    const initial = document.getElementById("userMenuInitial");
    if (!wrap) return;

    const session = getSession();
    if (!session) {
      wrap.hidden = true;
      closeUserMenu();
      if (nameEl) nameEl.textContent = "";
      const menuBtn = document.getElementById("userMenuBtn");
      if (menuBtn) menuBtn.setAttribute("aria-label", "Account menu");
      return;
    }

    wrap.hidden = false;
    if (nameEl) nameEl.textContent = session.username;
    const menuBtn = document.getElementById("userMenuBtn");
    if (menuBtn) {
      menuBtn.setAttribute("aria-label", `Account menu, ${session.username}`);
    }
    if (session.avatar && img) {
      img.src = session.avatar;
      img.alt = session.username;
      img.style.display = "block";
      if (initial) initial.style.display = "none";
    } else if (img && initial) {
      img.removeAttribute("src");
      img.style.display = "none";
      initial.style.display = "flex";
      initial.textContent = (session.username.trim()[0] || "?").toUpperCase();
    }
  }

  function refreshStartScreenAuth() {
    const session = getSession();
    const guestBlock = document.getElementById("guest-block");
    const loggedBar = document.getElementById("logged-in-bar");
    const sessionName = document.getElementById("sessionDisplayName");

    if (guestBlock && loggedBar) {
      if (session) {
        guestBlock.style.display = "none";
        loggedBar.style.display = "flex";
        if (sessionName) sessionName.textContent = session.username;
      } else {
        guestBlock.style.display = "block";
        loggedBar.style.display = "none";
      }
    }

    syncUserMenu();
  }

  function renderProfile() {
    const u = getSession();
    const preview = document.getElementById("profileAvatarPreview");
    const fill = document.getElementById("profileXpFill");
    const levelEl = document.getElementById("profileLevelNum");
    const xpLabel = document.getElementById("profileXpLabel");
    const row = document.getElementById("profileBadgesRow");
    const placeholder = document.getElementById("profileAvatarPlaceholder");
    const totalXpEl = document.getElementById("profileTotalXp");
    if (!u || !fill || !row) return;

    const { level, into, pct, nextAt } = xpLevelProgress(u.xp);
    if (levelEl) levelEl.textContent = String(level);
    fill.style.width = pct + "%";
    if (xpLabel) {
      const curMin = (level - 1) * XP_PER_LEVEL;
      const curMax = level * XP_PER_LEVEL - 1;
      xpLabel.textContent = `${into} / ${nextAt} XP within level ${level} · Levels ${curMin}–${curMax} XP total`;
    }
    if (totalXpEl) totalXpEl.textContent = `${u.xp} XP total`;

    const bestEl = document.getElementById("profileBestScore");
    if (bestEl) bestEl.textContent = String(u.bestScore ?? 0);

    const levelsList = document.getElementById("profileLevelsList");
    if (levelsList) {
      const maxLevelShow = Math.max(12, level + 3);
      levelsList.innerHTML = "";
      for (let n = 1; n <= maxLevelShow; n++) {
        const minXp = (n - 1) * XP_PER_LEVEL;
        const maxXp = n * XP_PER_LEVEL - 1;
        const rowEl = document.createElement("div");
        rowEl.className =
          "profile-level-row-item" + (n === level ? " profile-level-row-item--current" : "");
        rowEl.innerHTML =
          `<span class="profile-level-num">Level ${n}</span>` +
          `<span class="profile-level-range">${minXp} – ${maxXp} XP total</span>`;
        rowEl.title = `Reach level ${n + 1} at ${n * XP_PER_LEVEL} XP total`;
        levelsList.appendChild(rowEl);
      }
    }

    if (preview) {
      if (u.avatar) {
        preview.src = u.avatar;
        preview.style.display = "block";
        if (placeholder) placeholder.style.display = "none";
      } else {
        preview.removeAttribute("src");
        preview.style.display = "none";
        if (placeholder) placeholder.style.display = "block";
      }
    }

    row.innerHTML = "";
    const earned = new Set(u.badges || []);
    BADGE_TIERS.forEach(t => {
      const el = document.createElement("div");
      el.className = "profile-badge" + (earned.has(t.id) ? " profile-badge--earned" : "");
      el.innerHTML =
        `<span class="profile-badge-emoji" aria-hidden="true">${t.emoji}</span>` +
        `<span class="profile-badge-label">${t.label}</span>` +
        `<span class="profile-badge-meta">${t.minXp}+ XP</span>`;
      el.title = earned.has(t.id) ? "Unlocked" : `Earn ${t.minXp} total XP`;
      row.appendChild(el);
    });
  }

  function addQuizRewards(correctAnswersThisRun) {
    const u = getSession();
    if (!u || typeof correctAnswersThisRun !== "number") return null;

    const beforeBadges = new Set(u.badges || []);
    const gained = correctAnswersThisRun * XP_PER_CORRECT;
    u.xp += gained;
    recomputeBadges(u);
    updateUserRecord(u);

    const newBadges = BADGE_TIERS.filter(
      t => u.badges.includes(t.id) && !beforeBadges.has(t.id)
    );
    return { gained, totalXp: u.xp, newBadges };
  }

  function addBonusXp(amount) {
    const u = getSession();
    if (!u || typeof amount !== "number" || amount <= 0) return false;
    u.xp += amount;
    recomputeBadges(u);
    updateUserRecord(u);
    return true;
  }

  function getDisplayPlayerName(fallbackInput) {
    const s = getSession();
    if (s) return s.username;
    return (fallbackInput || "").trim();
  }

  function isLoggedIn() {
    return !!getSession();
  }

  function initHomePage() {
    refreshStartScreenAuth();

    const menuBtn = document.getElementById("userMenuBtn");
    const logoutMenu = document.getElementById("userMenuLogout");

    if (menuBtn) {
      menuBtn.addEventListener("click", e => {
        e.stopPropagation();
        toggleUserMenu();
      });
    }

    document.addEventListener("click", () => closeUserMenu());
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeUserMenu();
    });

    if (logoutMenu) {
      logoutMenu.addEventListener("click", e => {
        e.stopPropagation();
        closeUserMenu();
        setSession(null);
        refreshStartScreenAuth();
        notify("Logged out", "success");
      });
    }
  }

  function initLoginPage() {
    const loginSubmit = document.getElementById("loginSubmit");
    if (!loginSubmit) return;
    loginSubmit.addEventListener("click", async () => {
      const userEl = document.getElementById("loginUsername");
      const passEl = document.getElementById("loginPassword");
      const username = userEl?.value?.trim();
      const password = passEl?.value || "";
      if (!username || !password) {
        notify("Enter username and password", "error");
        return;
      }
      const u = findUser(username);
      if (!u) {
        notify("User not found", "error");
        return;
      }
      const h = await hashPassword(password);
      if (h !== u.passwordHash) {
        notify("Wrong password", "error");
        return;
      }
      setSession(u.username);
      if (passEl) passEl.value = "";
      notify("Logged in!", "success");
      const params = new URLSearchParams(window.location.search);
      const next = safeNextUrl(params.get("next"));
      setTimeout(() => {
        window.location.href = next;
      }, 400);
    });
  }

  function initSignupPage() {
    const signupSubmit = document.getElementById("signupSubmit");
    if (!signupSubmit) return;
    signupSubmit.addEventListener("click", async () => {
      const userEl = document.getElementById("signupUsername");
      const passEl = document.getElementById("signupPassword");
      const pass2El = document.getElementById("signupPassword2");
      const username = userEl?.value?.trim();
      const password = passEl?.value || "";
      const password2 = pass2El?.value || "";
      if (!username || username.length < 2) {
        notify("Username at least 2 characters", "error");
        return;
      }
      if (password.length < 4) {
        notify("Password at least 4 characters", "error");
        return;
      }
      if (password !== password2) {
        notify("Passwords do not match", "error");
        return;
      }
      if (findUser(username)) {
        notify("Username already taken", "error");
        return;
      }
      const passwordHash = await hashPassword(password);
      const nu = {
        username,
        usernameLower: username.toLowerCase(),
        passwordHash,
        xp: 0,
        bestScore: 0,
        avatar: "",
        badges: []
      };
      recomputeBadges(nu);
      const list = loadUsers();
      list.push(nu);
      saveUsers(list);
      setSession(username);
      if (passEl) passEl.value = "";
      if (pass2El) pass2El.value = "";
      notify("Account created! Redirecting…", "success");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
    });
  }

  function initProfilePage() {
    if (!getSession()) {
      window.location.replace("login.html?next=profile.html");
      return;
    }
    renderProfile();
    const avatarInput = document.getElementById("profileAvatarInput");
    if (avatarInput) {
      avatarInput.addEventListener("change", async () => {
        const u = getSession();
        const file = avatarInput.files?.[0];
        if (!u || !file) return;
        if (!file.type.startsWith("image/")) {
          notify("Choose an image file", "error");
          return;
        }
        try {
          let dataUrl = await resizeImageFile(file, 160, 0.82);
          if (dataUrl.length > AVATAR_MAX_BYTES) {
            dataUrl = await resizeImageFile(file, 96, 0.65);
          }
          if (dataUrl.length > AVATAR_MAX_BYTES) {
            notify("Image too large — try a smaller photo", "error");
            return;
          }
          u.avatar = dataUrl;
          updateUserRecord(u);
          renderProfile();
          notify("Avatar updated", "success");
        } catch {
          notify("Could not read image", "error");
        }
        avatarInput.value = "";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body?.dataset?.page || "home";
    if (page === "home") initHomePage();
    else if (page === "login") initLoginPage();
    else if (page === "signup") initSignupPage();
    else if (page === "profile") initProfilePage();
  });

  window.ProfileApp = {
    getSession,
    getDisplayPlayerName,
    isLoggedIn,
    addQuizRewards,
    addBonusXp,
    updateBestQuizScoreIfNeeded,
    findUserForLeaderboardEntry,
    refreshStartScreenAuth,
    syncUserMenu,
    renderProfile,
    BADGE_TIERS,
    XP_PER_CORRECT,
    XP_PER_LEVEL
  };
})();

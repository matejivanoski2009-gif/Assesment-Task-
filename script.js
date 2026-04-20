const order = ["easy", "medium", "hard"];
const QUESTION_SEC = 15;
const CORRECT_ADVANCE_MS = 700;
const STREAK_LENGTH = 3;
const STREAK_BONUS_XP = 100;

let selectedTopic = "Sequence";
let levelIndex = 0;
let questions = [];
let current = 0;

let playerName = "";
let score = 0;
let levelScore = 0;

let correctIndex = 0;
let answered = false;

let timer = QUESTION_SEC;
let interval;

let incorrectQuestions = [];
let retryMode = false;
let questionsToRetry = [];

let correctStreak = 0;

// UI
const qEl = document.getElementById("question");
const questionMeta = document.getElementById("question-meta");
const choices = document.querySelectorAll(".choice");
const timerEl = document.getElementById("timer");
const progress = document.getElementById("progress");
const quizContainer = document.querySelector(".quiz-container");

const lb = document.getElementById("leaderboard");
const lbBox = document.getElementById("leaderboard-container");
const finalScore = document.getElementById("final-score");

// ================= AUDIO =================
let audioCtx;

function getAudioContext() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AC();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone(freq, startTime, duration, type, peakGain) {
  if (window.QuizAudio && QuizAudio.isMuted()) return;
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.connect(g);
  g.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = type;
  g.gain.setValueAtTime(0, startTime);
  g.gain.linearRampToValueAtTime(peakGain, startTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

function playCorrectSound() {
  const ctx = getAudioContext();
  const t = ctx.currentTime;
  playTone(523.25, t, 0.12, "sine", 0.14);
  playTone(659.25, t + 0.1, 0.14, "sine", 0.12);
  playTone(783.99, t + 0.2, 0.22, "sine", 0.1);
}

function playWrongSound() {
  const ctx = getAudioContext();
  const t = ctx.currentTime;
  playTone(180, t, 0.22, "triangle", 0.12);
  playTone(120, t + 0.18, 0.32, "triangle", 0.08);
}

// ================= CONFETTI =================
function launchConfetti(durationMs = 5000) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9000;";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const colors = ["#ffeb3b", "#00ffcc", "#00aaff", "#ff3d00", "#e040fb", "#fff59d", "#69f0ae"];
  const pieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height * 0.5,
    w: Math.random() * 10 + 5,
    h: Math.random() * 7 + 3,
    vy: Math.random() * 2.5 + 1.5,
    vx: Math.random() * 5 - 2.5,
    rot: Math.random() * Math.PI * 2,
    vr: Math.random() * 0.15 - 0.075,
    c: colors[(Math.random() * colors.length) | 0]
  }));

  const start = performance.now();

  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (elapsed < durationMs) {
      requestAnimationFrame(frame);
    } else {
      window.removeEventListener("resize", resize);
      canvas.remove();
    }
  }
  requestAnimationFrame(frame);
}

// ================= STREAK (on fire) =================
function playStreakSound() {
  const ctx = getAudioContext();
  const t = ctx.currentTime;
  playTone(392, t, 0.08, "sine", 0.12);
  playTone(523.25, t + 0.07, 0.1, "sine", 0.14);
  playTone(659.25, t + 0.15, 0.12, "sine", 0.12);
  playTone(783.99, t + 0.24, 0.18, "sine", 0.1);
}

function launchStreakFire(durationMs = 2600) {
  const overlay = document.createElement("div");
  overlay.className = "streak-fire-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML =
    `<div class="streak-fire-side streak-fire-side--left" aria-hidden="true">` +
    `<span class="streak-fire-emoji-side">🔥</span>` +
    `<span class="streak-fire-side-msg">You're on fire!</span>` +
    `</div>` +
    `<div class="streak-fire-side streak-fire-side--right" aria-hidden="true">` +
    `<span class="streak-fire-side-msg">You're on fire!</span>` +
    `<span class="streak-fire-emoji-side">🔥</span>` +
    `</div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("streak-fire-overlay--show"));
  setTimeout(() => {
    overlay.classList.remove("streak-fire-overlay--show");
    setTimeout(() => overlay.remove(), 450);
  }, durationMs);
}

function resetAnswerStreak() {
  correctStreak = 0;
}

function tryStreakReward() {
  if (correctStreak < STREAK_LENGTH || correctStreak % STREAK_LENGTH !== 0) return;

  playStreakSound();
  launchStreakFire();

  if (
    window.ProfileApp &&
    typeof ProfileApp.addBonusXp === "function" &&
    ProfileApp.addBonusXp(STREAK_BONUS_XP)
  ) {
    if (typeof ProfileApp.syncUserMenu === "function") ProfileApp.syncUserMenu();
    toast(`+${STREAK_BONUS_XP} XP streak bonus!`, "success");
  } else {
    toast("Hot streak! Log in to save bonus XP on your profile.", "success");
  }
}

// ================= TOAST =================
function toast(msg, type = "success") {
  const t = document.createElement("div");
  t.className = "toast " + type;
  t.textContent = msg;
  const startScreen = document.getElementById("start-screen");
  const host =
    startScreen.style.display === "none"
      ? document.getElementById("toast")
      : document.getElementById("toast-start");
  host.appendChild(t);
  setTimeout(() => t.remove(), 5000);
}

// ================= START =================
document.getElementById("startBtn").addEventListener("click", () => {
  const nameInput = document.getElementById("username").value;
  const topic = document.getElementById("topic").value;

  const name =
    window.ProfileApp && typeof ProfileApp.getDisplayPlayerName === "function"
      ? ProfileApp.getDisplayPlayerName(nameInput)
      : nameInput.trim();

  if (!name) return toast("Enter your name or log in", "error");

  playerName = name;
  selectedTopic = topic;
  if (window.QuizAudio && typeof QuizAudio.tryStartAmbient === "function") {
    QuizAudio.tryStartAmbient();
  }
  getAudioContext();

  document.getElementById("start-screen").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";

  levelIndex = 0;
  score = 0;
  incorrectQuestions = []; // Clear for new quiz
  questionsToRetry = []; // Clear retry questions
  retryMode = false; // Reset retry mode
  resetAnswerStreak();

  startLevel();
});

// ================= LEVEL =================
function startLevel() {
  const level = order[levelIndex];

  questions = [...quizData[selectedTopic][level]];
  current = 0;
  levelScore = 0;
  incorrectQuestions = []; // Clear incorrect questions for new level

  startTimer();
  loadQuestion();
}

// ================= TIMER =================
function startTimer() {
  clearInterval(interval);

  timer = QUESTION_SEC;
  timerEl.textContent = "Time: " + timer + "s";

  interval = setInterval(() => {
    timer--;
    if (timer > 0) {
      timerEl.textContent = "Time: " + timer + "s";
      return;
    }

    clearInterval(interval);
    interval = null;
    timerEl.textContent = "Time: 0s";

    if (!answered) {
      playWrongSound();
      toast("Time ran out!", "error");
      resetAnswerStreak();
      startLevel();
    } else {
      nextQuestion();
    }
  }, 1000);
}

// ================= LOAD =================
function loadQuestion() {
  answered = true;
  if (quizContainer) quizContainer.classList.add("quiz-fade-out");

  window.setTimeout(() => {
    const q = questions[current];

    let options = [...q.o]
      .map(v => ({ v, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(v => v.v);

    correctIndex = options.indexOf(q.a);

    qEl.textContent = q.q;

    const difficultyLabel = retryMode
      ? "Retry"
      : (order[levelIndex]
        ? order[levelIndex].charAt(0).toUpperCase() + order[levelIndex].slice(1)
        : "");
    questionMeta.textContent = `${difficultyLabel} • Question ${current + 1} of ${questions.length}`;

    choices.forEach((b, i) => {
      b.textContent = options[i];
      b.classList.remove("is-correct", "is-wrong");
    });

    progress.style.width = (current / questions.length) * 100 + "%";
    if (quizContainer) quizContainer.classList.remove("quiz-fade-out");
    answered = false;
  }, 200);
}

// ================= ANSWER =================
function selectAnswer(i) {
  if (answered) return;
  answered = true;

  const correct = i === correctIndex;

  if (correct) {
    levelScore++;
    correctStreak++;
    choices[i].classList.add("is-correct");
    playCorrectSound();
    toast("Correct!", "success");
    tryStreakReward();
    clearInterval(interval);
    interval = null;
    timerEl.textContent = "Time: " + timer + "s";
    setTimeout(() => nextQuestion(), CORRECT_ADVANCE_MS);
  } else {
    resetAnswerStreak();
    choices[i].classList.add("is-wrong");
    choices[correctIndex].classList.add("is-correct");
    playWrongSound();
    toast("Wrong!", "error");
    // Track incorrect question
    incorrectQuestions.push(questions[current]);
  }
}

// ================= NEXT =================
function nextQuestion() {
  if (!answered) return;

  current++;

  if (current < questions.length) {
    startTimer();
    loadQuestion();
  } else {
    if (retryMode) {
      showFinal();
    } else {
      finishLevel();
    }
  }
}

// ================= FINISH LEVEL =================
function finishLevel() {
  clearInterval(interval);
  answered = true;

  let percent = (levelScore / questions.length) * 100;
  const level = order[levelIndex];

  if (percent >= 70) {
    toast("Passed " + level, "success");
    score += levelScore;
    levelIndex++;

    if (levelIndex < order.length) {
      startLevel();
    } else {
      showFinal();
    }
  } else {
    toast("Failed " + level, "error");
    resetAnswerStreak();
    startLevel();
  }
}

// ================= FINAL =================
function showFinal() {
  resetAnswerStreak();
  launchConfetti();

  qEl.textContent = "";
  timerEl.textContent = "";
  progress.style.width = "0%";

  document.querySelector(".choices").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";

  let finalLine = `${playerName} finished with score: ${score}`;
  if (window.ProfileApp && ProfileApp.isLoggedIn()) {
    const r = ProfileApp.addQuizRewards(score);
    if (r) {
      finalLine += ` · +${r.gained} XP`;
      if (r.newBadges.length) {
        finalLine += ` · New badge: ${r.newBadges.map(b => b.label).join(", ")}`;
      }
    }
    if (typeof ProfileApp.updateBestQuizScoreIfNeeded === "function") {
      ProfileApp.updateBestQuizScoreIfNeeded(score);
    }
  }
  finalScore.textContent = finalLine;

  const lastRunId = save();
  render(lastRunId);

  lbBox.style.display = "block";

  // Add retry incorrect questions button if there are incorrect questions
  if (incorrectQuestions.length > 0) {
    questionsToRetry = [...incorrectQuestions]; // Store for retry
    const retryBtn = document.createElement("button");
    retryBtn.textContent = `Retry ${incorrectQuestions.length} Incorrect Question${incorrectQuestions.length === 1 ? '' : 's'}`;
    retryBtn.style.width = "100%";
    retryBtn.style.marginTop = "10px";
    retryBtn.onclick = () => retryIncorrectQuestions();
    lbBox.appendChild(retryBtn);
  }

  const btn = document.createElement("button");
  btn.textContent = "Start Again";
  btn.style.width = "100%";
  btn.style.marginTop = "10px";

  btn.onclick = () => location.reload();

  lbBox.appendChild(btn);
}

// ================= RETRY INCORRECT QUESTIONS =================
function retryIncorrectQuestions() {
  // Reset quiz state
  levelIndex = 0;
  score = 0;
  current = 0;
  levelScore = 0;
  retryMode = true; // Enable retry mode
  resetAnswerStreak();
  incorrectQuestions = []; // Clear for the retry session

  // Set questions to only the incorrect ones
  questions = [...questionsToRetry];

  // Hide final screen and show quiz
  document.getElementById("leaderboard").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  document.querySelector(".choices").style.display = "flex";
  document.getElementById("nextBtn").style.display = "block";

  // Start the retry quiz
  startTimer();
  loadQuestion();
}

// ================= LEADERBOARD =================
function save() {
  let data = JSON.parse(localStorage.getItem("lb")) || [];

  const id = crypto.randomUUID();
  const entry = { name: playerName, score, id };
  if (window.ProfileApp && ProfileApp.isLoggedIn()) {
    const u = ProfileApp.getSession();
    if (u?.usernameLower) entry.usernameLower = u.usernameLower;
  }
  data.push(entry);

  localStorage.setItem("lb", JSON.stringify(data.slice(-5)));
  return id;
}

function render(highlightId) {
  let data = JSON.parse(localStorage.getItem("lb")) || [];

  data = [...data].sort((a, b) => b.score - a.score);

  lb.innerHTML = "";

  data.forEach((e, i) => {
    const li = document.createElement("li");
    const left = document.createElement("div");
    left.className = "lb-row-left";

    const rank = document.createElement("span");
    rank.className = "lb-rank";
    rank.textContent = `${i + 1}.`;

    const account =
      window.ProfileApp && typeof ProfileApp.findUserForLeaderboardEntry === "function"
        ? ProfileApp.findUserForLeaderboardEntry(e)
        : null;

    if (account?.avatar) {
      const img = document.createElement("img");
      img.className = "lb-avatar";
      img.src = account.avatar;
      img.alt = "";
      left.appendChild(img);
    } else if (account) {
      const initial = document.createElement("span");
      initial.className = "lb-avatar lb-avatar--initial";
      initial.textContent = (account.username?.trim()[0] || "?").toUpperCase();
      initial.setAttribute("aria-hidden", "true");
      left.appendChild(initial);
    }

    const nameEl = document.createElement("span");
    nameEl.className = "lb-name-only";
    nameEl.textContent = e.name;

    left.prepend(rank);
    left.appendChild(nameEl);

    const scoreEl = document.createElement("span");
    scoreEl.className = "lb-score-val";
    scoreEl.textContent = String(e.score);

    li.appendChild(left);
    li.appendChild(scoreEl);

    if (highlightId && e.id === highlightId) {
      li.classList.add("leaderboard-current");
    }
    lb.appendChild(li);
  });
}

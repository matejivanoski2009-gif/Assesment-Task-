(function () {
  const MUTE_KEY = "ascc-quiz-muted";
  /** Put your file next to index.html (same folder as this script’s page). */
  const AMBIENT_MP3_URL = "ambient.mp3";

  const AMBIENT_FADE_IN_MS = 1400;
  const AMBIENT_FADE_OUT_MS = 400;
  const MEDIA_VOLUME = 0.5;
  const SYNTH_MASTER_PEAK = 0.38;

  /** @type {"media" | "synth" | null} */
  let ambientMode = null;
  let mediaUnavailable = false;
  /** @type {HTMLAudioElement | null} */
  let mediaAudio = null;
  let mediaRampRaf = 0;

  let ambientCtx = null;
  let ambientMaster = null;
  let ambientBuilt = false;

  function isMuted() {
    return localStorage.getItem(MUTE_KEY) === "1";
  }

  function setMuted(muted) {
    if (muted) localStorage.setItem(MUTE_KEY, "1");
    else localStorage.removeItem(MUTE_KEY);
    syncMuteButton();
    if (muted) fadeAmbientOut();
    else tryStartAmbient();
  }

  function toggleMuted() {
    setMuted(!isMuted());
  }

  function syncMuteButton() {
    const btn = document.getElementById("muteToggle");
    if (!btn) return;
    const muted = isMuted();
    btn.textContent = muted ? "Unmute" : "Mute";
    btn.setAttribute("aria-pressed", muted ? "true" : "false");
    btn.setAttribute(
      "aria-label",
      muted ? "Unmute quiz sounds and background music" : "Mute quiz sounds and background music"
    );
  }

  function cancelMediaRamp() {
    if (mediaRampRaf) {
      cancelAnimationFrame(mediaRampRaf);
      mediaRampRaf = 0;
    }
  }

  function rampMediaVolume(el, from, to, ms, onDone) {
    cancelMediaRamp();
    const t0 = performance.now();
    function tick(now) {
      const u = Math.min(1, (now - t0) / ms);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * u));
      if (u < 1) {
        mediaRampRaf = requestAnimationFrame(tick);
      } else {
        mediaRampRaf = 0;
        if (onDone) onDone();
      }
    }
    mediaRampRaf = requestAnimationFrame(tick);
  }

  function ensureMediaElement() {
    if (mediaAudio) return mediaAudio;
    mediaAudio = new Audio(AMBIENT_MP3_URL);
    mediaAudio.loop = true;
    mediaAudio.preload = "auto";
    return mediaAudio;
  }

  /**
   * @returns {Promise<"media" | "synth" | "abort">}
   */
  async function tryBeginMediaAmbient() {
    if (mediaUnavailable) return "synth";
    const el = ensureMediaElement();
    el.volume = 0;
    try {
      await el.play();
    } catch {
      mediaUnavailable = true;
      try {
        el.pause();
      } catch {
        /* ignore */
      }
      mediaAudio = null;
      return "synth";
    }
    if (isMuted()) {
      el.pause();
      return "abort";
    }
    rampMediaVolume(el, 0, MEDIA_VOLUME, AMBIENT_FADE_IN_MS);
    return "media";
  }

  async function resumeMediaAmbient() {
    if (!mediaAudio || isMuted()) return;
    cancelMediaRamp();
    mediaAudio.volume = 0;
    try {
      await mediaAudio.play();
    } catch {
      return;
    }
    if (isMuted()) {
      mediaAudio.pause();
      return;
    }
    rampMediaVolume(mediaAudio, 0, MEDIA_VOLUME, AMBIENT_FADE_IN_MS);
  }

  function fadeMediaOut() {
    if (!mediaAudio) return;
    cancelMediaRamp();
    const el = mediaAudio;
    const from = el.volume;
    rampMediaVolume(el, from, 0, AMBIENT_FADE_OUT_MS, () => {
      try {
        el.pause();
      } catch {
        /* ignore */
      }
    });
  }

  function buildAmbientPad() {
    if (ambientBuilt) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;

    ambientCtx = new AC();
    const ctx = ambientCtx;

    ambientMaster = ctx.createGain();
    ambientMaster.gain.value = 0;
    ambientMaster.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1100;
    filter.Q.value = 0.4;
    filter.connect(ambientMaster);

    const freqs = [220, 277.18, 329.63];
    const branchGains = [0.07, 0.055, 0.045];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "triangle" : "sine";
      const g = ctx.createGain();
      g.gain.value = branchGains[i];
      osc.connect(g);
      g.connect(filter);
      osc.frequency.value = freq;
      osc.start();
    });

    ambientBuilt = true;
  }

  function fadeSynthOut() {
    if (!ambientCtx || !ambientMaster) return;
    const ctx = ambientCtx;
    const now = ctx.currentTime;
    try {
      ambientMaster.gain.cancelScheduledValues(now);
      const cur = ambientMaster.gain.value;
      ambientMaster.gain.setValueAtTime(cur, now);
      ambientMaster.gain.linearRampToValueAtTime(0, now + AMBIENT_FADE_OUT_MS / 1000);
    } catch {
      /* ignore */
    }
  }

  function fadeSynthIn() {
    if (!ambientCtx || !ambientMaster || isMuted()) return;
    const ctx = ambientCtx;

    function scheduleRamp() {
      if (!ambientMaster || isMuted()) return;
      const now = ctx.currentTime;
      try {
        ambientMaster.gain.cancelScheduledValues(now);
        ambientMaster.gain.setValueAtTime(0, now);
        ambientMaster.gain.linearRampToValueAtTime(
          SYNTH_MASTER_PEAK,
          now + AMBIENT_FADE_IN_MS / 1000
        );
      } catch {
        /* ignore */
      }
    }

    const p = ctx.resume();
    if (p && typeof p.then === "function") {
      p.then(scheduleRamp).catch(scheduleRamp);
    } else {
      scheduleRamp();
    }
  }

  function fadeAmbientOut() {
    if (ambientMode === "media" && mediaAudio) {
      fadeMediaOut();
      return;
    }
    fadeSynthOut();
  }

  function tryStartAmbient() {
    if (isMuted()) return;

    if (ambientMode === "media") {
      void resumeMediaAmbient();
      return;
    }

    if (ambientMode === "synth") {
      buildAmbientPad();
      if (ambientCtx && ambientMaster) fadeSynthIn();
      return;
    }

    void (async () => {
      const outcome = await tryBeginMediaAmbient();
      if (isMuted()) {
        if (mediaAudio) {
          try {
            mediaAudio.pause();
          } catch {
            /* ignore */
          }
        }
        return;
      }
      if (outcome === "media") {
        ambientMode = "media";
      } else if (outcome === "synth") {
        ambientMode = "synth";
        buildAmbientPad();
        if (ambientCtx && ambientMaster) fadeSynthIn();
      }
    })();
  }

  function onFirstPointer() {
    tryStartAmbient();
    document.removeEventListener("pointerdown", onFirstPointer, true);
  }

  document.addEventListener("DOMContentLoaded", () => {
    syncMuteButton();
    const muteBtn = document.getElementById("muteToggle");
    if (muteBtn) {
      muteBtn.addEventListener("click", () => toggleMuted());
    }
    document.addEventListener("pointerdown", onFirstPointer, true);
  });

  window.QuizAudio = {
    isMuted,
    tryStartAmbient
  };
})();

// =====================================================================
// EDIT ME: everything personal lives in this CONFIG object.
// Replace the placeholder values below with your own words, memories
// and (optionally) real photo paths. Nothing else needs to change.
// =====================================================================
const CONFIG = {
  herName: "Ramya",
  nickname: "Kunji",
  yourName: "Sivaram",

  // Birthday the countdown on the final page counts down to.
  birthdayISO: "2026-12-31T00:00:00",

  // ---- Stage 1: trivia -------------------------------------------------
  // type "mcq"  -> choices[] + correct (index)
  // type "fill" -> answers[] of acceptable lowercase strings (any match passes)
  trivia: [
    {
      type: "mcq",
      question: "Nama eppadi first pesa aarambichom?",
      choices: [
        "Common friend introduce pannanga",
        "Naan unga Insta profile pathu request anuppi 'Hi' sonnen",
        "Nee enaku DM pannitta",
        "College la nerla paatom",
      ],
      correct: 1,
    },
    {
      type: "mcq",
      question: "First day naan 'Hi' sonnappo, nee enna pannina?",
      choices: ["Udane reply pannita", "Reply pannama iruntha", "Block pannitta", "Screenshot edutha"],
      correct: 1,
    },
    {
      type: "fill",
      question: "Rendaavathu naal naan thirumba 'Hi' sonnappo, nee enna nu nenachika? (one word)",
      answers: ["sarcasm", "joke", "joking", "kalaichufying", "kalaichu"],
    },
  ],

  // ---- Stage 2: riddle ---------------------------------------------------
  riddle: {
    question: "“Naan unakku propose pannura munnadi, naama evlo naal mattum pesi irundhom?”",
    answers: ["7", "one week", "1 week", "a week", "week", "oru vaaram"],
    hint: "Weekend kooda full ah varala, adhukulla dhaan decide aagiduchu 😄",
  },

  // ---- Stage 3: memory match icons (6 pairs = 12 cards) ------------------
  // 📱 DM · 💌 propose · 🎬 movie date · 🌊 beach date · ☕ cafe date · 💍 engagement talk
  memoryIcons: ["📱", "💌", "🎬", "🌊", "☕", "💍"],

  // ---- Stage 4: tap-the-letters phrase ------------------------------------
  unscramblePhrase: "YOU SAID OKAY",

  // ---- Final reveal: photo memories ---------------------------------------
  // Leave src as null to show a placeholder box with the caption.
  // These captions are kept generic on purpose — any real photo of you two
  // fits, no need for a photo matching each specific story beat (those
  // already live in the love letter + memory match icons above).
  photos: [
    { src: "assets/photo1.jpg", caption: "Namma rendu peru 💜", emoji: "💜" },
    { src: "assets/photo2.webp", caption: "Unna paakkum pothe ellam smile vandhuchu 😊", emoji: "😊" },
    { src: "assets/photo3.jpg", caption: "Enga best memories ellam ippadithaan 🤍", emoji: "🤍" },
    { src: "assets/photo4.webp", caption: "Namma pannicha first outing 🧡", emoji: "🧡" },
    { src: "assets/photo5.jpg", caption: "Enga oru chinna world 🤍", emoji: "🤍" },
  ],

  // ---- Final reveal: the love letter (each string = one paragraph) --------
  loveLetter: [
    "Kunji,",
    "Oru naal Instagram scroll pannikittu irundhapo, unga profile pathen, request anuppi 'Hi' sonnen. First day reply varala. Adutha naalu naan again 'Hi' sonnen, appo thaan nee reply pannina.",
    "Nee first ah ennai sarcasm nu nenachika, naan serious nu convince panna konjam time pudichiduchu. Aana enaku yenno unna yengayo patha maari oru feel vandhuchu.",
    "Vaaram onnu pesina odane naan propose pannen, adutha naale nee 'okay' sonna — andha chinna oru vaarthai thaan namma full story ah maathichu.",
    "Meet panna full one month aachu, but finally sandichom — movie date, beach date, cafe date, ella memory um enaku romba pidichurukku.",
    "Unga appa shock aana naal irundhu, naan unga appa kooda pesi, avanga enaya pudikkira varaikkum wait pannen. Ippo rendu side family um happy, namma engagement pathi pesikittu irukom — April la edho oru nalla date varum.",
    "I love you Kunji. Indha journey mulusa unakkaga thaan — happy birthday en pakka favorite person 💜",
  ],

  // ---- Final reveal: the extra surprise text (edit this with your actual plan!) ----
  specialSurprise:
    "P.S. — Engagement pathi namma pesikittu irukom, April la edho oru special date wait pannikittu irukku... adhu varaikkum idha oru chinna reminder ah vechikko, naan unna evlo love pannuren nu 👀💍",
};

// =====================================================================
// App logic — you shouldn't need to touch anything below this line.
// =====================================================================
const STAGE_ORDER = [
  "stage-splash",
  "stage-1",
  "stage-2",
  "stage-3",
  "stage-4",
  "stage-5",
  "stage-final",
];

let currentStageIndex = 0;

function goToStage(id) {
  document.querySelectorAll(".stage").forEach((el) => el.classList.remove("active"));
  const next = document.getElementById(id);
  next.classList.add("active");
  currentStageIndex = STAGE_ORDER.indexOf(id);
  updateProgressDots();
  if (id === "stage-final") triggerFinalReveal();
}

function updateProgressDots() {
  const dots = document.querySelectorAll("#progressDots .dot");
  const puzzleStageNum = currentStageIndex; // splash=0, stage-1=1 ... stage-5=5, final=6
  dots.forEach((dot, i) => {
    const stageNum = i + 1;
    dot.classList.toggle("done", stageNum < puzzleStageNum);
    dot.classList.toggle("current", stageNum === puzzleStageNum);
  });
  document.getElementById("progressDots").style.display =
    id_visible(currentStageIndex) ? "flex" : "none";
}
function id_visible(idx) {
  return idx >= 1 && idx <= 5;
}
updateProgressDots(); // hide dots on initial splash load

// ---------------- Floating hearts background ----------------
function spawnHeart() {
  const field = document.getElementById("heart-field");
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["💜", "💕", "✨", "🎀"][Math.floor(Math.random() * 4)];
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 6;
  const drift = (Math.random() - 0.5) * 120;
  heart.style.left = left + "%";
  heart.style.setProperty("--drift", drift + "px");
  heart.style.animationDuration = duration + "s";
  field.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(spawnHeart, 450);

// ---------------- Splash ----------------
document.getElementById("splashName").textContent = CONFIG.nickname;
document.getElementById("startBtn").addEventListener("click", () => {
  goToStage("stage-1");
  renderTrivia();
});

// ---------------- Stage 1: Trivia ----------------
let triviaIndex = 0;
function renderTrivia() {
  const container = document.getElementById("triviaContainer");
  if (triviaIndex >= CONFIG.trivia.length) {
    goToStage("stage-2");
    renderRiddle();
    return;
  }
  const q = CONFIG.trivia[triviaIndex];
  container.innerHTML = "";

  const qEl = document.createElement("p");
  qEl.className = "trivia-question";
  qEl.textContent = q.question;
  container.appendChild(qEl);

  if (q.type === "mcq") {
    const choicesEl = document.createElement("div");
    choicesEl.className = "trivia-choices";
    q.choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.addEventListener("click", () => {
        if (i === q.correct) {
          btn.classList.add("correct");
          setTimeout(() => {
            triviaIndex++;
            renderTrivia();
          }, 500);
        } else {
          btn.classList.add("wrong");
          setTimeout(() => btn.classList.remove("wrong"), 500);
        }
      });
      choicesEl.appendChild(btn);
    });
    container.appendChild(choicesEl);
  } else {
    const form = document.createElement("form");
    form.className = "answer-form";
    form.autocomplete = "off";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Your answer...";
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "btn-main small";
    submit.textContent = "Answer";
    form.appendChild(input);
    form.appendChild(submit);
    container.appendChild(form);

    const hint = document.createElement("p");
    hint.className = "hint-text";
    container.appendChild(hint);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim().toLowerCase();
      if (q.answers.some((a) => val.includes(a) || a.includes(val)) && val.length) {
        triviaIndex++;
        renderTrivia();
      } else {
        hint.textContent = "Not quite — try again 💭";
      }
    });
  }
}

// ---------------- Stage 2: Riddle ----------------
let riddleAttempts = 0;
function renderRiddle() {
  document.getElementById("riddleQuestion").textContent = CONFIG.riddle.question;
  document.getElementById("riddleInput").value = "";
  document.getElementById("riddleHint").textContent = "";
  riddleAttempts = 0;
}
document.getElementById("riddleForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("riddleInput");
  const val = input.value.trim().toLowerCase();
  const hintEl = document.getElementById("riddleHint");
  if (CONFIG.riddle.answers.some((a) => val === a || val.includes(a))) {
    goToStage("stage-3");
    setupMemoryGame();
  } else {
    riddleAttempts++;
    hintEl.textContent =
      riddleAttempts >= 2 ? `Hint: ${CONFIG.riddle.hint}` : "Not quite, give it another go 💭";
  }
});
document.getElementById("riddleHintBtn").addEventListener("click", () => {
  document.getElementById("riddleHint").textContent = `Hint: ${CONFIG.riddle.hint}`;
});

// ---------------- Stage 3: Memory match ----------------
let memoryState = { first: null, second: null, lock: false, matched: 0 };
function setupMemoryGame() {
  memoryState = { first: null, second: null, lock: false, matched: 0 };
  const grid = document.getElementById("memoryGrid");
  grid.innerHTML = "";
  document.getElementById("continueFrom3").style.display = "none";

  const icons = [...CONFIG.memoryIcons, ...CONFIG.memoryIcons];
  for (let i = icons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [icons[i], icons[j]] = [icons[j], icons[i]];
  }

  icons.forEach((icon) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.icon = icon;
    card.textContent = "❓";
    card.addEventListener("click", () => handleCardClick(card));
    grid.appendChild(card);
  });
}
function handleCardClick(card) {
  if (memoryState.lock || card.classList.contains("flipped") || card.classList.contains("matched")) return;
  card.classList.add("flipped");
  card.textContent = card.dataset.icon;

  if (!memoryState.first) {
    memoryState.first = card;
    return;
  }
  memoryState.second = card;
  memoryState.lock = true;

  if (memoryState.first.dataset.icon === memoryState.second.dataset.icon) {
    memoryState.first.classList.add("matched");
    memoryState.second.classList.add("matched");
    memoryState.matched++;
    resetMemoryTurn();
    if (memoryState.matched === CONFIG.memoryIcons.length) {
      document.getElementById("continueFrom3").style.display = "inline-block";
    }
  } else {
    setTimeout(() => {
      memoryState.first.classList.remove("flipped");
      memoryState.second.classList.remove("flipped");
      memoryState.first.textContent = "❓";
      memoryState.second.textContent = "❓";
      resetMemoryTurn();
    }, 700);
  }
}
function resetMemoryTurn() {
  memoryState.first = null;
  memoryState.second = null;
  memoryState.lock = false;
}
document.getElementById("continueFrom3").addEventListener("click", () => {
  goToStage("stage-4");
  setupUnscramble();
});

// ---------------- Stage 4: Tap the letters ----------------
let unscrambleTarget = [];
let unscrambleProgress = 0;
function setupUnscramble() {
  const phrase = CONFIG.unscramblePhrase.toUpperCase();
  unscrambleTarget = phrase.split("");
  unscrambleProgress = 0;

  const slotsEl = document.getElementById("answerSlots");
  slotsEl.innerHTML = "";
  unscrambleTarget.forEach((ch) => {
    const slot = document.createElement("span");
    if (ch === " ") {
      slot.className = "slot space";
    } else {
      slot.className = "slot";
    }
    slotsEl.appendChild(slot);
  });

  const letters = unscrambleTarget.filter((c) => c !== " ");
  const shuffled = [...letters];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const tilesEl = document.getElementById("letterTiles");
  tilesEl.innerHTML = "";
  document.getElementById("continueFrom4").style.display = "none";

  shuffled.forEach((letter) => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.addEventListener("click", () => handleLetterTap(btn, letter));
    tilesEl.appendChild(btn);
  });
}
function handleLetterTap(btn, letter) {
  const slots = document.querySelectorAll("#answerSlots .slot:not(.space)");
  // find next empty non-space target index
  let nextExpected = null;
  let filled = 0;
  for (const ch of unscrambleTarget) {
    if (ch === " ") continue;
    if (filled < unscrambleProgress) { filled++; continue; }
    nextExpected = ch;
    break;
  }
  if (letter === nextExpected) {
    slots[unscrambleProgress].textContent = letter;
    unscrambleProgress++;
    btn.disabled = true;
    if (unscrambleProgress === slots.length) {
      document.getElementById("continueFrom4").style.display = "inline-block";
    }
  } else {
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 300);
  }
}
document.getElementById("continueFrom4").addEventListener("click", () => {
  goToStage("stage-5");
});

// ---------------- Stage 5: Hold to unlock ----------------
const holdBtn = document.getElementById("holdBtn");
const holdFill = document.getElementById("holdFill");
let holdTimer = null;
let holdProgress = 0;
const HOLD_DURATION_MS = 1800;

function startHold() {
  if (holdTimer) return;
  holdProgress = 0;
  holdTimer = setInterval(() => {
    holdProgress += 40;
    const pct = Math.min(100, (holdProgress / HOLD_DURATION_MS) * 100);
    holdFill.style.height = pct + "%";
    if (holdProgress >= HOLD_DURATION_MS) {
      clearInterval(holdTimer);
      holdTimer = null;
      goToStage("stage-final");
    }
  }, 40);
}
function cancelHold() {
  if (holdTimer) {
    clearInterval(holdTimer);
    holdTimer = null;
  }
  holdProgress = 0;
  holdFill.style.height = "0%";
}
holdBtn.addEventListener("mousedown", startHold);
holdBtn.addEventListener("touchstart", (e) => { e.preventDefault(); startHold(); }, { passive: false });
["mouseup", "mouseleave", "touchend", "touchcancel"].forEach((evt) =>
  holdBtn.addEventListener(evt, cancelHold)
);

// ---------------- Final reveal ----------------
let revealed = false;
function triggerFinalReveal() {
  if (revealed) return;
  revealed = true;

  renderCountdown();
  setInterval(renderCountdown, 1000);

  renderPhotoGallery();
  renderLoveLetter();

  document.getElementById("signature").textContent = `— ${CONFIG.yourName} 💜`;

  launchConfetti();
}

function renderCountdown() {
  const el = document.getElementById("countdown");
  const target = new Date(CONFIG.birthdayISO).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    el.innerHTML = `<p class="lead glow">🎉 It's your day! Happy Birthday! 🎉</p>`;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  el.innerHTML = `
    <div class="unit"><div class="num">${days}</div><div class="label">days</div></div>
    <div class="unit"><div class="num">${hours}</div><div class="label">hrs</div></div>
    <div class="unit"><div class="num">${minutes}</div><div class="label">min</div></div>
    <div class="unit"><div class="num">${seconds}</div><div class="label">sec</div></div>
  `;
}

function renderPhotoGallery() {
  const gallery = document.getElementById("photoGallery");
  gallery.innerHTML = "";
  CONFIG.photos.forEach((photo) => {
    if (photo.src) {
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.caption;
      // fall back to the placeholder if the photo file hasn't been added yet
      img.onerror = () => {
        const div = document.createElement("div");
        div.className = "photo-placeholder";
        div.innerHTML = `<div>${photo.emoji || "📷"}</div><span class="caption">${photo.caption}</span>`;
        img.replaceWith(div);
      };
      gallery.appendChild(img);
    } else {
      const div = document.createElement("div");
      div.className = "photo-placeholder";
      div.innerHTML = `<div>${photo.emoji || "📷"}</div><span class="caption">${photo.caption}</span>`;
      gallery.appendChild(div);
    }
  });
}

function renderLoveLetter() {
  const el = document.getElementById("loveLetter");
  el.innerHTML = "";
  CONFIG.loveLetter.forEach((paragraph, i) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    p.style.animationDelay = `${i * 0.4}s`;
    el.appendChild(p);
  });
}

document.getElementById("surpriseBtn").addEventListener("click", () => {
  const textEl = document.getElementById("surpriseText");
  textEl.textContent = CONFIG.specialSurprise;
  textEl.style.display = "block";
  document.getElementById("surpriseBtn").style.display = "none";
});

document.getElementById("replayBtn").addEventListener("click", () => {
  location.reload();
});

// ---------------- Confetti ----------------
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  canvas.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const colors = ["#d4af37", "#ff6fae", "#9b59ff", "#f3e9ff"];
  const pieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height,
    size: 4 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 2 + Math.random() * 3,
    drift: (Math.random() - 0.5) * 2,
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 8,
  }));

  let frame = 0;
  const maxFrames = 420;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += p.spin;
      if (p.y > canvas.height) p.y = -20;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      canvas.style.display = "none";
    }
  }
  animate();
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("confettiCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

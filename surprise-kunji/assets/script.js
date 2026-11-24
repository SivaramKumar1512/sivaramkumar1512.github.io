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

  // ---- Our story, told in chapters (no quizzes, just the real story) ------
  // Each chapter: a short title + one or more paragraphs. She just taps
  // "Continue" through them, no questions, no right/wrong answers.
  storyChapters: [
    {
      title: "Where It All Began",
      paragraphs: [
        "One Saturday night, I was scrolling through Instagram when I came across your profile. I gathered up some courage, sent a request, and simply said 'Hi'.",
        "You didn't reply that day. But I wasn't ready to give up so easily — so the next day, I said 'Hi' again. And that's when you finally replied.",
      ],
    },
    {
      title: "You Thought I Was Joking",
      paragraphs: [
        "At first, you thought I was just teasing you, that I couldn't possibly be serious. It took me a little while to convince you that I was.",
        "But honestly, the moment I saw you, I had this strange feeling — like I had seen you somewhere before, like I already knew you.",
      ],
    },
    {
      title: "One Week, One Word",
      paragraphs: [
        "We had barely been talking for a week when I worked up the courage to tell you how I felt. The very next day, you said 'okay'.",
        "That one small word changed the course of my entire life.",
      ],
    },
    {
      title: "Our First Meeting",
      paragraphs: [
        "It took a full month before we finally met in person, but every bit of that wait was worth it. Our first movie date, our first walk on the beach, our first coffee together — every memory from that time still means the world to me.",
      ],
    },
    {
      title: "Two Families, One Story",
      paragraphs: [
        "The day your father found out about us, he was shocked. I went and spoke with him myself, and I waited patiently until he came around and grew to like me.",
        "Now both our families are happy for us, and we've already started talking about getting engaged — hopefully on a good date sometime in April.",
      ],
    },
    {
      title: "Now",
      paragraphs: [
        "I wanted you to hear this story again, from the very beginning, so you'd know just how much you mean to me.",
        "Happy Birthday, Kunji. Are you ready for what's next?",
      ],
    },
  ],

  // ---- Final reveal: photo memories ---------------------------------------
  // Leave src as null to show a placeholder box with the caption.
  // These captions are kept generic on purpose — any real photo of you two
  // fits, no need for a photo matching each specific story beat (those
  // already live in the love letter above).
  photos: [
    { src: "assets/photo1.jpg", caption: "Just the two of us 💜", emoji: "💜" },
    { src: "assets/photo2.webp", caption: "You make me smile, every single time 😊", emoji: "😊" },
    { src: "assets/photo3.jpg", caption: "Some of our favorite memories together 🤍", emoji: "🤍" },
    { src: "assets/photo4.webp", caption: "One of our first outings together 🧡", emoji: "🧡" },
    { src: "assets/photo5.jpg", caption: "Our own little world 🤍", emoji: "🤍" },
  ],

  // ---- Final reveal: the love letter (each string = one paragraph) --------
  loveLetter: [
    "Kunji,",
    "One Saturday night, I was scrolling through Instagram when I found your profile. I sent a request and said a simple 'Hi'. You didn't reply that day, but I tried again the next day — and that's when everything started.",
    "You thought I was joking at first, and it took some time to convince you that I meant every word. But somehow, I felt like I had known you long before that day.",
    "We had only been talking for a week when I told you how I felt, and the very next day, you said 'okay' — one small word that changed my whole story.",
    "It took a month before we finally met, but it was worth every bit of the wait — our first movie, our first walk on the beach, our first coffee together. Every memory since then has stayed close to my heart.",
    "Your dad was shocked when he first found out, so I spoke with him myself and waited patiently until he came to like me. Now both our families are happy, and we're already talking about getting engaged sometime in April.",
    "I love you, Kunji. This entire journey has been for you — happy birthday to my favorite person in the whole world 💜",
  ],

  // ---- Final reveal: the extra surprise text (edit this with your actual plan!) ----
  specialSurprise:
    "P.S. — We're already talking about getting engaged, and there's a special date coming up in April. Keep this as a little reminder until then of just how much I love you 👀💍",
};

// =====================================================================
// App logic — you shouldn't need to touch anything below this line.
// =====================================================================
const STAGE_ORDER = ["stage-splash", "stage-story", "stage-final"];

let currentStageIndex = 0;
let chapterIndex = 0;

function goToStage(id) {
  document.querySelectorAll(".stage").forEach((el) => el.classList.remove("active"));
  const next = document.getElementById(id);
  next.classList.add("active");
  currentStageIndex = STAGE_ORDER.indexOf(id);
  updateProgressDots();
  if (id === "stage-final") triggerFinalReveal();
}

function buildProgressDots() {
  const container = document.getElementById("progressDots");
  container.innerHTML = "";
  CONFIG.storyChapters.forEach(() => {
    const dot = document.createElement("span");
    dot.className = "dot";
    container.appendChild(dot);
  });
}
buildProgressDots();

function updateProgressDots() {
  const dots = document.querySelectorAll("#progressDots .dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("done", i < chapterIndex);
    dot.classList.toggle("current", i === chapterIndex && currentStageIndex === 1);
  });
  document.getElementById("progressDots").style.display = currentStageIndex === 1 ? "flex" : "none";
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
  goToStage("stage-story");
  renderChapter();
});

// ---------------- Story chapters ----------------
const chapterNextBtn = document.getElementById("chapterNextBtn");

function renderChapter() {
  const chapter = CONFIG.storyChapters[chapterIndex];
  document.getElementById("chapterLabel").textContent =
    `Chapter ${chapterIndex + 1} of ${CONFIG.storyChapters.length}`;

  const content = document.getElementById("chapterContent");
  content.innerHTML = "";
  const title = document.createElement("h2");
  title.textContent = chapter.title;
  content.appendChild(title);
  chapter.paragraphs.forEach((text, i) => {
    const p = document.createElement("p");
    p.textContent = text;
    p.style.animationDelay = `${i * 0.25}s`;
    p.classList.add("reveal");
    content.appendChild(p);
  });

  chapterNextBtn.textContent =
    chapterIndex === CONFIG.storyChapters.length - 1 ? "Open Your Surprise 💜" : "Continue 💜";

  updateProgressDots();
}
chapterNextBtn.addEventListener("click", () => {
  chapterIndex++;
  if (chapterIndex >= CONFIG.storyChapters.length) {
    goToStage("stage-final");
  } else {
    renderChapter();
  }
});

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

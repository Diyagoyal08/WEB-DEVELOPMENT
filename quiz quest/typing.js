 // ============================
// 🎮 Typing Game - Optimized
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const SENTENCES = [
    "The quick brown fox jumps over the lazy dog. Practice makes progress and focusing on accuracy first will help you improve speed over time.",
    "JavaScript is a versatile programming language that powers interactive websites. Consistent practice allows developers to write cleaner and more efficient code.",
    "Web development requires patience and creativity. By learning HTML, CSS, and JavaScript thoroughly, you can create beautiful and functional web applications.",
    "React is a popular library for building UIs. Understanding components, state, and props is crucial to efficiently developing dynamic web apps.",
    "CSS styling brings designs to life on the web. Mastering flexbox, grid, and responsive design ensures your layouts look great on all devices.",
    "HTML forms the structure of every webpage. Proper semantic markup helps with accessibility, SEO, and maintainability of websites.",
    "Type faster to improve your coding workflow. Improving typing speed reduces development time and helps maintain focus on solving problems."
  ];

  // DOM elements
  const sentenceEl = document.getElementById("sentence");
  const typingInput = document.getElementById("typingInput");
  const wpmEl = document.getElementById("wpm");
  const accuracyEl = document.getElementById("accuracy");
  const xpEl = document.getElementById("xp");
  const xpBar = document.getElementById("xpBar");
  const totalXPEl = document.getElementById("totalXP");
  const timeEl = document.getElementById("time");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");

  const state = {
    isPlaying: false,
    currentSentence: '',
    correctChars: 0,
    totalChars: 0,
    timeLeft: 60,
    timer: null,
    startTime: 0,
    totalXP: Number(localStorage.getItem('totalXP')) || 0
  };

  const randomSentence = () => SENTENCES[Math.floor(Math.random() * SENTENCES.length)];

  function renderSentence(text) {
    sentenceEl.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for (let ch of text) {
      const span = document.createElement('span');
      span.textContent = ch;
      fragment.appendChild(span);
    }
    sentenceEl.appendChild(fragment);
  }

  function newSentence() {
    state.currentSentence = randomSentence();
    renderSentence(state.currentSentence);
  }

  function calcStats() {
    const elapsed = Math.max((Date.now() - state.startTime) / 60000, 0.01);
    const words = (state.totalChars / 5) || 0;
    const wpm = Math.round(words / elapsed);
    const acc = state.totalChars ? Math.round((state.correctChars / state.totalChars) * 100) : 100;
    const xp = Math.max(0, Math.round((wpm * (acc / 100)) / 2));
    return { wpm, acc, xp };
  }

  function startGame() {
    if (state.isPlaying) return;
    Object.assign(state, { isPlaying: true, timeLeft: 60, correctChars: 0, totalChars: 0, startTime: Date.now() });

    typingInput.disabled = false;
    typingInput.value = '';
    typingInput.focus();
    xpBar.style.width = '0%';
    wpmEl.textContent = 0;
    accuracyEl.textContent = 100;
    xpEl.textContent = 0;
    timeEl.textContent = state.timeLeft;
    totalXPEl.textContent = state.totalXP;

    newSentence();

    state.timer = setInterval(() => {
      state.timeLeft--;
      timeEl.textContent = state.timeLeft;
      if (state.timeLeft <= 0) endGame();
    }, 1000);
  }

  function endGame() {
    if (!state.isPlaying) return;
    state.isPlaying = false;
    clearInterval(state.timer);
    typingInput.disabled = true;

    const { wpm, acc, xp } = calcStats();
    state.totalXP += xp;
    localStorage.setItem('totalXP', state.totalXP);

    xpBar.style.width = `${Math.min(xp, 100)}%`;
    xpEl.textContent = xp;
    totalXPEl.textContent = state.totalXP;

     
  }

  function resetGame() {
    clearInterval(state.timer);
    Object.assign(state, { isPlaying: false, correctChars: 0, totalChars: 0, timeLeft: 60 });
    typingInput.value = '';
    typingInput.disabled = true;
    xpBar.style.width = '0%';
    wpmEl.textContent = 0;
    accuracyEl.textContent = 100;
    xpEl.textContent = 0;
    timeEl.textContent = 60;
    totalXPEl.textContent = state.totalXP;
    newSentence();
  }

  // 🟢 Typing handler with red/green feedback
  typingInput.addEventListener('input', () => {
    if (!state.isPlaying) return;

    const typed = typingInput.value;
    const target = state.currentSentence;
    const spans = sentenceEl.children;

    let correct = 0;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      const typedChar = typed[i];

      if (typedChar == null) {
        span.className = '';
      } else if (typedChar === target[i]) {
        span.className = 'correct';
        correct++;
      } else {
        span.className = 'wrong';
      }
    }

    state.totalChars = typed.length;
    state.correctChars = correct;

    const { wpm, acc, xp } = calcStats();
    wpmEl.textContent = wpm;
    accuracyEl.textContent = acc;
    xpEl.textContent = xp;
    xpBar.style.width = `${Math.min(xp, 100)}%`;

    if (typed === target) {
      newSentence();
      typingInput.value = '';
    }
  });

  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetGame);

  totalXPEl.textContent = state.totalXP;
  newSentence();
  typingInput.disabled = true;
});

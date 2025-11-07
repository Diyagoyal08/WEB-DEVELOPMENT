 // ===========================
// 🧠 Quiz Master - Skill Quest
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Makeup Language",
        "HyperText Markup Language",
        "HyperText Multiple Language",
        "Home Tool Markup Language",
      ],
      correct: 1,
    },
    {
      question: "Which CSS property controls text size?",
      options: ["font-style", "text-size", "font-size", "text-transform"],
      correct: 2,
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      options: ["<js>", "<script>", "<javascript>", "<code>"],
      correct: 1,
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Digital Ordinance Model",
        "Desktop Oriented Mode",
      ],
      correct: 0,
    },
    {
      question: "Which tag is used for inserting a line break?",
      options: ["<br>", "<break>", "<lb>", "<line>"],
      correct: 0,
    },
    {
      question: "Which of the following is not a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Number"],
      correct: 2,
    },
    {
      question: "Which symbol is used for comments in CSS?",
      options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
      correct: 2,
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Google", "Microsoft", "Netscape", "IBM"],
      correct: 2,
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Colorful Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
      ],
      correct: 2,
    },
    {
      question: "Which attribute specifies an alternate text for an image?",
      options: ["alt", "title", "src", "longdesc"],
      correct: 0,
    },
  ];

  // DOM elements
  const questionEl = document.querySelector(".quiz-box h2");
  const questionText = document.querySelector(".quiz-box p");
  const optionsContainer = document.querySelector(".options");
  const nextBtn = document.querySelector(".next-btn");
  const scoreEl = document.querySelector(".stats span b");
  const questionCountEl = document.querySelectorAll(".stats span b")[1];

  let currentIndex = 0;
  let score = 0;
  let totalXP = Number(localStorage.getItem("totalXP")) || 0;

  // Initialize quiz
  function loadQuestion() {
    const current = quizData[currentIndex];
    questionEl.textContent = `Question ${currentIndex + 1}`;
    questionText.textContent = current.question;
    optionsContainer.innerHTML = "";

    current.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.classList.add("option");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(i, btn);
      optionsContainer.appendChild(btn);
    });

    questionCountEl.textContent = `${currentIndex + 1}/10`;
  }

  function checkAnswer(selectedIndex, btn) {
    const correctIndex = quizData[currentIndex].correct;
    const buttons = optionsContainer.querySelectorAll(".option");

    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === correctIndex) b.style.background = "linear-gradient(90deg,#00e676,#7fff7f)";
      if (i === selectedIndex && i !== correctIndex)
        b.style.background = "linear-gradient(90deg,#ff4c4c,#ff8080)";
    });

    if (selectedIndex === correctIndex) {
      score++;
      totalXP += 20; // ✅ Earn 20 XP per correct answer
      localStorage.setItem("totalXP", totalXP);
    }

    scoreEl.textContent = score;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < quizData.length - 1) {
      currentIndex++;
      loadQuestion();
    } else {
      endQuiz();
    }
  });

  function endQuiz() {
    document.querySelector(".quiz-box").innerHTML = `
      <h2>🏁 Quiz Completed!</h2>
      <p>You scored <b>${score}/10</b></p>
      <p>Total XP: <b>${totalXP}</b></p>
      <button class="option" onclick="location.reload()">Play Again</button>
    `;
    nextBtn.style.display = "none";
  }

  // Start quiz
  loadQuestion();
  scoreEl.textContent = score;
});

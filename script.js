// 퀴즈 데이터 배열 (문제를 쉽게 추가/수정할 수 있습니다)
const quizData = [
  {
    question: "1. 메소포타미아 문명의 바빌로니아 제국에서 제정되었으며, '눈에는 눈, 이에는 이'라는 보복주의 원칙이 적용된 법전은?",
    options: ["함무라비 법전", "12표법", "유스티니아누스 법전", "나폴레옹 법전"],
    answer: 0, // 정답 인덱스 (0: 첫 번째 보기)
    explanation: "해설: 함무라비 법전은 신분에 따른 차등 처벌과 보복주의 원칙을 특징으로 하는 성문 법전입니다."
  },
  {
    question: "2. 14~16세기 유럽에서 고대 그리스·로마 문화를 부흥시키며 '인간 중심'의 문화 확립을 이끈 운동은?",
    options: ["종교 개혁", "르네상스", "계몽주의", "시민 혁명"],
    answer: 1,
    explanation: "해설: 르네상스는 이탈리아에서 시작된 대표적인 인간 중심(휴머니즘) 문화 운동입니다."
  },
  {
    question: "3. '짐이 곧 국가다'라는 말을 남기며 베르사유 궁전을 건설하고 프랑스 절대 왕정의 최고 전성기를 이끈 국왕은?",
    options: ["찰스 1세", "루이 14세", "표트르 대제", "엘리자베스 1세"],
    answer: 1,
    explanation: "해설: 루이 14세는 왕권신수설을 바탕으로 프랑스 절대 왕정을 완성했습니다."
  },
  {
    question: "4. 18세기 후반 영국에서 증기기관 개량과 함께 시작되어, 가내 수공업에서 공장제 대량생산으로 변모한 사건은?",
    options: ["산업 혁명", "명예 혁명", "미국 독립 혁명", "러시아 혁명"],
    answer: 0,
    explanation: "해설: 제임스 와트의 증기기관 개량 이후 영국에서 본격적인 산업 혁명이 시작되었습니다."
  },
  {
    question: "5. 1789년 봉건적 특권 폐지와 자유·평등·우애의 이념을 담은 '인권 선언'을 발표한 근대 시민 혁명은?",
    options: ["영국 청교도 혁명", "미국 독립 전쟁", "프랑스 혁명", "중국 신해혁명"],
    answer: 2,
    explanation: "해설: 프랑스 혁명은 구제도의 모순을 타파하고 근대 시민 사회를 연 대표적 사건입니다."
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const currentNumEl = document.getElementById("current-num");
const totalNumEl = document.getElementById("total-num");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

totalNumEl.textContent = quizData.length;

function loadQuiz() {
  resetState();
  const currentData = quizData[currentQuestion];
  
  currentNumEl.textContent = currentQuestion + 1;
  questionEl.textContent = currentData.question;

  currentData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = `${index + 1}. ${option}`;
    button.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(button);
  });
}

function resetState() {
  feedbackEl.classList.add("hidden");
  feedbackEl.className = "feedback-box hidden";
  nextBtn.classList.add("hidden");
  optionsContainer.innerHTML = "";
}

function selectOption(selectedIndex) {
  const currentData = quizData[currentQuestion];
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  // 버튼 비활성화 및 정답 표시
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === currentData.answer) {
      button.classList.add("correct");
    }
  });

  // 정답 및 오답 처리
  if (selectedIndex === currentData.answer) {
    score++;
    feedbackEl.textContent = `⭕ 정답입니다! ${currentData.explanation}`;
    feedbackEl.classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("wrong");
    feedbackEl.textContent = `❌ 오답입니다. ${currentData.explanation}`;
    feedbackEl.classList.add("wrong");
  }

  feedbackEl.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.innerHTML = `총 <strong>${quizData.length}</strong>문제 중 <strong>${score}</strong>문제를 맞혔습니다!`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuiz();
});

loadQuiz();

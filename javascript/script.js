const timerElement = document.getElementById("timer");
const marksList = document.getElementById("marksList");
const markBtn = document.getElementById("markBtn");

let interlvalId = 0;
let timer = 0;
let marks = [];

const formatTime = (time) => {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const centiseconds = time % 100;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${centiseconds
    .toString()
    .padStart(2, "0")}`;
};

const addMarkList = (markIndex, markTime) => {
  marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
};

/* Controle do botão Marcar */
const updateMarkButton = () => {
  markBtn.disabled = timer === 0;
};

/* Marcar tempo com validação */
const markTimer = () => {
  if (timer === 0) return;

  marks.push(timer);
  addMarkList(marks.length, timer);
};

const toggleTimer = () => {
  const button = document.getElementById("startBtn");
  const action = button.getAttribute("action");

  clearInterval(interlvalId);

  if (action == "start" || action == "continue") {
    interlvalId = setInterval(() => {
      timer += 1;
      setTimer(timer);
    }, 10);

    button.setAttribute("action", "pause");
    button.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else if (action == "pause") {
    button.setAttribute("action", "continue");
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
};

const resetTimer = () => {
  clearInterval(interlvalId);
  timer = 0;
  setTimer(timer);
  marks = [];
  marksList.innerHTML = "";

  const button = document.getElementById("startBtn");
  button.setAttribute("action", "start");
  button.innerHTML = '<i class="fa-solid fa-play"></i>';
};

const setTimer = (time) => {
  timerElement.innerText = formatTime(time);
  updateMarkButton();
};

/* Eventos */
document.getElementById("startBtn").addEventListener("click", toggleTimer);
document.getElementById("markBtn").addEventListener("click", markTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

/* Estado inicial */
updateMarkButton();

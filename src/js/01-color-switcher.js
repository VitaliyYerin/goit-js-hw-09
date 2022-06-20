const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.body;
let intervalId;

buttonStart.addEventListener('click', startInterval);
buttonStop.addEventListener('click', stopInterval);

function startInterval(){
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopInterval(){
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
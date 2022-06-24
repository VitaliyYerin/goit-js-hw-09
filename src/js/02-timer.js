import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {Notify} from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");
let timerId;

btnStart.setAttribute("disabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      Notify.failure("Please choose a date in the future")
    } else {
      Notify.success("Thank you for choosing the correct date")
      btnStart.removeAttribute("disabled")
      btnStart.addEventListener('click', handleTimerChange);
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function renderTimer(number) {
  dataDays.textContent = addNunber(number.days);
  dataHours.textContent = addNunber(number.hours);
  dataMinutes.textContent = addNunber(number.minutes);
  dataSeconds.textContent = addNunber(number.seconds);
}

function addNunber (value) {
  return  value.toString().padStart(2, '0');
}

function handleTimerChange() {
  timerId = setInterval(() => {
    const selectedDate = fp.selectedDates[0].valueOf();
    let delta = selectedDate - new Date();
    let dataItem = getMs(delta);
    if (delta < 0) {
      clearInterval(timerId);
      input.disabled = false;
    } else {
      renderTimer(dataItem);
    }
  }, 1000);
  input.disabled = true;
  btnStart.setAttribute("disabled", true);
};

function getMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return {days, hours, minutes, seconds};
}

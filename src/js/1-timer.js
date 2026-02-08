import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let timerId = null;

const startBtn = document.querySelector("button[data-start]");
const input = document.querySelector("#datetime-picker");

startBtn.disabled = true;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates.length === 0) return;

    const selectedDate = selectedDates[0];
    const now = new Date();

      if (selectedDate <= now) {
        iziToast.show({
    title: 'Alert',
    message: 'Please choose a date in the future'
});
      
      startBtn.disabled = true;
      userSelectedDate = null;
      return;
    }

    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  input.disabled = true;
  startTimer();
});

function startTimer() {
  timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.disabled = false;
      return;
    }

    const timeParts = convertMs(diff);
    updateTimerUI(timeParts);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

function updateTimerUI({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}




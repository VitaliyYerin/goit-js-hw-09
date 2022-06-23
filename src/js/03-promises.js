import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form")
const delay = document.querySelector("[name=delay]")
const step = document.querySelector("[name=step]")
const amount = document.querySelector("[name=amount]")
console.log(form);
console.log(delay);
console.log(step);
console.log(amount);


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((reselve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        reselve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
  return promise
}

form.addEventListener("submit", submitForm)
function submitForm(e) {
  e.preventDefault()

  const timer = setTimeout(() => {

    for (let position = 1; position < amount.value; position += 1) {
      let totalStep = (Number(delay.value)) + (Number(step.value)) * position
      createPromise(position, totalStep)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }

  }, delay.value)


}

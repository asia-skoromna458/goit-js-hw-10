
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`.form`);
form.addEventListener(`submit`, handler);


function handler(event) {
    event.preventDefault();
    const delay = Number(event.currentTarget.elements.delay.value);
    const state = event.currentTarget.elements.state.value;


    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === `fulfilled`) {
                resolve(delay);
            } else {
                reject(delay)
            }
            
        }, delay)

    });
    
    promise
        .then(fulfilled => {
        iziToast.show({
    title: 'OK',
    message: `✅ Fulfilled promise in ${fulfilled}ms`
});
        })
        .catch(reject => {
            iziToast.show({
    title: 'Error',
    message: `❌ Rejected promise in ${reject}ms`
});
        }
        
    )
}








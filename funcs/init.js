/**
 * Инициализирует элементы ввода в контейнерах дней недели.
 * Добавляет текстовые поля и разделители в каждый день, кроме выходных (суббота и воскресенье).
 * @function
 * @param {void}
 * @returns {void}
 */
 function init() {
    let days_wrapper = document.getElementById('days-wrapper');
    const sat_sun = document.getElementsByClassName("sat-sun")[0];
    days_wrapper = ([...days_wrapper.children].splice(0,5)).concat([...sat_sun.children])
      days_wrapper.forEach(e => {
          for (let i = 0; i < Math.floor(e.offsetHeight*0.7)/30; i++) {
              e.insertAdjacentHTML('beforeend', '<input type="text" class="input"><hr id="hr" class="hrs">')
          }
      });
  }
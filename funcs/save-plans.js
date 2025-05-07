/**
 * Сохраняет планы из элементов интерфейса в объект `plans`.
 * Каждый день и месяц представлен в виде ключа, а значение — массив задач с их стилями.
 * 
 * @function
 * @param {Object} plans - Объект для хранения планов, где ключи — дни недели, значения — JSON-строки.
 * @param {HTMLElement} daywrapper - Родительский элемент, содержащий дни недели и субботу/воскресенье.
 * @param {Array<HTMLElement>} days - Массив элементов, представляющих задачи для каждого дня.
 * @param {boolean} isBlack - Флаг темной темы, влияющий на проверку стиля элемента.
 * @returns {void} Функция не возвращает значение, но модифицирует объект `plans`.
 */

 function savePlans() {
    let week = ([...daywrapper.children].splice(0, 5))
      .concat([...daywrapper.children[5].children])
      .map((e) => e.children[0].children[0].children[0].innerHTML.replaceAll('.', ''));
    
    for (let i = 0; i < 7; i++) {
      plans[week[i]] = JSON.stringify(
        [...days[i]].map((el) => {
          return (el.value == "" && el.style.backgroundColor == (isBlack ? "rgb(56, 56, 56)" : "white")) ? []  : [el.value, el.style.backgroundColor]; 
        })
      );
    }
  }
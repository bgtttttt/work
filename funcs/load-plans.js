/**
 * Загружает планы из хранилища и отображает их в соответствующих элементах интерфейса.
 * @function
 * @param {Object} plans - Объект с сохраненными планами, где ключи - даты, значения - JSON-строки с данными планов.
 * @param {HTMLElement} daywrapper - Родительский элемент, содержащий дочерние элементы с датами.
 * @param {Array<Array<HTMLElement>>} days - Массив массивов элементов интерфейса для отображения планов (7 дней, каждый день содержит несколько элементов).
 * @param {boolean} isBlack - Флаг темной темы интерфейса.
 * @returns {void}
 */

 function loadPlans() {
    let week = ([...daywrapper.children].splice(0, 5)).concat([...daywrapper.children[5].children]).map((e) => e.children[0].children[0].children[0].innerHTML.replaceAll('.', ''))
    for (let i = 0; i < 7; i++) {
      if (plans[week[i]]) {
        let arr = JSON.parse(plans[week[i]]);
        [...days[i]].forEach((el, i) => {
          if (arr[i].length > 0) {
            el.value = arr[i][0]; el.style.backgroundColor = arr[i][1]
          } else { el.value = ""; el.style.backgroundColor = (isBlack ? "rgb(56, 56, 56)" : "white") }
        }
        )
      } else {
        [...days[i]].forEach((el, i) => { el.value = ""; el.style.backgroundColor = (isBlack ? "rgb(56, 56, 56)" : "white") })
      }
    }
  }
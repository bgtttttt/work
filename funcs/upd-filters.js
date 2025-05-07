/**
 * Обновляет фильтры и применяет их к элементам на странице.
 * Добавляет класс 'selecting' к элементам, которые соответствуют фильтрам.
 */
const filter = document.querySelector("#filter");
const filter_holder = document.querySelector("#filter_holder");
let filters = [];
/**
 * @function upd_filters
 * @param {HTMLElement} filter - Элемент input для ввода фильтра.
 * @param {HTMLElement} filter_holder - Контейнер, содержащий текущие активные фильтры.
 * @param {Array<string>} filters - Массив строк с текущими фильтрами.
 * @param {NodeList} inputs - Коллекция элементов, к которым применяются фильтры.
 * @returns {void} Ничего не возвращает.
 */
function upd_filters() {
  [...inputs].forEach((el) => {
    el.classList.remove('selecting');
  })
  filters = [...filter_holder.children].map((el) => {
    return el.innerHTML.replace('<button class="delete">x</button>', '');
  });
  if (filter.value !== "") {filters.push(filter.value);}

  [...inputs].forEach((el) => {
    filters.forEach((fil) => {
      if (el.value.includes(fil)) {
        el.classList.add('selecting')
      }
    })
  })
}
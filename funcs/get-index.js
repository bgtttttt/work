/**
 * Получает индекс элемента в списке дочерних элементов daywrapper.
 * Если элемент не найден напрямую, ищет его в родительских элементах и вычисляет комбинированный индекс.
 * @param {HTMLElement} e - Элемент, для которого нужно определить индекс.
 * @returns {number} Индекс элемента в списке дочерних элементов daywrapper.
 */
 function getIndex(e) {
    let index = [...daywrapper.children].indexOf(e.parentElement)
    if (index === -1) {
      index = [...daywrapper.children].indexOf(e.parentElement.parentElement) + [...e.parentElement.parentElement.children].indexOf(e.parentElement)
    }
    return index;
  }
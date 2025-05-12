/**
 * Возвращает координаты элемента относительно видимой части страницы.
 * @param {HTMLElement} elem - Элемент, координаты которого нужно получить.
 * @returns {{top: number, left: number}} Объект с координатами top и left.
 */
 function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top,
      left: box.left
    };
  }
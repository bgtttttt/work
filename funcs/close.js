/**
 * Удаляет все элементы с классом "contextmenu" из DOM.
 * @function
 * @returns {void}
 */

 function close() {
    let toclose = document.getElementsByClassName("contextmenu");
    for (let a of toclose) {
      a.remove();
    }
  }
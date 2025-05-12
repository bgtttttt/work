/**
 * Сдвигает элементы в массиве дней так, чтобы между ними не было пустых значений.
 * Пустые значения определяются по пустому value и соответствующему цвету фона.
 * Элементы с классом "not_move" не перемещаются.
 * 
 * @param {HTMLElement} e - Событие, на основе которого определяется индекс дня для обработки.
 * @returns {void} Функция ничего не возвращает, но изменяет массив days и вызывает upd_filters().
 */
 function replaceWithNotMove(e) {
    let index = getIndex(e)
    
    for (let a = 0; a<days[index].length; a++) {
      let spaces = 0;
      for (let i = 0; i < days[index].length; i++) {
        if (days[index][i].value === "" && days[index][i].style.backgroundColor === (isBlack?"rgb(56, 56, 56)":"white")) {
         spaces++;
        } else {
          let hold = days[index][i].value, holdBG = days[index][i].style.backgroundColor;
          days[index][i].value = ""; days[index][i].style.backgroundColor = (isBlack?"rgb(56, 56, 56)":"white");
          if (days[index][i-spaces].classList.contains("not_move")) {spaces--}
          days[index][i-spaces].value = hold; days[index][i-spaces].style.backgroundColor = holdBG;
          spaces = 0;
        }
      }
    }
    upd_filters();
  }
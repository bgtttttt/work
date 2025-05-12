/**
 * Сдвигает элементы в массиве дней так, чтобы между ними не было пустых значений.
 * @param {Event} e - Событие, которое инициировало вызов функции.
 * @returns {void}
 */
 function replace(e) {
    let index = getIndex(e)
    
    for (let a = 0; a<days[index].length; a++) {
      let spaces = 0;
      for (let i = 0; i < days[index].length; i++) {
        if (days[index][i].value === "" && days[index][i].style.backgroundColor === (isBlack?"rgb(56, 56, 56)":"white")) {
         spaces++;
        } else {
          let hold = days[index][i].value; holdBG = days[index][i].style.backgroundColor;
          days[index][i].value = ""; days[index][i].style.backgroundColor = (isBlack?"rgb(56, 56, 56)":"white");
          days[index][i-spaces].value = hold; days[index][i-spaces].style.backgroundColor = holdBG;
          spaces = 0;
        }
      }
    }
    upd_filters();
  }
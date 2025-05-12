/**
 * Сдвигает элементы в массиве days влево, начиная с указанного элемента.
 * Заполняет освободившееся место пустым значением и стандартным цветом фона.
 * Элементы с классом "not_move" игнорируются.
 * @param {HTMLElement} e - Элемент, с которого начинается сдвиг.
 * @returns {void}
 */
 function reRazdv(e) {
    if (e.classList.contains("not_move")) {return;}
    let index = getIndex(e);
    let i = days[index].indexOf(e);
    let arr = [], arrBG = [];
    for (let a = i+1; a< days[index].length; a++) {
      if (days[index][a].value === "" && days[index][a].style.backgroundColor === (isBlack?"rgb(56, 56, 56)":"white")) {
        break
      }
      arr[a-i-1] = days[index][a].value; arrBG[a-i-1] = days[index][a].style.backgroundColor;
    }
    if(days[index][i+arr.length]){
      days[index][i+arr.length].value = ""; 
      days[index][i+arr.length].style.backgroundColor = (isBlack?"rgb(56, 56, 56)":"white"); 
    }
    for (let b = 0; b < arr.length; b++) {
      if (days[index][i+1+b].classList.contains("not_move")) {i++}
      if (days[index][i+b]) {
        days[index][i+b].value = arr[b];
        days[index][i+b].style.backgroundColor = arrBG[b];
      }
    }
    upd_filters();
  }
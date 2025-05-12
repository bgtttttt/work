/**
 * Раздвигает элементы в массиве days, начиная с указанного элемента, освобождая место для нового элемента.
 * Перемещает последующие элементы вправо, сохраняя их значения и цвет фона.
 * Элементы с классом "not_move" не перемещаются и не учитываются при сдвиге.
 * 
 * @param {HTMLElement} e - Элемент, с которого начинается раздвижение.
 * @returns {void}
 */
 function razdv(e) {
    replaceWithNotMove(e);
    if (e.classList.contains("not_move")) {return;}
    let index = getIndex(e);
    let i = days[index].indexOf(e);
    let arr = [], pl = 0, arrBG = []
    for (let a = i; a< days[index].length; a++) {
      if (days[index][a]?.classList.contains("not_move")) {pl++; continue}
      if (days[index][a]?.value === "" && days[index][a]?.style.backgroundColor === (isBlack?"rgb(56, 56, 56)":"white")) {
        break
      }
      arr[a-i-pl] = days[index][a]?.value; arrBG[a-i-pl] = days[index][a]?.style.backgroundColor; 
    }
    if(days[index][i]) {
      days[index][i].value = ""; 
      days[index][i].style.backgroundColor = (isBlack?"rgb(56, 56, 56)":"white"); 
    }
    let k = 0;
    for (let b = 0; b < arr.length; b++) {
      if (days[index][i+1+b].classList.contains("not_move")) {k++}
      days[index][i+1+b+k].value = arr[b];
      days[index][i+1+b+k].style.backgroundColor = arrBG[b];
    }
    upd_filters();
  }
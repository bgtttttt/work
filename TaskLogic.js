getWeek()
let isBlack = false;
function init() {
  let days_wrapper = document.getElementById('days-wrapper');
  const sat_sun = document.getElementsByClassName("sat-sun")[0];
  days_wrapper = ([...days_wrapper.children].splice(0,5)).concat([...sat_sun.children])
    days_wrapper.forEach(e => {
        for (let i = 0; i < Math.floor(e.offsetHeight*0.7)/30; i++) {
            e.insertAdjacentHTML('beforeend', '<input type="text" class="input"><hr id="hr" class="hrs">')
        }
    });
}
init()

plans = {}

const inputs = document.getElementsByClassName('input');
const daywrapper = document.querySelector("#days-wrapper");

let days = ([...daywrapper.children].splice(0,5)).concat([...daywrapper.children[5].children]);
days = days.map((el) => {
 return [...el.children].filter((e) => [...inputs].includes(e))
})


function useState(initialValue) {
  let state = initialValue;

  function setState(newValue) {
      state = newValue;
  }

  function getState() {
      return state;
  }

  return [getState, setState];
}
const [getE, setE] = useState("")


document.querySelector(".main").addEventListener('contextmenu', e => { 
  e.preventDefault()
});
let openedOn;
[...inputs].forEach((e,i) => {
    document.addEventListener('contextmenu', event => {
        if (e == event.target) {
            document.body.insertAdjacentHTML('beforeend', `<div class="contextmenu" style="left: ${event.pageX}px; top: ${event.pageY}px">
              <div class="colorP">
                <div>Color</div>
                <input type="range" id="color-slider" min="0" max="360" value="0">
              </div>
              <button id="deleteBut">Delete</button>
              </div>`);
            openedOn = event.target;
            const colorSlider = document.getElementById('color-slider');
            createGradient(colorSlider);
            colorSlider.addEventListener('input', () => {
              const hue = colorSlider.value;
              const color = `hsl(${hue}, 100%, 80%)`;
              e.style.backgroundColor = color;
            });

            document.querySelector(".contextmenu").addEventListener('contextmenu', ev => { 
              ev.preventDefault()
            });
        }
    })
})
document.addEventListener('mousedown', e => {
  let toclose = document.querySelector(".contextmenu");
  if (!(toclose==e.target | [...((toclose?.querySelectorAll('*')) || [])].includes(e.target))) {close()}
  if (document.elementsFromPoint(e.clientX, e.clientY)[0].id === "deleteBut") {openedOn.value = ""; openedOn.style.backgroundColor=(isBlack?"rgb(56, 56, 56)":"white"); replace(openedOn); openedOn = null;}
})
window.addEventListener('resize', e => close())
function close() {
  let toclose = document.getElementsByClassName("contextmenu");
  for (let a of toclose) {
    a.remove();
  }
}

[...inputs].forEach((e) => {
  let pressTimer; 
  let isDragging = false;

  e.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      pressTimer = setTimeout(() => {
        isDragging = true; 
        startDrag(e, event); 
      }, 100); 
    }
  });

  e.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);

    if (!isDragging) {
      e.focus(); 
    }
    isDragging = false; 
  });

  e.addEventListener('mousemove', () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
    }
  });

  e.addEventListener('change', (event) => {upd_filters()})
});
let draggedElem = null;
function startDrag(e, event) {
  let coords = getCoords(e);
  let shiftX = event.pageX - coords.left;
  let shiftY = event.pageY - coords.top;

  let elem = e.cloneNode(true);
  elem.innerHTML = "";
  elem.style.backgroundColor = e.style.backgroundColor;
  let holder = e.value;
  e.value = "";
  e.style.backgroundColor = (isBlack?"rgb(56, 56, 56)":"white")
  e.classList.add("not_move")
  e.insertAdjacentElement("afterend", elem);

  elem.style.position = 'absolute';
  elem.style.border = "2px solid #b0b0b0";
  elem.style.minWidth = window.getComputedStyle(e).width;

  setE(elem)

  document.body.appendChild(elem);
  moveAt(event);
  elem.style.zIndex = 1000;

  draggedElem = elem;
  function moveAt(event) {
    elem.style.left = event.pageX - shiftX + 'px';
    elem.style.top = event.pageY - shiftY + 'px';
  }

  let canCall = true
  let onElem = null;
  document.onmousemove = function (e) {
    if ([...inputs].includes(document.elementsFromPoint(e.clientX, e.clientY)[1])) {
      if (onElem != document.elementsFromPoint(e.clientX, e.clientY)[1]) {
        if (onElem !== null) {
          onElem.style.border = "none";
          canCall = true;
          reRazdv(onElem)
        }
        onElem = document.elementsFromPoint(e.clientX, e.clientY)[1];
      }
      onElem.style.border = "3px solid black";
      if (canCall) {
        canCall = false
        razdv(onElem);
      }
      
    }
    moveAt(e);
  };

  elem.onmouseup = function (s) {
    let elementP = null;
    if (onElem === null && [...inputs].includes(document.elementsFromPoint(s.clientX, s.clientY)[1])) {onElem = document.elementsFromPoint(s.clientX, s.clientY)[1]}
      if (onElem) {
        onElem.style.border = "none";
        if ([...inputs].includes(document.elementsFromPoint(s.clientX, s.clientY)[1])) {
          elementP = document.elementsFromPoint(s.clientX, s.clientY)[1]
          elementP.value = holder === getE.value?holder:getE().value;
          elementP.style.backgroundColor = elem.style.backgroundColor;
        } else {
          e.value = holder === getE.value?holder:getE().value;
          e.style.backgroundColor = elem.style.backgroundColor;
        }
      }

    e.classList.remove("not_move")
    elem.remove();
    if (elementP) { replace(elementP); replace(e)}
    draggedElem = null;
    document.onmousemove = null;  
    e.onmouseup = null;
  };

  elem.addEventListener("dragstart", (ev) => ev.preventDefault());
}
function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left
  };
}

[...inputs].forEach((e,i) => {
  e.addEventListener('change', (event) => replace(e))
})
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
function getIndex(e) {
  let index = [...daywrapper.children].indexOf(e.parentElement)
  if (index === -1) {
    index = [...daywrapper.children].indexOf(e.parentElement.parentElement) + [...e.parentElement.parentElement.children].indexOf(e.parentElement)
  }
  return index;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
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
  console.log(index)
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("beforeunload", (e) => {
  
  savePlans()
  localStorage.setItem('Data', JSON.stringify(plans));
  localStorage.setItem('Color', isBlack);
})
window.addEventListener("DOMContentLoaded", (e) => {
  const storedData = localStorage.getItem('Data');
  if (storedData) {
    plans = JSON.parse(storedData)
  }
  
  loadPlans()
  days.forEach((e) => {
    replace(e[1])
  })
  if(localStorage.getItem('Color') === "true") {colSw(true)}
})

/*
const filter = document.querySelector("#filter");
const filter_holder = document.querySelector("#filter_holder");
let filters = [];
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
*/
filter.addEventListener('keyup', (event) => {
  if (event.key == "Enter") {
    let el = document.createElement("div");
    el.innerHTML = `${filter.value}<button class="delete">x</button>`
    filter_holder.insertAdjacentElement("beforeend", el)
    el.children[0].addEventListener('click', (ev) => {el.remove(); upd_filters();})
    filter.value = ''
  }
  upd_filters();
})


function createGradient(colorSlider) {
  const gradientStops = [];
  for (let i = 0; i <= 360; i++) {
    gradientStops.push(`hsl(${i}, 100%, 60%)`); // Добавляем цвет для каждого градуса
  }
  const gradient = `linear-gradient(to right, ${gradientStops.join(', ')})`;
  colorSlider.style.background = gradient; // Применяем градиент к слайдеру
}


const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward"); let now = 0;
backward.addEventListener("click", (event) => {
  savePlans();
  getWeek(--now);
  loadPlans();
  upd_filters();
})
forward.addEventListener("click", (event) => {
  savePlans();
  getWeek(++now);
  loadPlans();
  upd_filters();
})

let clipboardData = null;
document.addEventListener('keydown', (ev) => {
  const activeElement = document.activeElement;
  const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
  const kbKeys = ["c", "v"];

  if (!arrowKeys.includes(ev.key) && !kbKeys.includes((ev.key).toLowerCase())) return;

  if (ev.ctrlKey) {
    if (document.hasFocus()) {document.activeElement.blur()};
    if (ev.key === 'c' && draggedElem !== null) {
      clipboardData = [getE().value, getE().style.backgroundColor];
    } else if (ev.key === 'v' && draggedElem !== null) {
      if (clipboardData !== null) {
        let a = getE(); a.value = clipboardData[0]; a.style.backgroundColor = clipboardData[1];
        setE(a);
      }
    }
    return;
  }

  const currentElement = ev.target;
  const currentIndex = getIndex(currentElement);
  const currentDay = days[currentIndex];
  const elementPosition = currentDay?.indexOf(currentElement ?? 0);

  if (ev.key === "ArrowUp") {
    if (elementPosition > 0) {
      currentDay[elementPosition - 1].focus();
    } else if (currentIndex === 6 && elementPosition === 0) {
      days[currentIndex - 1][days[currentIndex - 1].length - 1].focus();
    }
    ev.preventDefault();
  }

  if (ev.key === "ArrowDown") {
    if (elementPosition < currentDay.length - 1) {
      currentDay[elementPosition + 1].focus();
    } else if (currentIndex === 5 && elementPosition === currentDay.length - 1) {
      days[currentIndex + 1][0].focus();
    }
    ev.preventDefault();
  }

  if (ev.key === "ArrowRight" && isCursorAtEnd(currentElement)) {
    if (currentIndex < 4) {
      days[currentIndex + 1][elementPosition].focus();
    } else if (currentIndex >= 4 && currentIndex < 5) {
      const newIndex = Math.floor(elementPosition / 5);
      days[5 + newIndex][elementPosition % 5].focus();
    }
    ev.preventDefault();
  }

  if (ev.key === "ArrowLeft" && isCursorAtStart(currentElement)) {
    if (currentIndex < 5) {
      days[currentIndex - 1][elementPosition].focus();
    } else if (currentIndex > 4) {
      const newIndex = 5 * (currentIndex - 5) + elementPosition;
      days[4][newIndex].focus();
    }
    ev.preventDefault();
  }
});

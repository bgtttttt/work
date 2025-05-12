getWeek()
let isBlack = false;
init()

plans = {}

const inputs = document.getElementsByClassName('input');
const daywrapper = document.querySelector("#days-wrapper");

let days = ([...daywrapper.children].splice(0,5)).concat([...daywrapper.children[5].children]);
days = days.map((el) => {
 return [...el.children].filter((e) => [...inputs].includes(e))
})

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
  if (document.elementsFromPoint(e.clientX, e.clientY)[0].id === "deleteBut") {openedOn.value = ""; openedOn.style.backgroundColor=(isBlack?"rgb(56, 56, 56)":"white"); replace(openedOn); openedOn = null; close()}
})
window.addEventListener('resize', e => close());


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
[...inputs].forEach((e,i) => {
  e.addEventListener('change', (event) => replace(e))
})

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

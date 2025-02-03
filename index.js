const getWeek = () => {
  const date = new Date();
  const weekDay = date.getDay();
  const monthDay = date.getDate();
  const month = date.getMonth();
  const dates = document.getElementsByClassName("day-top");
  const dateFields = [...dates].map(element => {
    return element.children[0];
  });
  const countDayOnMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let result = [];
  // День месяца, понедельника текущей недели
  let countMonthDay;
  // Проверка что бы всегда начинать выстаривать текущую неделю с понедельника
  if (weekDay > 1) {
    countMonthDay = monthDay - (weekDay - 1);
  } else if (weekDay === 0) {
    countMonthDay = monthDay - 6;
  } else {
    countMonthDay = monthDay;
  }
  // Постраение итогового массива 
  for (let i = 0; i < 7; i++) {
    // Если countMonthDay больше кол-ва дней в месяце
    // дни начинаются сначала
    if ((countMonthDay + i) > countDayOnMonth[month]) {
      let count = countDayOnMonth[month] - (countMonthDay + (7 - 1));
      dateFields[i].innerHTML = `${count + i}.` + (((month+2)/10 > 1)?`${ month +2}`:`0${month+2}`);

    } else {
      dateFields[i].innerHTML = `${countMonthDay + i}.`+(((month+1)/10 > 1)?`${ month+1}`:`0${month+1}`);
    }

  }

  return result

}
getWeek()

function init() {
  let days_wrapper = document.getElementById('days-wrapper');
  const sat_sun = document.getElementsByClassName("sat-sun")[0];
  days_wrapper = ([...days_wrapper.children].splice(0,5)).concat([...sat_sun.children])
    days_wrapper.forEach(e => {
        for (let i = 0; i < Math.floor(e.offsetHeight*0.7)/30; i++) {
            e.insertAdjacentHTML('beforeend', '<input type="text" class="input"><hr id="hr">')
        }
    });
}
init()

const inputs = document.getElementsByClassName('input');
{
  const daywrapper = document.querySelector("#days-wrapper");
  let days = ([...daywrapper.children].splice(0,5)).concat([...daywrapper.children[5].children]);
  days = days.map((el) => {
   return [...el.children].filter((e) => [...inputs].includes(e))
  })
}

document.querySelector(".main").addEventListener('contextmenu', e => { 
  e.preventDefault()
});
[...inputs].forEach((e,i) => {
    document.addEventListener('contextmenu', event => {
        if (e == event.target) {
            document.body.insertAdjacentHTML('beforeend', `<div class="contextmenu" style="left: ${event.pageX}px; top: ${event.pageY}px">
              <button>Delete</button>
              <button class="color">Color <div></div></button>
              </div>`)
            document.querySelector(".contextmenu").addEventListener('contextmenu', ev => { 
              ev.preventDefault()
            });
            const circle = document.querySelector(".color div");
            circle.style.backgroundColor = (e.style.backgroundColor || "white")
        }
    })
})
document.addEventListener('mousedown', e => {
  let toclose = document.querySelector(".contextmenu");
  if (!(toclose==e.target | [...((toclose?.children) || [])].includes(e.target))) {close()}
  
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
    pressTimer = setTimeout(() => {
      isDragging = true; 
      startDrag(e, event); 
    }, 100); 
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
});
function startDrag(e, event) {
  let coords = getCoords(e);
  let shiftX = event.pageX - coords.left;
  let shiftY = event.pageY - coords.top;

  let elem = e.cloneNode(true);
  elem.innerHTML = "";
  let holder = e.value;
  e.value = "";
  e.insertAdjacentElement("afterend", elem);

  elem.style.position = 'absolute';
  elem.style.backgroundColor = "#f0f0f0";
  elem.style.border = "2px solid #b0b0b0";
  elem.style.minWidth = window.getComputedStyle(e).width;

  document.body.appendChild(elem);
  moveAt(event);
  elem.style.zIndex = 1000;

  function moveAt(event) {
    elem.style.left = event.pageX - shiftX + 'px';
    elem.style.top = event.pageY - shiftY + 'px';
  }

  let onElem = null;
  document.onmousemove = function (e) {
    if ([...inputs].includes(document.elementsFromPoint(e.clientX, e.clientY)[1])) {
      if (onElem != document.elementsFromPoint(e.clientX, e.clientY)[1]) {
        if (onElem !== null) {
          onElem.style.border = "none";
        }
        onElem = document.elementsFromPoint(e.clientX, e.clientY)[1];
      }
      onElem.style.border = "3px solid black";
    }

    moveAt(e);
  };

  elem.onmouseup = function (s) {
    if (onElem) {
      onElem.style.border = "none";
      if ([...inputs].includes(document.elementsFromPoint(s.clientX, s.clientY)[1])) {
        console.log("in");
        (document.elementsFromPoint(s.clientX, s.clientY)[1]).value = holder
      } else {
        e.value = holder;
      }
    }
    elem.remove();

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



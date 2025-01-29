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

[...inputs].forEach((e,i) => {
  document.addEventListener('mousedown', event => {
    if (e == event.target) {
      let coords = getCoords(e);
      let shiftX = event.pageX - coords.left; let shiftY = event.pageY - coords.top;

      let elem = e.cloneNode(true);
      elem.innerHTML = "";
      e.insertAdjacentElement("afterend", elem);
      ///Добавить перезадачу эвента

      e.style.position = 'absolute';
      e.style.backgroundColor = "red"
      document.body.appendChild(e);
      moveAt(event);
      e.style.zIndex = 1000;
      function moveAt(event) {
        e.style.left = event.pageX - shiftX + 'px';
        e.style.top = event.pageY - shiftY + 'px';
      }
      document.onmousemove = function(e) {moveAt(e);};
      e.onmouseup = function() {
        document.onmousemove = null;
        e.onmouseup = null;
      };
      e.addEventListener("dragstart", ev => ev.preventDefault())
    }
  })  
})
function getCoords(elem) {   
  var box = elem.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left
  };
}

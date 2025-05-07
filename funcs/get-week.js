/**
 * Получает и отображает даты недели с учетом смещения.
 * @param {number} [weekOffset=0] - Смещение недели (0 - текущая неделя, 1 - следующая и т.д.).
 * @returns {void}
 */
const getWeek = (weekOffset = 0) => {
    const dateM = document.querySelector(".top").children[0];
    const date = new Date();
    const weekDay = date.getDay();
    const monthDay = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dates = document.getElementsByClassName("day-top");
    const dateFields = [...dates].map(element => element.children[0]);
    const countDayOnMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
      countDayOnMonth[1] = 29;
    }
  
    let countMonthDay;
  
    if (weekDay > 1) {
      countMonthDay = monthDay - (weekDay - 1);
    } else if (weekDay === 0) {
      countMonthDay = monthDay - 6;
    } else {
      countMonthDay = monthDay;
    }
  
    const targetDate = new Date(year, month, countMonthDay + weekOffset * 7);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();
    const targetMonthDay = targetDate.getDate();
  
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(targetYear, targetMonth, targetMonthDay + i);
      const currentMonth = currentDate.getMonth();
      const currentMonthDay = currentDate.getDate();
  
      dateFields[i].innerHTML = `${getMonthName(currentMonth)} ${currentMonthDay}`;
    }
    let d1 = new Date(targetYear, targetMonth, targetMonthDay);
    let d2 = new Date(targetYear, targetMonth, targetMonthDay + 6)
    dateM.innerHTML = (d1.getMonth() == d2.getMonth())?getMonthName(d1.getMonth())+" "+d1.getFullYear():
    getMonthName(d1.getMonth())+" "+d1.getFullYear()+"-"+getMonthName(d2.getMonth())+" "+d2.getFullYear();
  };
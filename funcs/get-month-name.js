/**
 * Возвращает название месяца по его номеру.
 * @function
 * @param {number} m - Номер месяца (0-11).
 * @returns {string} Название месяца.
 */

function getMonthName(m) {
    switch(m) {
      case 0: return "January";
      case 1: return "February";
      case 2: return "March";
      case 3: return "April";
      case 4: return "May";
      case 5: return "June";
      case 6: return "July";
      case 7: return "August";
      case 8: return "September";
      case 9: return "October";
      case 10: return "November";
      case 11: return "December";
    }
  }
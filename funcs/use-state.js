/**
 * Создает и возвращает состояние и функцию для его обновления.
 * @param {*} initialValue Начальное значение состояния.
 * @returns {Array} Массив, содержащий геттер состояния и сеттер для его обновления.
 */

function useState(initialValue) {
  let state = initialValue;
  /**
   * Обновляет текущее состояние.
   * @param {*} newValue Новое значение состояния.
   */
  function setState(newValue) {
      state = newValue;
  }

  /**
   * Возвращает текущее значение состояния.
   * @returns {*} Текущее состояние.
   */
  function getState() {
      return state;
  }

  return [getState, setState];
}
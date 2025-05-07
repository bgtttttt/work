/**
 * Проверяет, находится ли курсор в начале текста в указанном элементе ввода.
 * Функция возвращает true только если:
 * 1) Указанный элемент ввода является активным (имеет фокус)
 * 2) Начальная и конечная позиции выделения равны 0 (начало поля ввода)
 * 
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement - Элемент ввода (input или textarea), 
 * который нужно проверить
 * @returns {boolean} Возвращает true, если курсор находится в начале текста и элемент активен, 
 * в противном случае возвращает false
 */
 function isCursorAtStart(inputElement) {
    if (document.activeElement === inputElement) {
      return inputElement.selectionStart === 0 &&
        inputElement.selectionEnd === 0;
    }
    return false;
  }
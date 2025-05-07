/**
 * Проверяет, находится ли курсор в конце текста в указанном элементе ввода.
 * Функция возвращает true только если:
 * 1) Указанный элемент ввода является активным (имеет фокус)
 * 2) Начальная и конечная позиции выделения совпадают с длиной значения элемента
 * 
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement - Элемент ввода (input или textarea), 
 * который нужно проверить
 * @returns {boolean} Возвращает true, если курсор находится в конце текста и элемент активен, 
 * в противном случае возвращает false
 */
 function isCursorAtEnd(inputElement) {
    if (document.activeElement === inputElement) {
      return inputElement.selectionStart === inputElement.value.length &&
        inputElement.selectionEnd === inputElement.value.length;
    }
    return false;
  }
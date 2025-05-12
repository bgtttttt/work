/**
 * Создает линейный градиент из цветов HSL и применяет его к элементу.
 * @param {HTMLElement} colorSlider - Элемент, к которому применяется градиент.
 * @returns {void}
 */
 function createGradient(colorSlider) {
    const gradientStops = [];
    for (let i = 0; i <= 360; i++) {
      gradientStops.push(`hsl(${i}, 100%, 60%)`); 
    }
    const gradient = `linear-gradient(to right, ${gradientStops.join(', ')})`;
    colorSlider.style.background = gradient; 
  }
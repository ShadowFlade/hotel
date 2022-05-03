import './range-slider.scss';
const formatTheValue = (number) => {
  const results = [];
  let isOk = true;
  let decrement = 3;
  const numberArray = Array.from(number.toString());
  while (isOk) {
    results.push(numberArray.splice(numberArray.length - decrement, 3).join(''));
    decrement += 3;
    if (numberArray.length < decrement) {
      isOk = false;
      results.push(numberArray.join(''));
    }
  }
  return results.reverse().join(' ');
};
const initSlider = (selector, valuesList, options) => {
  const defaultValues = [500, 7000];
  const values = valuesList && valuesList.length > 1 ? valuesList : defaultValues;

  $('.range-slider__start').text(`${values[0]}Р`);
  $('.range-slider__end').text(` ${values[1]}Р`);
  const defaultOptions = {
    range: true,
    step: 500,
    max: 14000,
    min: 500,
    width: 70,
    slide: function (_, ui) {
      const value0 = formatTheValue(ui.values[0]);
      const value1 = formatTheValue(ui.values[1]);
      $('.range-slider__start').text(`${value0}Р `);
      $('.range-slider__end').text(` ${value1}Р`);
    },
    values: values,
  };
  const newOptions = { ...defaultOptions, ...options };
  $(selector).slider(newOptions);
};
export default initSlider;

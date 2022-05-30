import './range-slider.scss';

const initSlider = (selector, valuesList, options) => {
  const defaultValues = [5000, 10000];
  const values = valuesList && valuesList.length > 1 ? valuesList : defaultValues;
  const rubles = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    notation: 'standard',
    compactDisplay: 'short',
    maximumFractionDigits: 0,
  });

  $('.range-slider__start').text(rubles.format(values[0]));
  $('.range-slider__end').text(rubles.format(values[1]));
  const defaultOptions = {
    range: true,
    step: 500,
    max: 14000,
    min: 500,
    width: 70,
    slide: function (_, ui) {
      const value0 = rubles.format(ui.values[0]);
      const value1 = rubles.format(ui.values[1]);
      $('.range-slider__start').text(value0);
      $('.range-slider__end').text(value1);
    },
    values: values,
  };
  const newOptions = { ...defaultOptions, ...options };
  $(selector).slider(newOptions);
};
export default initSlider;

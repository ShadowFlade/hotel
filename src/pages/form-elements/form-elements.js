import '../../components/checkbox-list/checkbox-list.js';
import '../../components/comment/comment.js';
import '../../components/button/button.js';
import '../../components/masked-text-field/masked-text-field.js';
import '../../components/checkbox-buttons/checkbox-buttons.js';
import '../../components/bullet-list/bullet-list.js';
import '../../components/checkbox-rich/checkbox-rich.js';
import '../../components/date-picker/date-picker.js';
import '../../components/features/features.js';
import '../../components/like/like.js';
import '../../components/pagination/pagination.js';
import '../../components/pay-button/pay-button.js';
import '../../components/radio-buttons/radio-buttons.js';
import '../../components/range-slider/range-slider.js';
import '../../components/rate-button/rate-button.js';
import '../../components/subscription-text-field/subscription-text-field.js';
import '../../components/text-field/text-field.js';
import '../../components/toggle/toggle.js';
import '../../components/date-picker/date-picker.js';
import formatTheValue from '../../components/range-slider/range-slider.js';
import { DatePicker } from '../../components/date-picker/date-picker.js';
import DropdownAccom from '../../components/dropdown-submit-and-clear/DropdownAccom.js';
import '../../components/hotel-card/hotel-card.js';
import './form-elements.scss';
const handleContentLoaded = () => {
  const sliderValues = [500, 7000];
  $('.js-range-slider__item').slider({
    range: true,
    step: 500,
    max: 14000,
    min: 500,
    width: 70,
    slide: function (event, ui) {
      const value0 = formatTheValue(ui.values[0]);
      const value1 = formatTheValue(ui.values[1]);
      $('.range-slider__start').text(`${value0}Р `);
      $('.range-slider__end').text(` ${value1}Р`);
    },
    values: sliderValues,
  });

  Array.from(document.getElementsByClassName('range-slider__start'))[0].textContent =
    sliderValues[0];
  Array.from(document.getElementsByClassName('range-slider__end'))[0].textContent = sliderValues[1];
  new DatePicker({
    inputsClassname: 'js-date-picker',
    parentElementClassname: 'js-form-elements__item',
  });
  new DatePicker({
    parentElementClassname: 'form-elements__item--filter-date-dropdown',
    inputsClassname: 'js-date-picker',
    options: { range: true },
    applyRangeSelectedDates: true,
  });
  const datePickers = Array.from(document.getElementsByClassName('js-dropdown-accom'));

  new DropdownAccom({
    element: datePickers[0],
  });
  new DropdownAccom({
    element: datePickers[1],
    type: 'furniture',
  });
  new DropdownAccom({
    element: datePickers[2],
  });
  new DropdownAccom({
    element: datePickers[3],
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

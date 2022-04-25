import '../../components/range-slider/range-slider.js';
import '../../components/rate-button/rate-button.js';
import '../../components/subscription-text-field/subscription-text-field.js';
import '../../components/text-field/text-field.js';
import '../../components/toggle/toggle.js';
import '../../components/checkbox-rich/checkbox-rich.js';
import '../../components/hotel-card/hotel-card.js';
import '../../components/pagination/pagination.js';
import '../../components/checkbox-list/checkbox-list.js';
import '../../components/date-picker/date-picker.js';
import '../../components/checkbox-buttons/checkbox-buttons.js';
import formatTheValue from '../../components/range-slider/range-slider.js';
import { options, bindCalendar } from '../../components/date-picker/date-picker.js';
import './search-room-and-filter.scss';
import DropdownAccom from '../../components/dropdown-submit-and-clear/DropdownAccom.js';

const handleContentLoaded = () => {
  const sliderValues = [5000, 10000];
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
  bindCalendar({
    parentElementClassname: 'js-sidebar',
    inputsClassname: 'js-date-picker',
    optionsForCalendar: { ...options, range: true },
    applyRangeSelectedDates: true,
  });
  new DropdownAccom({
    element: document.querySelector('.js-sidebar__item--dropdown-accom-people .js-dropdown-accom'),
  });
  new DropdownAccom({
    element: document.querySelector(
      '.js-sidebar__item--dropdown-accom-furniture .js-dropdown-accom'
    ),
    type: 'furniture',
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

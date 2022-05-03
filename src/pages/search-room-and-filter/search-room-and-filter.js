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
import initSlider from '../../components/range-slider/range-slider.js';
import { DatePicker } from '../../components/date-picker/date-picker.js';
import DropdownAccom from '../../components/dropdown-submit-and-clear/DropdownAccom.js';
import './search-room-and-filter.scss';

const handleContentLoaded = () => {
  initSlider('.js-range-slider__item');
  new DatePicker({
    parentElementClassname: 'js-sidebar',
    inputsClassname: 'js-date-picker',
    optionsForCalendar: { range: true },
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

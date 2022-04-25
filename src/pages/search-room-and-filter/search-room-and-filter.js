import '../../components/range-slider/range-slider.js';
import '../../components/rate-button/rate-button.js';
import '../../components/subscription-text-field/subscription-text-field.js';
import '../../components/text-field/text-field.js';
import '../../components/toggle/toggle.js';
import '../../components/checkbox-rich/checkbox-rich.js';
import '../../components/dropdown-submit-and-clear/dropdown-submit-and-clear.js';
import '../../components/hotel-card/hotel-card.js';
import '../../components/pagination/pagination.js';
import '../../components/checkbox-list/checkbox-list.js';
import '../../components/date-picker/date-picker.js';
import '../../components/checkbox-buttons/checkbox-buttons.js';
import { options, bindCalendar } from '../../components/date-picker/date-picker.js';
import './search-room-and-filter.scss';
import DropdownAccom from '../../components/dropdown-submit-and-clear/DropdownAccom.js';

const handleContentLoaded = () => {
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

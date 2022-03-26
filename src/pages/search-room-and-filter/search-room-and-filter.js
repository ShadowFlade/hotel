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
import { options, bindCalendar } from '../../components/air-datepicker/air-datepicker';
import './search-room-and-filter.scss';

const handleContentLoaded = () => {
  bindCalendar({
    parentElementClassname: 'js-sidebar',
    inputsClassname: 'js-date-picker',
    optionsForCalendar: { ...options, range: true },
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

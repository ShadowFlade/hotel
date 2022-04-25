import { options, bindCalendar } from '../date-picker/date-picker';
import './bill.scss';
import DropdownAccom from '../dropdown-submit-and-clear/DropdownAccom';
const handleContentLoaded = () => {
  bindCalendar({
    inputsClassname: 'js-date-picker',
    optionsForCalendar: { ...options, range: true },
    parentElementClassname: 'js-bill',
  });
  new DropdownAccom({
    element: document.querySelector('.js-bill .js-dropdown-accom'),
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

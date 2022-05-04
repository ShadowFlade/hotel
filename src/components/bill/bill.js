import { DatePicker } from '../date-picker/date-picker';
import './bill.scss';
import DropdownAccom from '../dropdown-submit-and-clear/DropdownAccom';
const handleContentLoaded = () => {
  new DatePicker({
    inputsClassname: 'js-date-picker',
    parentElementClassname: 'js-bill',
  });
  new DropdownAccom({
    element: document.querySelector('.js-bill .js-dropdown-accom'),
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

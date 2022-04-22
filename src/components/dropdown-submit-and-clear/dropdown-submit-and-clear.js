import DropdownAccom from './DropdownAccom';
import './dropdown-submit-and-clear.scss';

const bindDropdownSubmitAndClear = () => {};
const handleContentLoaded = () => {
  const dropdowns = Array.from(document.getElementsByClassName('js-dropdown-accom'));
  dropdowns.forEach((item) => {});
  return true;
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

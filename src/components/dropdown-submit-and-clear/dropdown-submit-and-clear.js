import DropdownAccom from './DropdownAccom';
import './dropdown-submit-and-clear.scss';

const bindDropdownSubmitAndClear = () => {};
const handleContentLoaded = () => {
  const dropdowns = Array.from(document.getElementsByClassName('js-dropdown-accom'));
  dropdowns.forEach((item) => {
    // const dropdown = new DropdownAccom(item, '.js-dropdown-accom__ul', 0);
  });
  return true;
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

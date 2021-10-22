import './dropdownSubmitAndClear.scss'
import DropdownAccom from '../dropdownClass/dropdownClass'
const handleContentLoaded = ()=>{
  const dropdowns = Array.from(document.getElementsByClassName('js-dropdown-accom__big'))
  dropdowns.forEach(item => {
    const dropdown = new DropdownAccom(item, '.js-dropdown-accom__ul', 0)
  });
}
document.addEventListener('DOMContentLoaded', handleContentLoaded)

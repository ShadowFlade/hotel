import './dropdown-submit-and-clear.scss'
import DropdownAccom from '../dropdown-class/dropdown-class'
const handleContentLoaded = ()=>{
  const dropdowns = Array.from(document.getElementsByClassName('js-dropdown-accom__big'))
  dropdowns.forEach(item => {
    const dropdown = new DropdownAccom(item, '.js-dropdown-accom__ul', 0)
  });
}
document.addEventListener('DOMContentLoaded', handleContentLoaded)

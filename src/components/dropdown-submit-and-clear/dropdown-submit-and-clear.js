import DropdownAccom from './dropdown-class'
import './dropdown-submit-and-clear.scss'
const handleContentLoaded = ()=>{
  const dropdowns = Array.from(document.getElementsByClassName('js-dropdown-accom'))
  dropdowns.forEach(item => {
    const dropdown = new DropdownAccom(item, '.js-dropdown-accom__ul', 0)
  });
}
document.addEventListener('DOMContentLoaded', handleContentLoaded)

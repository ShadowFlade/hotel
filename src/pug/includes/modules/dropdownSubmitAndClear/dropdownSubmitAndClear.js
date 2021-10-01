import './dropdownSubmitAndClear.scss'
import DropdownAccom from '../dropdownClass/dropdownClass'
document.addEventListener('DOMContentLoaded',(e)=>{
  const dropdowns=Array.from(document.getElementsByClassName('js-dropdown-accom__big'))
  dropdowns.forEach(item => {
    const dropdown=new DropdownAccom(item,'.js-dropdown-accom__ul',0)
  });
})


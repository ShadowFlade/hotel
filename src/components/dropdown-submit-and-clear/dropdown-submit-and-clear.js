import DropdownAccom from './DropdownAccom';
import './dropdown-submit-and-clear.scss';
const prohibitTyping=(event)=>{
  if(event.key==='Tab'){
    return true
  } else {
    event.preventDefault()
  }
}
const handleContentLoaded = ()=>{
  const dropdowns = Array.from(document.getElementsByClassName('js-dropdown-accom'));
  dropdowns.forEach(item => {
    const dropdown = new DropdownAccom(item, '.js-dropdown-accom__ul',0);
    Array.from(item.getElementsByClassName('js-dropdown-accom__input'))[0].addEventListener('keydown',prohibitTyping)
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);


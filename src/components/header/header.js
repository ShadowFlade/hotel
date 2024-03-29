import '../button/button.js';
import '../burger-menu/burger-menu.js';
import '../pay-button/pay-button.js';
import '../footer/footer.js';
import '../subscription-text-field/subscription-text-field.js';
import '../navbar/navbar.js';
import './header.scss';
const handleContentLoaded = ()=>{
  const navbarItems = Array.from(document.getElementsByClassName('navbar__item'));
  navbarItems.forEach((item)=>{
    if (item.textContent.toLowerCase().trim() === 'о нас' || item.textContent.toLowerCase() === 'about us') {
      item.classList.add('navbar__item--about-us');
    }
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

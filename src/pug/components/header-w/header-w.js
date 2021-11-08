import '../button--hollow/button--hollow.js'
import '../burger-menu/burger-menu.js'
import '../pay-button/pay-button.js'
import '../footer/footer.js'
import '../footer-mini/footer-mini.js'
import '../subscription-text-field/subscription-text-field.js'
import './header-w.scss'

const DOMContentLoaded=()=>{
  const navbarItems=Array.from(document.getElementsByClassName('navbar__item'))
  navbarItems.map((item)=>{
    if(item.textContent.toLowerCase().trim()==='о нас' || item.textContent.toLowerCase()==='about us') {
      item.classList.add('navbar__item--about-us')
      
    }
  })
}
document.addEventListener('DOMContentLoaded',DOMContentLoaded)
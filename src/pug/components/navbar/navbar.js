import './navbar.scss'
const DOMContentLoaded=()=>{
  const navbarItems=Array.from(document.getElementsByClassName('navbar__item'))
  navbarItems.map((item)=>{
    if(item.textContent.toLowerCase().trim()==='о нас' || item.textContent.toLowerCase()==='about us') {
      item.classList.add('navbar__item--about-us')
    }
  })
}
document.addEventListener('DOMContentLoaded',DOMContentLoaded)
 

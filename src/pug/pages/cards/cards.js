import './hotel-card.js'
import './cards.scss'
import '../../components/bill/bill.js'
import '../../components/sign-in/sign-in.js'
import '../../components/registration/registration.js'
import '../../components/rooms-for-you/rooms-for-you.js'
import '../../components/radio-buttons/radio-buttons.js'
import '../../components/pay-button/pay-button.js'
import '../../components/hotel-card/hotel-card.js'
import '../../components/toggle/toggle.js'
import '../../components/date-picker/date-picker.js'
import '../../components/filter-date-dropdown/filter-date-dropdown.js'
const DOMContentLoaded = ()=>{
  setTimeout(()=>{
    const datepicker = document.getElementsByClassName('daterangepicker ltr show-calendar opensright moveup')[0]
    datepicker.style.position = 'relative'
    datepicker.style.top = '-6px'
    datepicker.style.left = '0px'
    const target = document.querySelector('.js-card__datepicker')
    target.appendChild(datepicker)
  }, 0)
}
document.addEventListener('DOMContentLoaded', DOMContentLoaded)

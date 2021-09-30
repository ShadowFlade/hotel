import './hotel-card.js'
import './cards.scss'
import '../../includes/modules/bill/bill.js'
import '../../includes/modules/sign-in/sign-in.js'
import '../../includes/modules/registration/registration.js'
import '../../includes/modules/rooms-for-you/rooms-for-you.js'
import '../../includes/modules/radio-buttons/radio-buttons.js'
import '../../includes/modules/pay-button/pay-button.js'
import '../../includes/modules/buttons/buttons.js'
import '../../includes/modules/hotel-card/hotel-card.js'
import '../../includes/modules/toggle/toggle.js'
import '../../includes/modules/date-picker/date-picker.js'
import '../../includes/modules/filter-date-dropdown/filter-date-dropdown.js'
setTimeout(()=>{
  const datepicker=document.getElementsByClassName('daterangepicker ltr show-calendar opensright moveup')[0]
  datepicker.style.position='relative'
  datepicker.style.top='-6px'
  datepicker.style.left='0px'
  const target=document.querySelector('.card__datepicker')
  target.appendChild(datepicker)
},0)
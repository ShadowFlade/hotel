import AirDatepicker from 'air-datepicker';
import '../../components/bill/bill.js';
import '../../components/sign-in/sign-in.js';
import '../../components/registration/registration.js';
import '../../components/rooms-for-you/rooms-for-you.js';
import '../../components/radio-buttons/radio-buttons.js';
import '../../components/pay-button/pay-button.js';
import '../../components/hotel-card/hotel-card.js';
import '../../components/toggle/toggle.js';
import '../../components/logo-landing/logo-landing.js';
import '../../components/date-picker/date-picker.js';
import './hotel-card.js';
import './cards.scss';
const handleContentLoaded = () => {
  const datepickerItem = document.querySelector('.js-cards__datepicker');
  const datepicker = new AirDatepicker(datepickerItem, {
    inline: true,
    visible: true,
    position: 'center',
  });
  datepicker.$datepicker.style.display = 'block';
  datepicker.$datepicker.style.top = '0%';
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

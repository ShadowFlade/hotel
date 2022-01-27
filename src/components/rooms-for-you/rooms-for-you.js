import AirDatepicker from 'air-datepicker';
import { options, bindCalendar } from '../air-datepicker/air-datepicker.js';
import '../dropdown-submit-and-clear/dropdown-submit-and-clear.js';
import './rooms-for-you.scss';

function position({ $datepicker, $target, $pointer }) {
  const roomsForYouCoords = $target.parentElement.parentElement.parentElement.getBoundingClientRect();
  $datepicker.style.left = window.scrollX + roomsForYouCoords.left;
}

const onShow = ()=>{

};
const handleContentLoaded = ()=>{
  const newOptions = {
    ...options,
    classes: 'air-datepicker--rooms-for-you',
    position({ $datepicker, $target, $pointer }) {
      let coords = $target.getBoundingClientRect();
      let dpHeight = $datepicker.clientHeight;
      let dpWidth = $datepicker.clientWidth;

      let top = coords.y + coords.height / 2 + window.scrollY - dpHeight / 2;
      let left = coords.x + coords.width / 2 - dpWidth / 2;

      $datepicker.style.left = `${left}px`;
      $datepicker.style.top = `${Number(top) + 200}px`;

      $pointer.style.display = 'none';
    }
  };
  bindCalendar('js-rooms-for-you', 'js-date-picker__input', newOptions);
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

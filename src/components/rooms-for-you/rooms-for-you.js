import AirDatepicker from 'air-datepicker';
import { options, bindCalendar } from '../air-datepicker/air-datepicker.js';
import '../dropdown-submit-and-clear/dropdown-submit-and-clear.js';
import './rooms-for-you.scss';

function position({ $datepicker, $target, $pointer }) {
  const roomsForYouCoords = $target.parentElement.parentElement.parentElement.getBoundingClientRect();
  $datepicker.style.left = window.scrollX + roomsForYouCoords.left;
}

const renderToAnotherInput=({datepicker,parent})=>{
  const parentItem=document.querySelector(`.${parent}`)
  const inputs=Array.from(parentItem.querySelectorAll('.js-date-picker__input'))
  const dates=datepicker.selectedDates
  const formattedDates=dates.map(date=>datepicker.formatDate(date,'dd.MM.yyyy'))  
  inputs[0].value=formattedDates[0]
  if(formattedDates[1]){
    inputs[1].value=formattedDates[1]
  }
}
const handleContentLoaded = ()=>{
  const newOptions = {
    ...options,
    range:true,
    selectOtherMonths:false,
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
    },
    onSelect:({date,formattedDate,datepicker})=>{
      renderToAnotherInput({datepicker,parent:'rooms-for-you'})
    },
  }
  bindCalendar('js-rooms-for-you','js-date-picker__input', newOptions);

  };

document.addEventListener('DOMContentLoaded', handleContentLoaded);

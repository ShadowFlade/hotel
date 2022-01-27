import AirDatepicker from 'air-datepicker';
import {options,bindCalendar} from '../air-datepicker/air-datepicker.js';
import '../dropdown-submit-and-clear/dropdown-submit-and-clear.js';
import './rooms-for-you.scss';
const newOptions={...options,classes:'air-datepicker--rooms-for-you'}
const handleContentLoaded=()=>{
  bindCalendar('js-rooms-for-you','js-date-picker__input',newOptions)
}
document.addEventListener('DOMContentLoaded',handleContentLoaded)
import {options,bindCalendar} from '../air-datepicker/air-datepicker'
import './bill.scss';
const handleContentLoaded=()=>{
  bindCalendar('js-bill','js-date-picker__input',options)
}
document.addEventListener('DOMContentLoaded',handleContentLoaded)

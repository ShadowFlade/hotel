import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './air-datepicker.scss'
const options={
  range:false,
}
const handleContentLoaded=()=>{
  const items=Array.from(document.getElementsByClassName('air-datepicker')).map(item=>new AirDatepicker((item),options))
}
document.addEventListener('DOMContentLoaded',handleContentLoaded)

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './air-datepicker.scss'
const clearButton={
  content:'<button class="button button--inline js-button--inline button--undefined js-button--undefined" type="button">Очистить</button>',
}
const submitButton={
  content:'<button class="button button--inline js-button--inline button--undefined js-button--undefined" type="button">Применить</button>'
}
const options={
  range:true,
  navTitles:{
    days:'<i>MMMM</i> yyyy '
  },
  buttons:[clearButton,submitButton],
  visible:false,
  inline:false,
}

const toggleDPVisibility=(datepicker)=>{

  if (datepicker.style.display==='block') {
    datepicker.style.display='none'
  } else {
    datepicker.style.display='block'
  }
}
const handleContentLoaded=()=>{
  Array.from(document.getElementsByClassName('js-date-picker')).map(item=>{
    const dp=new AirDatepicker((item),options)
    dp.$datepicker.addEventListener('click',(event)=>event.stopPropagation())
    item.addEventListener('click',(e)=>{
      toggleDPVisibility(dp.$datepicker)})
  })
}
document.addEventListener('DOMContentLoaded',handleContentLoaded)

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { bindOutsideClickDetection,getDOMElement } from '../../utils/utils';
import './air-datepicker.scss';
const clearButton = {
  content: '<button class="button button--inline js-button--inline button--undefined js-button--undefined" type="button">Очистить</button>',
};
const submitButton = {
  content: '<button class="button button--inline js-button--inline button--undefined js-button--undefined" type="button">Применить</button>'
};
const options = {
  moveToOtherMonthsOnSelect:false,
  range: false,
  navTitles: {
    days: 'MMMM  yyyy '
  },
  multipleDatesSeparator:' - ',
  prevHtml: '<img src="./assets/img/arrow_back.jpg"/>',
  nextHtml: '<img src="./assets/img/arrow_forward.jpg"/>',
  buttons: [clearButton, submitButton],
  inline: true,
};

const toggleDPVisibility = (datepicker)=>{
  if (datepicker.style.display === 'block') {
    datepicker.style.display = 'none';
    return false;
  }
  datepicker.style.display = 'block';
  return true;
};
const hideDP = (datepicker)=>{
  if (datepicker.style.display === 'block') {
    datepicker.style.display = 'none';
    return false;
  }
};
const bindCalendar = (parentElementClassname, inputClassname, optionsForCalendar,elementToIgnore)=>{
  const parentElement=getDOMElement(parentElementClassname,true)
  console.log(getDOMElement(inputClassname,false,'DOM element'))
  const inputs = getDOMElement(inputClassname,false).filter(item=>!item.className.includes(elementToIgnore));
  const datePickers=[]
  inputs.forEach(input=>{
    const dp = new AirDatepicker(input, optionsForCalendar);
    datePickers.push(dp)
    dp.$datepicker.addEventListener('click', (event)=>event.stopPropagation());
    bindOutsideClickDetection(input,dp.$datepicker)
    input.addEventListener('click', (e)=>{
      e.stopPropagation()
      datePickers.forEach(datepicker=>{
        if(datepicker!==dp){
          hideDP(datepicker.$datepicker)}
        })
    });
    return true;
  });
};
export { options, bindCalendar };

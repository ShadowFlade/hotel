import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './air-datepicker.scss';
const clearButton = {
  content: '<button class="button button--inline js-button--inline button--undefined js-button--undefined" type="button">Очистить</button>',
};
const submitButton = {
  content: '<button class="button button--inline js-button--inline button--undefined js-button--undefined" type="button">Применить</button>'
};
const options = {
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
const bindCalendar = (parentElementClassname, inputClassname, optionsForCalendar,elementToIgnore)=>{
  const parentElement = document.querySelector(`.${parentElementClassname}`);
  const inputs = Array.from(parentElement.querySelectorAll(`.${inputClassname}`)).filter(item=>!item.className.includes(elementToIgnore));
  inputs.forEach(item=>{
    const dp = new AirDatepicker(item, optionsForCalendar);
    dp.$datepicker.addEventListener('click', (event)=>event.stopPropagation());
    item.addEventListener('click', (e)=>{
      toggleDPVisibility(dp.$datepicker);
    });
    return true;
  });
};
export { options, bindCalendar };

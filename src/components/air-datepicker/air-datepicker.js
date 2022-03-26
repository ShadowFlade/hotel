import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { bindOutsideClickDetection, getDOMElement } from '../../utils/utils';
import './air-datepicker.scss';
const clearButton = {
  content: '<button class="button button--inline js-button--inline" type="button">Очистить</button>',
};
const submitButton = {
  content: '<button class="button button--inline js-button--inline" type="button">Применить</button>',
};
const options = {
  moveToOtherMonthsOnSelect: false,
  range: false,
  navTitles: {
    days: 'MMMM  yyyy ',
  },
  multipleDatesSeparator: ' - ',
  prevHtml: '<img src="./assets/img/arrow_back.png"/>',
  nextHtml: '<img src="./assets/img/arrow_forward.png"/>',
  buttons: [clearButton, submitButton],
  inline: true,
};

const toggleDPVisibility = (datepicker) => {
  if (datepicker.style.display === 'block') {
    datepicker.style.display = 'none';
    return false;
  }
  datepicker.style.display = 'block';
  return true;
};
const hideDP = (datepicker) => {
  if (datepicker.style.display === 'block') {
    datepicker.style.display = 'none';
    return false;
  }
};

const bindCalendar = ({ inputsClassname, optionsForCalendar = options, parentElementClassname }) => {
  const parentElement = Array.from(document.getElementsByClassName(parentElementClassname))[0] || document;
  const inputElements = Array.from(parentElement.getElementsByClassName(inputsClassname));
  const dp = new AirDatepicker(inputElements.at(0), optionsForCalendar);
  Array.from(document.getElementsByClassName('js-button--inline')).forEach((item) =>
    item.addEventListener('click', (e) => {
      e.preventDefault();
    })
  );
  console.log(inputElements.at(0), 'needed element');
  inputElements.forEach((input) => {
    if (!!parentElementClassname && !!parentElement && !parentElement.contains(input)) {
      console.warn('No parent element found');
      return;
    } else {
    }
    bindOutsideClickDetection(input, dp.$datepicker);
    input.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
};
export { options, bindCalendar };

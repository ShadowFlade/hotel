// prettier-ignore
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { bindOutsideClickDetection, getDOMElement, formatMe } from '../../utils/utils';
import './air-datepicker.scss';
const clearButton = {
  content:
    '<button class="button button--inline js-button--inline" type="button">Очистить</button>',
};
const submitButton = {
  content:
    '<button class="button button--inline js-button--inline" type="button">Применить</button>',
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
const readDatePlaceholder = (elements) => {
  const pattern = new RegExp(/(\d{2})\.(\d{2})\.(\d+)/);
  const replace = new RegExp(/\./, 'gi');
  const placeholders = [];
  elements.forEach((element) => {
    const placeholder = Array.from(element.getElementsByTagName('input')).at(0).placeholder;
    const match = placeholder.match(pattern);
    if (match) {
      const formattedDate = match
        .slice(1)
        .reverse()
        .map((item) => item)
        .join('-');
      placeholders.push(formattedDate);
    }
  });
  return placeholders.at(-1)?.trim();
};
const sendDataToInputs = ({ date, startInput, endInput }) => {
  console.log(date.constructor);
  startInput.value = date.constructor.toLowerCase === 'array' ? date.at(0).toISOString() : date;
  endInput.value = date.constructor.toLowerCase === 'array' ? date.at(1).toISOString() : date;
};

const bindCalendar = ({
  inputsClassname,
  optionsForCalendar = options,
  parentElementClassname,
  applyRangeSelectedDates,
}) => {
  const dayRange = 4;
  const startDate = new Date(Date.now() - 86400 * dayRange * 1000);
  const month = new Intl.DateTimeFormat('ru-RU', {
    month: 'short',
  })
    .format(Date.now())
    .replace(/\./, '');
  const startDateString = `${startDate.getDate()} ${month}`;
  const endDate = new Date(Date.now());

  const endDateString = `${endDate.getDate()} ${month}`;

  const hiddenInputStart = document.createElement('input');
  hiddenInputStart.type = 'hidden';
  hiddenInputStart.name = 'from';
  hiddenInputStart.value = startDate.toISOString();

  const hiddenInputEnd = document.createElement('input');
  hiddenInputEnd.type = 'hidden';
  hiddenInputEnd.name = 'to';
  hiddenInputEnd.value = endDate.toISOString();

  const parentElement =
    Array.from(document.getElementsByClassName(parentElementClassname))[0] || document;
  const inputElements = Array.from(parentElement.getElementsByClassName(inputsClassname));
  const placeholder = readDatePlaceholder(inputElements);
  const dp = new AirDatepicker(inputElements.at(0), {
    ...optionsForCalendar,
    startDate: placeholder,
    onSelect({ date }) {
      sendDataToInputs({ date, startInput: hiddenInputStart, endInput: hiddenInputEnd });
    },
  });
  dp.$datepicker.append(hiddenInputStart, hiddenInputEnd);
  Array.from(document.getElementsByClassName('js-button--inline')).forEach((item) =>
    item.addEventListener('click', (e) => {
      e.preventDefault();
    })
  );

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
  if (applyRangeSelectedDates) {
    const inputElement = inputElements.at(-1).querySelector('input');

    const newPlaceholder = `${startDateString} - ${endDateString}`;
    inputElement.placeholder = newPlaceholder;
    dp.selectDate([startDate, endDate]);
  } else {
    dp.selectDate(placeholder);
  }
};
export { options, bindCalendar };

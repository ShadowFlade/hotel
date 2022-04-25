// prettier-ignore
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { bindOutsideClickDetection, getDOMElement, formatMe } from '../../utils/utils';
import './date-picker.scss';
const clearButton = {
  content:
    '<button class="button button--inline js-button--inline" type="button">Очистить</button>',
  onClick: (dp) => {
    dp.clear();
  },
};
const submitButton = {
  content:
    '<button class="button button--inline js-button--inline" type="button">Применить</button>',
};
const options = {
  moveToOtherMonthsOnSelect: false,
  range: true,
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
const formatDate = (date) => {
  return `${date.getDate()}.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getFullYear()}`;
};
const sendDataToInputsAndUpdatePlaceholder = ({ date, startInput, endInput, inputElements }) => {
  const inputs = inputElements.map((item) => item.querySelector('input'));
  const isArray = date.constructor.name.toLowerCase() === 'array';

  startInput.value = isArray ? date.at(0).toISOString() : date.toISOString();
  endInput.value = isArray ? date.at(1)?.toISOString() : date.toISOString() || 'not set';
  try {
    if (isArray) {
      inputs.at(0).placeholder = formatDate(date.at(0));
      inputs.at(1).placeholder = formatDate(date.at(1));
    } else {
      inputs.at(0).placeholder = formatDate(date);
      inputs.at(1).placeholder = formatDate(date);
    }
  } catch (e) {
    //doing nothing,because we try to get the second date,which is not there, but it is still in the placeholder,therefore its ok
  }
};
const updatePlaceholderInSingleInputElement = ({ date, inputElement }) => {
  const fromMonth = new Intl.DateTimeFormat('ru-RU', {
    month: 'short',
  })
    .format(date.at(0))
    .replace(/\./, '');
  const toMonth = new Intl.DateTimeFormat('ru-RU', {
    month: 'short',
  })
    .format(date.at(1))
    .replace(/\./, '');
  const fromDate = `${date.at(0).getDate()} ${fromMonth}`;
  try {
    const toDate = `${date.at(1).getDate()} ${toMonth}`;
    inputElement.placeholder = `${fromDate} - ${toDate}`;
  } catch (e) {
    //same
  }
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
      !applyRangeSelectedDates
        ? sendDataToInputsAndUpdatePlaceholder({
            date,
            startInput: hiddenInputStart,
            endInput: hiddenInputEnd,
            inputElements,
          })
        : updatePlaceholderInSingleInputElement({
            date,
            inputElement: inputElements.at(-1).querySelector('input'),
          });
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
    setTimeout(() => {
      inputElements.at(0).querySelector('input').placeholder = 'ДД.ММ.ГГГГ';
    }, 0);
  }
};

$(function () {
  $('.js-card__datepicker').click();
  $(document).mouseup(function () {
    $('.end-date').removeClass('in-range');
  });
  $('.ui-datepicker-calendar a.ui-state-default').css('width', '20px');
  const prohibitTyping = (event) => {
    if (event.key === 'Tab') {
      return true;
    }
    event.preventDefault();
    return true;
  };
  $('.js-date-picker__input').on('keydown', prohibitTyping);
});
export { options, bindCalendar };

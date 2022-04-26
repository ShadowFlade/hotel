// prettier-ignore
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { bindOutsideClickDetection, getDOMElement, formatMe } from '../../utils/utils';
import './date-picker.scss';

class DatePicker {
  dayRange = 4;
  startDate = new Date(Date.now() - 86400 * this.dayRange * 1000);
  endDate = new Date(Date.now());
  clearButton = {
    content:
      '<button class="button button--inline js-button--inline" type="button">Очистить</button>',
    onClick: (dp) => {
      dp.clear();
    },
  };
  submitButton = {
    content:
      '<button class="button button--inline js-button--inline" type="button">Применить</button>',
  };
  defaultOptions = {
    moveToOtherMonthsOnSelect: false,
    range: true,
    navTitles: {
      days: 'MMMM  yyyy ',
    },
    multipleDatesSeparator: ' - ',
    prevHtml: '<img src="./assets/img/arrow_back.png"/>',
    nextHtml: '<img src="./assets/img/arrow_forward.png"/>',
    buttons: [this.clearButton, this.submitButton],
    inline: true,
  };

  constructor({
    inputsClassname,
    options = this.defaultOptions,
    parentElementClassname,
    applyRangeSelectedDates,
  }) {
    this.optionsForCalendar = { ...this.defaultOptions, options };
    this.applyRangeSelectedDates = applyRangeSelectedDates;
    this.init({ inputsClassname, parentElementClassname });
  }

  init({ inputsClassname, parentElementClassname }) {
    this.bindCalendarToDOMElements({ inputsClassname, parentElementClassname });
    this.initializeValues();
    this.disableButtonsDefaultBehavior();
    this.prohibitTyping();
  }

  initializeValues() {
    if (this.applyRangeSelectedDates) {
      const month = new Intl.DateTimeFormat('ru-RU', {
        month: 'short',
      })
        .format(Date.now())
        .replace(/\./, '');
      const inputElement = this.inputElements.at(-1).querySelector('input');
      const startDateString = `${this.startDate.getDate()} ${month}`;
      const endDateString = `${this.endDate.getDate()} ${month}`;

      const newPlaceholder = `${startDateString} - ${endDateString}`;
      inputElement.placeholder = newPlaceholder;
      this.dp.selectDate([this.startDate, this.endDate]);
    } else {
      const placeholder = this.readDatePlaceholder(this.inputElements);
      this.dp.selectDate(placeholder);
      setTimeout(() => {
        this.inputElements.at(0).querySelector('input').placeholder = 'ДД.ММ.ГГГГ';
      }, 0);
    }
  }

  bindCalendarToDOMElements({ inputsClassname, parentElementClassname, applyRangeSelectedDates }) {
    const hiddenInputStart = document.createElement('input');
    hiddenInputStart.type = 'hidden';
    hiddenInputStart.name = 'from';
    hiddenInputStart.value = this.startDate.toISOString();

    const hiddenInputEnd = document.createElement('input');
    hiddenInputEnd.type = 'hidden';
    hiddenInputEnd.name = 'to';
    hiddenInputEnd.value = this.endDate.toISOString();
    this.DOMParent =
      Array.from(document.getElementsByClassName(parentElementClassname))[0] || document;
    this.inputElements = Array.from(this.DOMParent.getElementsByClassName(inputsClassname));
    const placeholder = this.readDatePlaceholder(this.inputElements);

    this.dp = new AirDatepicker(this.inputElements.at(0), {
      ...this.defaultOptions,
      startDate: placeholder,
      onSelect: ({ date }) => {
        !this.applyRangeSelectedDates
          ? this.sendDataToInputsAndUpdatePlaceholder({
              date,
              startInput: hiddenInputStart,
              endInput: hiddenInputEnd,
              inputElements: this.inputElements,
            })
          : this.updatePlaceholderInSingleInputElement({
              date,
              inputElement: this.inputElements.at(-1).querySelector('input'),
            });
      },
    });
    this.dp.$datepicker.append(hiddenInputStart, hiddenInputEnd);
    this.inputElements.forEach((input) => {
      if (!!parentElementClassname && !!this.DOMParent && !this.DOMParent.contains(input)) {
        console.warn('No parent element found');
        return;
      } else {
      }
      bindOutsideClickDetection(input, this.dp.$datepicker);
      input.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  readDatePlaceholder(elements) {
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
  }

  sendDataToInputsAndUpdatePlaceholder({ date, startInput, endInput, inputElements }) {
    const inputs = inputElements.map((item) => item.querySelector('input'));
    const isArray = date.constructor.name.toLowerCase() === 'array';

    startInput.value = isArray ? date.at(0).toISOString() : date.toISOString();
    endInput.value = isArray ? date.at(1)?.toISOString() : date.toISOString() || 'not set';
    try {
      if (isArray) {
        inputs.at(0).placeholder = this.formatDate(date.at(0));
        inputs.at(1).placeholder = this.formatDate(date.at(1));
      } else {
        inputs.at(0).placeholder = this.formatDate(date);
        inputs.at(1).placeholder = this.formatDate(date);
      }
    } catch (e) {
      //doing nothing,because we try to get the second date,which is not there, but it is still in the placeholder,therefore its ok
    }
  }

  updatePlaceholderInSingleInputElement({ date, inputElement }) {
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
  }

  formatDate(date) {
    return `${date.getDate()}.${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }.${date.getFullYear()}`;
  }

  disableButtonsDefaultBehavior() {
    Array.from(document.getElementsByClassName('js-button--inline')).forEach((item) =>
      item.addEventListener('click', (e) => {
        e.preventDefault();
      })
    );
  }

  prohibitTyping() {
    this.inputElements.forEach((inputElement) => {
      inputElement.addEventListener('keydown', (event) => {
        event.preventDefault();
      });
    });
  }
}
//нужно ли это?
// $(function () {
//   $('.js-card__datepicker').click();
//   $(document).mouseup(function () {
//     $('.end-date').removeClass('in-range');
//   });
//   $('.ui-datepicker-calendar a.ui-state-default').css('width', '20px');
//   const prohibitTyping = (event) => {
//     if (event.key === 'Tab') {
//       return true;
//     }
//     event.preventDefault();
//     return true;
//   };
//   $('.js-date-picker__input').on('keydown', prohibitTyping);
// });
export { DatePicker };

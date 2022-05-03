// prettier-ignore
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { data } from 'autoprefixer';
import { bindOutsideClickDetection } from '../../utils/utils';
import './date-picker.scss';

class DatePicker {
  dayRange = 4;
  startDate = new Date(Date.now());
  endDate = new Date(Date.now() + 86400 * this.dayRange * 1000);
  clearButton = {
    content: 'Очистить',
    onClick: (dp) => {
      dp.clear();
      this.disableButtonsDefaultBehavior();
    },
    className: 'button button--inline js-button--inline',
    attrs: {
      type: 'button',
    },
    tagName: 'button',
  };
  submitButton = {
    content:
      '<button class="button button--inline js-button--inline" type="button">Применить</button>',
  };
  defaultOptions = {
    moveToOtherMonthsOnSelect: false,
    selectOtherMonths: false,
    range: true,
    navTitles: {
      days: 'MMMM  yyyy ',
    },
    multipleDatesSeparator: ' - ',
    prevHtml: '<img src="./assets/img/arrow_back.png"/>',
    nextHtml: '<img src="./assets/img/arrow_forward.png"/>',
    buttons: [this.clearButton, this.submitButton],
    inline: true,
    minDate: new Date(Date.now()),
  };

  constructor({ inputsClassname, options = this.defaultOptions, parentElementClassname }) {
    this.optionsForCalendar = { ...this.defaultOptions, options };
    this.init({ inputsClassname, parentElementClassname });
  }

  init({ inputsClassname, parentElementClassname }) {
    this.bindCalendarToDOMElements({ inputsClassname, parentElementClassname });
    this.initializeValues();
    this.disableButtonsDefaultBehavior();
    this.prohibitTyping();
  }

  bindCalendarToDOMElements({ inputsClassname, parentElementClassname }) {
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

    this.dp = new AirDatepicker(this.inputElements.at(0), {
      ...this.defaultOptions,
      startDate: this.startDate,
      onSelect: ({ date }) => {
        if (date.length > 1) {
          return;
        }
        this.isDoubleInputs
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

    this.isDoubleInputs = this.inputElements.length > 1;

    this.dp.$datepicker.append(hiddenInputStart, hiddenInputEnd);
    this.inputElements.forEach((input) => {
      if (!!parentElementClassname && !!this.DOMParent && !this.DOMParent.contains(input)) {
        console.warn('No parent element found');
        return;
      }
      bindOutsideClickDetection(input, this.dp.$datepicker);
      input.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  initializeValues() {
    if (!this.isDoubleInputs) {
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
      setTimeout(() => {
        this.inputElements.at(0).querySelector('input').placeholder = 'ДД.ММ.ГГГГ';
      }, 0);
    }
  }

  getDateFromPlaceholder(elements) {
    const pattern = new RegExp(/(\d{2})\.(\d{2})\.(\d+)/);
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
    if (date.length === 0) {
      return;
    }
    const inputs = inputElements.map((item) => item.querySelector('input'));
    startInput.value = date.at(0) ? date.at(0).toISOString() : 'not set';
    endInput.value = date.at(1) ? date.at(1)?.toISOString() : 'not set';
    date.at(0) ? (inputs.at(0).placeholder = this.formatDate(date.at(0))) : false;
    date.at(1) ? (inputs.at(1).placeholder = this.formatDate(date.at(1))) : false;
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

export { DatePicker };

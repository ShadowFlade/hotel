// prettier-ignore
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { bindOutsideClickDetection } from '../../utils/utils';
import './date-picker.scss';

class DatePicker {
  dayRange = 4;
  startDate = new Date(Date.now());
  endDate = new Date(Date.now() + 86400 * this.dayRange * 1000);
  #hiddenInputs = [];
  clearButton = {
    content: 'Очистить',
    onClick: (dp) => {
      this.#clearInputs();
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
    content: 'Применить',
    className: 'button button--inline js-button--inline',
    attrs: {
      type: 'button',
    },
    tagName: 'button',
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
    dateFormat: (date) => {
      return this.#formatDateToISO(date);
    },
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
    hiddenInputStart.value = this.#formatDateToISO(this.startDate);
    this.#hiddenInputs.push(hiddenInputStart);

    const hiddenInputEnd = document.createElement('input');
    hiddenInputEnd.type = 'hidden';
    hiddenInputEnd.name = 'to';
    hiddenInputEnd.value = this.#formatDateToISO(this.endDate);
    this.#hiddenInputs.push(hiddenInputEnd);
    this.DOMParent =
      Array.from(document.getElementsByClassName(parentElementClassname))[0] || document;
    this.inputElements = Array.from(this.DOMParent.getElementsByClassName(inputsClassname));
    this.isDoubleInputs = this.inputElements.length > 1;

    this.dp = new AirDatepicker(this.inputElements.at(0), {
      ...this.defaultOptions,
      startDate: this.startDate,
      onSelect: ({ date }) => {
        if (date.length < 1) {
          return;
        }
        this.isDoubleInputs
          ? this.sendDataToInputsAndUpdateVisibleInputs({
              date,
              startInput: hiddenInputStart,
              endInput: hiddenInputEnd,
              inputElements: this.inputElements,
            })
          : this.sendDataToInputsAndUpdateVisibleInputsInSingleInputElement({
              date,
              startInput: hiddenInputStart,
              endInput: hiddenInputEnd,
              inputElement: this.inputElements.at(-1).querySelector('input'),
            });
      },
    });

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
  sendDataToInputsAndUpdateVisibleInputs({ date, startInput, endInput, inputElements }) {
    if (date.length === 0) {
      return;
    }
    const inputs = inputElements.map((item) => item.querySelector('input'));
    startInput.value = date.at(0) ? this.#formatDateToISO(date.at(0)) : 'not set';
    endInput.value = date.at(1) ? this.#formatDateToISO(date.at(1)) : 'not set';
    date.at(0) ? (inputs.at(0).value = this.formatDate(date.at(0))) : false;
    date.at(1) ? (inputs.at(1).value = this.formatDate(date.at(1))) : false;
  }

  sendDataToInputsAndUpdateVisibleInputsInSingleInputElement({
    date,
    startInput,
    endInput,
    inputElement,
  }) {
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
    startInput.value = date.at(0) ? this.#formatDateToISO(date.at(0)) : 'not set';
    endInput.value = date.at(1) ? this.#formatDateToISO(date.at(1)) : 'not set';

    const toDate = date.at(1) ? `${date.at(1).getDate()} ${toMonth}` : false;
    if (fromDate && toDate) {
      inputElement.value = `${fromDate} - ${toDate}`;
    }
  }

  formatDate(date) {
    return `${date.getDate()}.${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }.${date.getFullYear()}`;
  }
  #formatDateToISO(date) {
    const d = new Date(date);
    const timeZoneOffset = new Date(date).getTimezoneOffset() * 60 * 1000;
    let localDate = d - timeZoneOffset;
    localDate = new Date(localDate);
    let iso = localDate.toISOString();
    iso = iso.slice(0, 11).replace('T', '');
    return iso;
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

      const newVisibleInputs = `${startDateString} - ${endDateString}`;
      inputElement.placeholder = newVisibleInputs;
    } else {
      setTimeout(() => {
        this.inputElements.at(0).querySelector('input').placeholder = 'ДД.ММ.ГГГГ';
      }, 0);
      const secondInput = this.inputElements.at(1).querySelector('input');
      if (!secondInput.placeholder) {
        secondInput.placeholder = this.formatDate(new Date(Date.now() + 86400 * 1000 * 10));
      }
    }
  }

  getDateFromPlaceholders(elements) {
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

  disableButtonsDefaultBehavior() {
    Array.from(document.getElementsByClassName('js-button--inline')).forEach((item) =>
      item.addEventListener('click', (e) => {
        e.preventDefault();
      })
    );
  }
  #clearInputs() {
    this.inputElements.forEach((item) => (item.querySelector('input').value = ''));
    this.#hiddenInputs.forEach((item) => (item.value = ''));
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

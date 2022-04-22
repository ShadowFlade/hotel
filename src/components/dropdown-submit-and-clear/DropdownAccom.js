import { bindOutsideClickDetection } from '../../utils/utils';

class DropdownAccom {
  input;
  list;
  listname;
  limit;
  type;
  submit;
  clear;
  count;
  adults = ['взрослые', 'дети'];
  juvenile = ['младенцы'];

  constructor(element, list, limit, type) {
    this.listName = list;
    this.type = type;
    this.limit = limit;
    this.bindPopup(element, list);
    this.bindIncrement();
    this.countTotal();
    this.refresh();
  }

  bindPopup(elementName, listName) {
    if (typeof elementName === 'string') {
      this.element = document.querySelector(elementName);
    } else if (typeof elementName === 'object') {
      this.element = elementName;
    }
    this.list = this.element.querySelector(this.listName);
    this.input = this.element.getElementsByClassName('js-dropdown-accom__input')[0];

    bindOutsideClickDetection(this.element, this.list);
    const submitButton = this.element.querySelector('.js-dropdown-accom__submit');
    this.submit = submitButton;
    const clearButton = this.element.querySelector('.js-dropdown-accom__clear');
    this.clear = clearButton;
  }

  bindIncrement() {
    const listChildren = Array.from(this.element.querySelectorAll('.js-dropdown-accom__option'));
    this.count = new Map();
    const handleIncrementClick = (e) => {
      const target = e.target;
      const li = target.closest('li');
      const category = li
        .getElementsByClassName('dropdown-accom__variant')[0]
        .textContent.toLowerCase();
      const storage = this.count.get(category);
      const value = Number(storage.get('value'));
      this.restrictDecrement(category, value + 1);
      this.count.get(category).set('value', value + 1);
      this.refresh(category);
    };
    const handleDecrementClick = (e) => {
      const target = e.target;
      const li = target.closest('li');
      const category = li
        .getElementsByClassName('dropdown-accom__variant')[0]
        .textContent.toLowerCase();
      const storage = this.count.get(category);
      const value = Number(storage.get('value'));
      this.restrictDecrement(category, value - 1);
      this.count.get(category).set('value', value - 1);
      this.refresh(category);
    };
    listChildren.forEach((child) => {
      const textElement = child.getElementsByClassName('dropdown-accom__info')[0];
      const incrementButton = child.getElementsByClassName('dropdown-accom__button--next')[0];
      const decrementButton = child.getElementsByClassName('dropdown-accom__button--prev')[0];
      const category = child.getElementsByClassName('dropdown-accom__variant')[0];
      const storage = new Map();
      storage.set('increment', incrementButton);
      storage.set('decrement', decrementButton);
      storage.set('value', Number(textElement.textContent));
      storage.set('textElement', textElement);
      this.count.set(category.textContent.toLowerCase(), storage);
      const mapIterator = this.count.entries;
      if (this.type === 'people') {
        let totalAdults = 0;
        for (let i = 0; i < mapIterator.length; i++) {
          const entry = mapIterator.next().value[1];

          totalAdults += entry[0] !== 'младенцы' && entry[0] !== 'total' ? entry[1] : 0;
        }
        this.count.set('adults', totalAdults);
        this.count.set('juvenile', (this.total || 0) - totalAdults);
      }
      incrementButton.addEventListener('click', handleIncrementClick);
      decrementButton.addEventListener('click', handleDecrementClick);
    });
    const onSubmit = () => {
      this.input.setAttribute('placeholder', `${this.total} гостей`);
    };
    const onClear = () => {
      this.reset();
      this.refresh();
      this.input.setAttribute('placeholder', `${this.total} гостей`);
    };
    if (this.submit && this.count) {
      this.submit.addEventListener('click', onSubmit);
      this.count.set('total', 0);
    }
    if (this.count && this.clear) {
      this.clear.addEventListener('click', onClear);
    }
  }

  reset() {
    Array.from(this.count.keys()).forEach((item) => {
      if (item === 'total') {
        return false;
      }
      this.count.get(item).set('value', 0);
      return true;
    });
  }

  refresh(category) {
    console.log(this.count);
    if (category === undefined) {
      let categories = Array.from(this.count.keys()).filter(
        (item) => item !== 'total' && item !== 'adults' && item !== 'juvenile'
      );
      categories.forEach((item) => {
        this.refresh(item);
        return true;
      });
      return true;
    }
    let value = this.count.get(category).get('value');
    this.restrictDecrement(category, value);
    const textElement = this.count.get(category).get('textElement');
    textElement.textContent = String(value);
    const total = this.countTotal();

    this.total = total;
    if (this.total > 0 && this.type === 'people') {
      this.input.setAttribute(
        'placeholder',
        `${this.totalAdults} гостей${
          this.totalJuvenile > 0 ? `, ${this.totalJuvenile} младенцев` : ''
        }`
      );
    } else if (total === 0 && this.type === 'people') {
      this.input.setAttribute('placeholder', 'Сколько гостей');
    }
    return true;
  }

  countTotal() {
    if (this.type === 'people') {
      let totalAdults = 0;
      if (this.type === 'people') {
      }
      this.adults.forEach((item) => {
        totalAdults += Number(this.count.get(item).get('value'));
      });

      this.count.set('adults', totalAdults);
      let totalJuvenile = 0;
      this.juvenile.forEach((item) => {
        totalJuvenile += this.count.get(item).get('value');
      });
      this.count.set('juvenile', totalJuvenile);
      this.totalJuvenile = totalJuvenile;
      this.totalAdults = this.total = totalAdults;

      return totalAdults;
    } else {
      let result = 0;
      const iterator = this.count.entries();
      for (let i = 0; i < iterator.length; i++) {
        result += iterator.next().value[1];
      }
      this.total = result;
    }
  }

  restrictDecrement(category, value) {
    const decrement = this.count.get(category).get('decrement');
    if (value === this.limit) {
      decrement.disabled = true;
      decrement.classList.add('dropdown-accom__button--disabled');
      return false;
    }
    decrement.classList.remove('dropdown-accom__button--disabled');
    decrement.disabled = false;
    return true;
  }

  prohibitTyping() {
    this.input.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        return true;
      }
      event.preventDefault();
      return true;
    });
  }
}

export default DropdownAccom;

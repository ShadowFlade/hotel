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
  includeInFurniture = ['спальни', 'кровати'];
  dictionary = {
    guests: {
      adults: ['взсролый', 'взрослых'],
      juvenile: ['младенец', 'младенца', 'младенцев'],
    },
    furniture: {
      beds: {
        1: 'кровать',
        2: 'кровати',
        5: 'кроватей',
      },
      bedrooms: {
        1: 'спальня',
        2: 'спальни',
        5: 'спален',
      },
    },
  };

  constructor({ element, list = '.js-dropdown-accom__ul', limit = 0, type = 'people' }) {
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
    this.submitButton = submitButton;
    const clearButton = this.element.querySelector('.js-dropdown-accom__clear');
    this.clear = clearButton;
  }

  bindIncrement() {
    const listChildren = Array.from(this.element.querySelectorAll('.js-dropdown-accom__option'));
    this.count = new Map();
    this.form = this.element.querySelector('form');
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
      const hiddenState = child.querySelector('.js-dropdown-accom__hidden');
      const storage = new Map();
      storage.set('increment', incrementButton);
      storage.set('decrement', decrementButton);
      storage.set('value', Number(textElement.textContent));
      storage.set('textElement', textElement);
      storage.set('hiddenState', hiddenState);
      this.count.set(category.textContent.toLowerCase(), storage);

      if (this.type === 'people') {
        let totalAdults = 0;
        this.totalAdults = totalAdults;
        this.totalJuvenile = this.total - totalAdults;
      }

      incrementButton.addEventListener('click', handleIncrementClick);
      decrementButton.addEventListener('click', handleDecrementClick);
    });
    const onSubmit = async () => {
      await fetch('path/to/backend', {
        method: 'POST',
        body: new FormData(this.form),
      });
    };
    const onClear = () => {
      this.reset();
      this.refresh();
    };
    if (this.submitButton && this.count) {
      this.submitButton.addEventListener('click', onSubmit);
      this.total = 0;
    }
    if (this.count && this.clear) {
      this.clear.addEventListener('click', onClear);
    }
  }

  reset() {
    Array.from(this.count.keys()).forEach((item) => {
      this.count.get(item).set('value', 0);
      return true;
    });
    this.total = 0;
  }

  refresh(category) {
    if (category === undefined) {
      let categories = Array.from(this.count.keys());
      categories.forEach((item) => {
        this.refresh(item);
        return true;
      });
      return true;
    }
    let value = this.count.get(category).get('value');
    this.restrictDecrement(category, value);
    const textElement = this.count.get(category).get('textElement');
    this.count.get(category).get('hiddenState').value = value;
    textElement.textContent = String(value);
    this.countTotal();

    if (this.total > 0 && this.type === 'people') {
      this.input.setAttribute(
        'placeholder',
        `${this.totalAdults} гостей${
          this.totalJuvenile > 0 ? `, ${this.totalJuvenile} младенцев` : ''
        }`
      );
    } else if (this.total === 0 && this.type === 'people') {
      this.input.setAttribute('placeholder', 'Сколько гостей');
    } else if (this.type === 'furniture' && this.total > 0) {
      const numOfBedrooms = this.count.get('спальни').get('value');
      const numOfBeds = this.count.get('кровати').get('value');
      const matchToNumOfBedrooms = this.findTheClosestNumber(
        numOfBedrooms,
        Object.keys(this.dictionary.furniture.bedrooms)
      );
      const matchToNumOfBeds = this.findTheClosestNumber(
        numOfBeds,
        Object.keys(this.dictionary.furniture.beds)
      );
      this.input.setAttribute(
        'placeholder',
        `${numOfBedrooms} ${this.dictionary.furniture.bedrooms[matchToNumOfBedrooms]} ${
          matchToNumOfBeds
            ? `, ${numOfBeds} ${this.dictionary.furniture.beds[matchToNumOfBeds]} `
            : ''
        }`
      );
    }
    return true;
  }

  countTotal() {
    if (this.type === 'people') {
      let totalAdults = 0;
      this.adults.forEach((item) => {
        totalAdults += Number(this.count.get(item).get('value'));
      });

      this.totalAdults = totalAdults;
      let totalJuvenile = 0;
      this.juvenile.forEach((item) => {
        totalJuvenile += this.count.get(item).get('value');
      });
      this.totalJuvenile = totalJuvenile;
      this.totalAdults = this.total = totalAdults;
    } else {
      let result = 0;
      const iterator = this.count.entries();

      for (let i = 0; i < this.count.size; i++) {
        const element = iterator.next().value;
        const value = element[1].get('value');
        const key = element[0];

        if (this.includeInFurniture.includes(key)) result += value;
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

  findTheClosestNumber(number, arrayOfNumbers) {
    let intermediat = Infinity;
    arrayOfNumbers.forEach((item) => {
      console.log({
        whatWorkingWith: arrayOfNumbers,
        number,
        item,
        intermediat,
      });
      number >= Number(item) ? (intermediat = item) : false;
    });
    console.log(intermediat, ' result');
    return intermediat;
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

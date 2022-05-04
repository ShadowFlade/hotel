import { bindOutsideClickDetection } from '../../utils/utils';
import './dropdown-submit-and-clear.scss';

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
  babies = ['младенцы'];
  includeInFurniture = ['спальни', 'кровати'];
  dictionary = {
    guests: {
      adults: {
        1: 'гость',
        2: 'гостя',
        5: 'гостей',
      },
      babies: {
        1: 'младенец',
        2: 'младенца',
        5: 'младенцев',
      },
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
      bathrooms: {
        1: 'ванная комната',
        2: 'ванные комнаты',
        5: 'ванных комнат',
      },
    },
  };

  constructor({ element, list = '.js-dropdown-accom__ul', limit = 0, type = 'people' }) {
    this.listName = list;
    this.type = type;
    this.limit = limit;
    this.#bindPopup(element, list);
    this.#bindIncrement();
    this.countTotal();
    this.refreshAllCategories();
    this.#prohibitTyping();
  }
  countTotal() {
    if (this.type === 'people') {
      let totalAdults = 0;
      this.adults.forEach((item) => {
        totalAdults += Number(this.count.get(item).get('value'));
      });

      this.totalAdults = totalAdults;
      let totalBabies = 0;
      this.babies.forEach((item) => {
        totalBabies += this.count.get(item).get('value');
      });
      this.totalBabies = totalBabies;
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
  reset() {
    Array.from(this.count.keys()).forEach((item) => {
      this.count.get(item).set('value', 0);
      return true;
    });
    this.total = 0;
  }

  refreshCategory(category) {
    let value = this.count.get(category).get('value');

    const categoryElement = this.count.get(category).get('categoryElement');
    this.count.get(category).get('hiddenState').value = value;
    categoryElement.textContent = String(value);
    this.countTotal();
    if (this.#doesValueExceedsRestriction(category, value)) {
      this.#restrictDecrement(category);
    }
    if (this.type === 'people' && category !== 'младенцы') {
      const amountOfBabies = this.count.get('младенцы').get('value');
      console.log(amountOfBabies, 'haha');
      if (amountOfBabies === 0) {
        this.#restrictDecrement('младенцы');
        console.log('no baby decrement');
      }
      if (this.totalAdults === 0) {
        this.#restrictDecrement('младенцы');
        this.#restrictIncrement('младенцы');
      } else if (this.totalAdults > 0 && amountOfBabies > 0) {
        this.#removeDecrementRestrictions('младенцы');
        this.#removeIncrementRestrictions('младенцы');
      } else if (this.totalAdults > 0 && amountOfBabies === 0) {
        this.#removeIncrementRestrictions('младенцы');
      }
      // this.#doesValueExceedsRestriction('младенцы', amountOfBabies);
    }

    this.#refreshPlaceholder();
  }
  #refreshPlaceholder() {
    if (this.type === 'people') {
      this.#refreshPlaceholderWithPeople();
    } else if (this.type === 'furniture') {
      this.#refreshPlaceholderWithFurniture();
    }
  }
  #refreshPlaceholderWithPeople() {
    if (this.totalAdults > 0) {
      const matchToNumberOfGuests = this.#findTheClosestNumberAndMatchTheGrammar(
        this.totalAdults,
        Object.keys(this.dictionary.guests.adults)
      );
      const matchToNumberOfKids = this.#findTheClosestNumberAndMatchTheGrammar(
        this.totalBabies,
        Object.keys(this.dictionary.guests.babies)
      );
      this.input.setAttribute(
        'placeholder',
        `${this.totalAdults} ${this.dictionary.guests.adults[matchToNumberOfGuests]}${
          this.totalBabies > 0
            ? `, ${this.totalBabies} ${this.dictionary.guests.babies[matchToNumberOfKids]}`
            : ''
        }`
      );
    } else {
      this.input.setAttribute('placeholder', 'Сколько гостей');
    }
  }
  #refreshPlaceholderWithFurniture() {
    if (this.total >= 0) {
      const numOfBedrooms = this.count.get('спальни').get('value');
      const numOfBeds = this.count.get('кровати').get('value');
      const numbOfBathrooms = this.count.get('ванные комнаты').get('value');
      const matchToNumOfBedrooms = this.#findTheClosestNumberAndMatchTheGrammar(
        numOfBedrooms,
        Object.keys(this.dictionary.furniture.bedrooms)
      );
      const matchToNumOfBathrooms = this.#findTheClosestNumberAndMatchTheGrammar(
        numbOfBathrooms,
        Object.keys(this.dictionary.furniture.bathrooms)
      );
      const matchToNumOfBeds = this.#findTheClosestNumberAndMatchTheGrammar(
        numOfBeds,
        Object.keys(this.dictionary.furniture.beds)
      );
      this.input.setAttribute(
        'placeholder',
        `${numOfBedrooms} ${this.dictionary.furniture.bedrooms[matchToNumOfBedrooms]} ${
          matchToNumOfBeds
            ? `, ${numOfBeds} ${this.dictionary.furniture.beds[matchToNumOfBeds]} `
            : ''
        } ${
          matchToNumOfBathrooms
            ? `, ${numbOfBathrooms} ${this.dictionary.furniture.bathrooms[matchToNumOfBathrooms]} `
            : ''
        }`
      );
    }
  }
  refreshAllCategories() {
    let categories = Array.from(this.count.keys());
    categories.forEach((item) => {
      this.refreshCategory(item);
    });
  }
  #bindPopup(elementName) {
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

  #bindIncrement() {
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
      if (this.#doesValueExceedsRestriction(category, value + 1)) {
        this.#restrictDecrement(category);
      }
      this.count.get(category).set('value', value + 1);
      this.refreshCategory(category);
    };
    const handleDecrementClick = (e) => {
      const target = e.target;
      const li = target.closest('li');
      const category = li
        .getElementsByClassName('dropdown-accom__variant')[0]
        .textContent.toLowerCase();
      const storage = this.count.get(category);
      const value = Number(storage.get('value'));
      if (this.#doesValueExceedsRestriction(category, value - 1)) {
        this.#restrictDecrement(category);
      }
      this.count.get(category).set('value', value - 1);
      this.refreshCategory(category);
    };
    listChildren.forEach((child) => {
      const valueEl = child.getElementsByClassName('dropdown-accom__value')[0];
      const incrementButton = child.getElementsByClassName('dropdown-accom__button--next')[0];
      const decrementButton = child.getElementsByClassName('dropdown-accom__button--prev')[0];
      const category = child.getElementsByClassName('dropdown-accom__variant')[0];
      const hiddenState = child.querySelector('.js-dropdown-accom__hidden');
      const storage = new Map();
      storage.set('increment', incrementButton);
      storage.set('decrement', decrementButton);
      storage.set('value', Number(valueEl.textContent));
      storage.set('categoryElement', valueEl);
      storage.set('hiddenState', hiddenState);
      this.count.set(category.textContent.toLowerCase(), storage);

      if (this.type === 'people') {
        let totalAdults = 0;
        this.totalAdults = totalAdults;
        this.totalBabies = this.total - totalAdults;
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
      this.refreshAllCategories();
    };
    if (this.submitButton && this.count) {
      this.submitButton.addEventListener('click', onSubmit);
      this.total = 0;
    }
    if (this.count && this.clear) {
      this.clear.addEventListener('click', onClear);
    }
  }

  #doesValueExceedsRestriction(category, value) {
    const decrement = this.count.get(category).get('decrement');
    if (value === this.limit) {
      return true;
    } else {
      decrement.disabled = false;
      decrement.classList.remove('dropdown-accom__button--disabled');
    }
  }
  #restrictDecrement(category) {
    const decrement = this.count.get(category).get('decrement');
    decrement.classList.add('dropdown-accom__button--disabled');
    decrement.disabled = true;
  }
  #restrictIncrement(category) {
    const increment = this.count.get(category).get('increment');
    increment.classList.add('dropdown-accom__button--disabled');
    increment.disabled = true;
  }
  #removeIncrementRestrictions(category) {
    console.log(category);
    const increment = this.count.get(category).get('increment');
    increment.classList.remove('dropdown-accom__button--disabled');
    increment.disabled = false;
  }
  #removeDecrementRestrictions(category) {
    const decrement = this.count.get(category).get('decrement');
    decrement.classList.remove('dropdown-accom__button--disabled');
    decrement.disabled = false;
  }

  #findTheClosestNumberAndMatchTheGrammar(number, arrayOfNumbers) {
    let intermediate = Infinity;
    const theNumber = Number(String(number).match(/\d$/));
    const workingNumber = number > 20 ? theNumber : number;
    arrayOfNumbers.forEach((item) => {
      workingNumber >= Number(item) || workingNumber === 0 ? (intermediate = item) : false;
    });
    return intermediate;
  }

  #prohibitTyping() {
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

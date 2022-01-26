import { bindOutsideClickDetection } from '../../utils/utils';

class DropdownAccom {
  constructor(element, list, limit) {
    this.listName = list;
    this.bindPopup(element, list);
    this.bindIncrement();
    this.limit = limit;
  }

  bindPopup(elementName, listName) {
    if (typeof elementName === 'string') {
      this.element = document.querySelector(elementName);
    } else if (typeof elementName === 'object') {
      this.element = elementName;
    }
    this.list = this.element.querySelector(this.listName);
    this.input = this.element.getElementsByClassName('js-dropdown-accom__input')[0];

    bindOutsideClickDetection(elementName, listName);
    const submitButton = this.element.querySelector('.js-dropdown-accom__submit');
    this.submit = submitButton;
    const clearButton = this.element.querySelector('.js-dropdown-accom__clear');
    this.clear = clearButton;
  }

  bindIncrement() {
    const listChildren = Array.from(this.element.querySelectorAll('.js-dropdown-accom__option'));
    this.count = new Map();
    const handleIncrementClick = (e)=>{
      const target = e.target;
      const li = target.closest('li');
      const category = li.getElementsByClassName('dropdown-accom__variant')[0].textContent.toLowerCase();
      const storage = this.count.get(category);
      const value = Number(storage.get('value'));
      this.restrictDecrement(category, value + 1);
      this.count.get(category).set('value', value + 1);
      this.refresh(category);
    };
    const handleDecrementClick = (e)=>{
      const target = e.target;
      const li = target.closest('li');
      const category = li.getElementsByClassName('dropdown-accom__variant')[0].textContent.toLowerCase();
      const storage = this.count.get(category);
      const value = Number(storage.get('value'));
      this.restrictDecrement(category, value - 1);
      this.count.get(category).set('value', value - 1);
      this.refresh(category);
    };
    listChildren.forEach((child)=>{
      const textElement = child.getElementsByClassName('dropdown-accom__info')[0];
      const increment = child.getElementsByClassName('dropdown-accom__button--next')[0];
      const decrement = child.getElementsByClassName('dropdown-accom__button--prev')[0];
      const category = child.getElementsByClassName('dropdown-accom__variant')[0];
      const storage = new Map();
      storage.set('increment', increment);
      storage.set('decrement', decrement);
      storage.set('value', Number(textElement.textContent));
      storage.set('textElement', textElement);
      this.count.set(category.textContent.toLowerCase(), storage);
      increment.addEventListener('click', handleIncrementClick);
      decrement.addEventListener('click', handleDecrementClick);
    });
    const onSubmit = ()=>{
      this.input.setAttribute('placeholder', `${this.total} гостей`);
    };
    const onClear = ()=>{
      this.returnToDefault();
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

  returnToDefault() {
    Array.from(this.count.keys()).forEach((item)=>{
      if (item === 'total') {
        return false;
      }
      this.count.get(item).set('value', 2);
      return true;
    });
  }

  refresh(category) {
    if (category === undefined) {
      let categories = Array.from(this.count.keys());
      categories = categories.filter((item)=>item !== 'total');
      categories.forEach((item)=>{
        if (item === 'total') {
          return false;
        }
        this.refresh(item);
        return true;
      });
      return true;
    }
    let value = this.count.get(category).get('value');
    this.restrictDecrement(category, value);
    const textElement = this.count.get(category).get('textElement');
    textElement.textContent = String(value);
    if (this.submit) {
      const total = this.countTotal();
      this.total = total;
    }
    return true;
  }

  countTotal() {
    let total = 0;
    Array.from(this.count.keys()).forEach((item)=>{
      if (item === 'total') {
        return false;
      }
      total += Number(this.count.get(item).get('value'));
      return true;
    });
    return total;
  }

  restrictDecrement(category, value) {
    const decrement = this.count.get(category).get('decrement');
    if (value === this.limit) {
      decrement.disabled = true;
      return false;
    }
    decrement.disabled = false;
    return true;
  }
}

export default DropdownAccom;

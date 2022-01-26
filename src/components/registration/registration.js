import IMask from 'imask';
import '../toggle/toggle.js';
import '../button/button.js';
import '../radio-buttons/radio-buttons.js';
import './registration.scss';
const birthdayOptions = {
  mask: Date,
  pattern: 'd.`m.`Y',
  blocks: {
    d: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2,
    },
    m: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    Y: {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 2022,
    }
  }
};

const handleContentLoaded = ()=>{
  const birthdayItem = document.querySelector('.js-registration-card__input--with-birthday');
  const mask = IMask(birthdayItem, birthdayOptions);
};

document.addEventListener('DOMContentLoaded', handleContentLoaded);

import '../../components/checkbox-list/checkbox-list.js';
import '../../components/comment/comment.js';
import '../../components/button/button.js';
import '../../components/masked-text-field/masked-text-field.js';
import '../../components/checkbox-buttons/checkbox-buttons.js';
import '../../components/bullet-list/bullet-list.js';
import '../../components/checkbox-rich/checkbox-rich.js';
import '../../components/date-picker/date-picker.js';
import '../../components/features/features.js';
import '../../components/like/like.js';
import '../../components/pagination/pagination.js';
import '../../components/pay-button/pay-button.js';
import '../../components/radio-buttons/radio-buttons.js';
import '../../components/range-slider/range-slider.js';
import '../../components/rate-button/rate-button.js';
import '../../components/subscription-text-field/subscription-text-field.js';
import '../../components/text-field/text-field.js';
import '../../components/toggle/toggle.js';
import '../../components/logo-landing/logo-landing.js';

import '../../components/date-picker/date-picker.js';
import initSlider from '../../components/range-slider/range-slider.js';
import { DatePicker } from '../../components/date-picker/date-picker.js';
import DropdownAccom from '../../components/dropdown-submit-and-clear/DropdownAccom.js';
import '../../components/hotel-card/hotel-card.js';
import './form-elements.scss';
const handleContentLoaded = () => {
  initSlider('.js-range-slider__item');
  new DatePicker({
    inputsClassname: 'js-date-picker',
    parentElementClassname: 'js-form-elements__item',
  });

  new DatePicker({
    parentElementClassname: 'form-elements__item--filter-date-dropdown',
    inputsClassname: 'js-date-picker',
  });
  const datePickers = Array.from(document.getElementsByClassName('js-dropdown-accom'));

  new DropdownAccom({
    element: datePickers[0],
  });
  new DropdownAccom({
    element: datePickers[1],
    type: 'furniture',
  });
  new DropdownAccom({
    element: datePickers[2],
  });
  new DropdownAccom({
    element: datePickers[3],
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

import '../../components/checkbox-list/checkbox-list.js';
import '../../components/comment/comment.js';
import '../../components/button/button.js';
import '../../components/masked-text-field/masked-text-field.js';
import '../../components/checkbox-buttons/checkbox-buttons.js';
import '../../components/bullet-list/bullet-list.js';
import '../../components/checkbox-rich/checkbox-rich.js';
import '../../components/date-picker/date-picker.js';
import '../../components/dropdown-submit-and-clear/dropdown-submit-and-clear.js';
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
import '../../components/air-datepicker/air-datepicker.js';
import { options, bindCalendar } from '../../components/air-datepicker/air-datepicker.js';
import '../../components/hotel-card/hotel-card.js';
import './form-elements.scss';
const handleContentLoaded = ()=>{
  bindCalendar('form-elements__column', 'js-date-picker__input', options,'js-date-picker__input--range');
  bindCalendar('form-elements__column', 'js-date-picker__input--range', {...options,range:true});

};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

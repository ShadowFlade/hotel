import { options, bindCalendar } from '../air-datepicker/air-datepicker';
import './bill.scss';
const handleContentLoaded = () => {
  bindCalendar({
    inputsClassname: 'js-date-picker__input',
    optionsForCalendar: options,
    parentElementClassname: 'js-bill',
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

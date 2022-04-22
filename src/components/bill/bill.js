import { options, bindCalendar } from '../air-datepicker/air-datepicker';
import { renderToAnotherInput } from '../rooms-for-you/rooms-for-you';
import './bill.scss';
import DropdownAccom from '../dropdown-submit-and-clear/DropdownAccom';
const handleContentLoaded = () => {
  bindCalendar({
    inputsClassname: 'js-date-picker',
    optionsForCalendar: { ...options, range: true },
    parentElementClassname: 'js-bill',
    onSelect: ({ date, formattedDate, datepicker }) => {
      renderToAnotherInput({ datepicker, parent: 'js-bill' });
    },
  });
  new DropdownAccom(
    document.querySelector('.js-bill .js-dropdown-accom'),
    '.js-dropdown-accom__ul',
    0,
    'people'
  );
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

import { options, bindCalendar } from '../air-datepicker/air-datepicker';
import { renderToAnotherInput } from '../rooms-for-you/rooms-for-you';
import './bill.scss';
const handleContentLoaded = () => {
  bindCalendar({
    inputsClassname: 'js-date-picker',
    optionsForCalendar: { ...options, range: true },
    parentElementClassname: 'js-bill',
    onSelect: ({ date, formattedDate, datepicker }) => {
      renderToAnotherInput({ datepicker, parent: 'js-bill' });
    },
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

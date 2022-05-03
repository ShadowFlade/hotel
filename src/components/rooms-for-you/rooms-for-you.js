import { DatePicker } from '../date-picker/date-picker.js';
import DropdownAccom from '../dropdown-submit-and-clear/DropdownAccom.js';
import './rooms-for-you.scss';

function position({ $datepicker, $target }) {
  const roomsForYouCoords =
    $target.parentElement.parentElement.parentElement.getBoundingClientRect();
  $datepicker.style.left = window.scrollX + roomsForYouCoords.left;
}

const renderToAnotherInput = ({ datepicker, parent }) => {
  const parentItem = document.querySelector(`.${parent}`);
  const inputs = Array.from(parentItem.querySelectorAll('.js-date-picker__input'));
  const dates = datepicker.selectedDates;
  const formattedDates = dates.map((date) => datepicker.formatDate(date, 'dd.MM.yyyy'));
  inputs[0].value = formattedDates[0];
  if (formattedDates[1]) {
    inputs[1].value = formattedDates[1];
  }
};
const handleContentLoaded = () => {
  const newOptions = {
    classes: 'air-datepicker--rooms-for-you',
    position({ $datepicker, $target, $pointer }) {
      let coords = $target.getBoundingClientRect();
      let dpHeight = $datepicker.clientHeight;
      let dpWidth = $datepicker.clientWidth;

      let top = coords.y + coords.height / 2 + window.scrollY - dpHeight / 2;
      let left = coords.x + coords.width / 2 - dpWidth / 2;

      $datepicker.style.left = `${left}px`;
      $datepicker.style.top = `${Number(top) + 200}px`;

      $pointer.style.display = 'none';
    },
    onSelect: ({ datepicker }) => {
      renderToAnotherInput({ datepicker, parent: 'rooms-for-you' });
    },
  };
  const dp = new DatePicker({
    inputsClassname: 'js-date-picker',
    optionsForCalendar: newOptions,
    parentElementClassname: 'js-rooms-for-you',
  });

  new DropdownAccom({
    element: document.querySelector('.js-rooms-for-you .js-dropdown-accom'),
  });
  // dp.DOMParent.querySelector('#clear').addEventListener('click', (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  // });
  // dp.$datepicker.querySelector('#clear').addEventListener('click', (e) => {
  //   e.preventDefault();
  // });
};

document.addEventListener('DOMContentLoaded', handleContentLoaded);
export { renderToAnotherInput };

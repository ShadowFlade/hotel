import { DatePicker } from '../date-picker/date-picker.js';
import DropdownAccom from '../dropdown-submit-and-clear/DropdownAccom.js';
import './rooms-for-you.scss';

function position({ $datepicker, $target }) {
  const roomsForYouCoords =
    $target.parentElement.parentElement.parentElement.getBoundingClientRect();
  $datepicker.style.left = window.scrollX + roomsForYouCoords.left;
}

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
  };
  new DatePicker({
    inputsClassname: 'js-date-picker',
    optionsForCalendar: newOptions,
    parentElementClassname: 'js-rooms-for-you',
  });

  new DropdownAccom({
    element: document.querySelector('.js-rooms-for-you .js-dropdown-accom'),
  });
};

document.addEventListener('DOMContentLoaded', handleContentLoaded);

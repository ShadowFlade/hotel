import '../../components/range-slider/range-slider.js';
import '../../components/rate-button/rate-button.js';
import '../../components/subscription-text-field/subscription-text-field.js';
import '../../components/text-field/text-field.js';
import '../../components/toggle/toggle.js';
import '../../components/checkbox-rich/checkbox-rich.js';
import '../../components/dropdown-submit-and-clear/dropdown-submit-and-clear.js';
import '../../components/hotel-card/hotel-card.js';
import '../../components/pagination/pagination.js';
import '../../components/checkbox-list/checkbox-list.js';
import '../../components/date-picker/date-picker.js';
import '../../components/checkbox-buttons/checkbox-buttons.js';
import './search-room-and-filter.scss';
$(function () {
  $('.js-datepicker').daterangepicker({
    maxSpan: {
      days: 60,
    },
    opens: 'center',
    applyButtonClasses: 'hotel-card__applybtn',
    cancelButtonClasses: 'hotel-card__cancelbtn',
    locale: {
      applyLabel: 'очистить',
      cancelLabel: 'применить',
      format: 'MM.DD.YYYY',
      separator: ' - ',
      fromLabel: 'From',
      toLabel: 'To',
      customRangeLabel: 'Custom',
      weekLabel: 'W',
      daysOfWeek: ['Воскр', 'Пон', 'Вт', 'Ср', 'Чт', 'Пятн', 'Суб'],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      firstDay: 1,
    },
    linkedCalendars: false,
    singleDatePicker: false,
    showCustomRangeLabel: false,
    startDate: '02/04/2021',
    endDate: '02/11/2021',
    autoUpdateInput: true,
    autoApply: false,
  });

  const onClick = function () {
    // eslint-disable-next-line fsd/jq-use-js-prefix-in-selector
    $('.end-date').removeClass('in-range');
  };
  $('td').on('click', onClick);
});

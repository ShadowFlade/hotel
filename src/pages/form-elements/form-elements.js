import '../../components/checkbox-list/checkbox-list.js';
import '../../components/comment/comment.js';
import '../../components/button/button.js';
import '../../components/button/button.js';
import '../../components/button/button.js';
import '../../components/masked-text-field/masked-text-field.js';
import '../../components/checkbox-buttons/checkbox-buttons.js';
import '../../components/bullet-list/bullet-list.js';
import '../../components/dropdown/dropdown.js';
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
import '../../components/hotel-card/hotel-card.js';
import './form-elements.scss';
$(function () {
  const $filterDateDropdown = $('.date-picker--single');
  $filterDateDropdown.daterangepicker({
    maxSpan: {
      days: 7,
    },
    locale: {
      format: 'MM/DD/YYYY',
      separator: ' - ',
      applyLabel: 'применить',
      cancelLabel: 'очистить',
      fromLabel: 'From',
      toLabel: 'To',
      customRangeLabel: 'Custom',
      weekLabel: 'W',
      daysOfWeek: ['Воскр', 'Пон', 'Вт', 'Ср', 'Чт', 'Пятн', 'Суб'],
      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      firstDay: 1,
    },
    linkedCalendars: false,
    startDate: '02/04/2021',
    endDate: '02/11/2021',
  });
  const onApply = function (ev, picker) {
    var thisMonth = moment()
      .locale('ru')
      .format('MMMM');

    if (thisMonth[thisMonth.length - 1] === 'т') {
      thisMonth += 'а';
    } else if (thisMonth[thisMonth.length - 1] !== 'т') {
      thisMonth = thisMonth.slice(0, 6) + 'я';
    }

    $(this).val(
      picker.startDate.format('D ' + thisMonth)
        + ' - '
        + picker.endDate.format('D ' + thisMonth)
    );
  };
  $filterDateDropdown.on('apply.daterangepicker', onApply);

  // eslint-disable-next-line fsd/jq-use-js-prefix-in-selector
  $('.daterangepicker').css('top', '20%');
  const onHide = function () {
    $('.js-card__datepicker').click();
  };
  $('.js-card__datepicker').on('hide.daterangepicker', onHide);
});

/* eslint-disable fsd/jq-use-js-prefix-in-selector */
import './date-picker.scss';
$(function () {
  $('.js-date-picker').daterangepicker({
    maxSpan: {
      days: 60,
    },
    opens: 'center',
    applyButtonClasses: 'hotel-card__applybtn',
    cancelButtonClasses: 'hotel-card__cancelbtn',
    locale: {
      applyLabel: 'применить',
      cancelLabel: 'очистить',
      format: 'MM.DD.YYYY',
      separator: ' - ',
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
    singleDatePicker: true,
    showCustomRangeLabel: false,
    startDate: '02/04/2021',
    endDate: '02/11/2021',
    autoUpdateInput: true,
  });
  const handleTdClicked = function () {
    $('.end-date').removeClass('in-range');
  };
  $('td').on('click', handleTdClicked);

  $('.js-card__datepicker').click();
  $(document).mouseup(function () {
    $('.end-date').removeClass('in-range');
  });
  $('.ui-datepicker-calendar a.ui-state-default').css('width', '20px');
  const prohibitTyping=(event)=>{
    event.preventDefault()
  }
  $('.js-date-picker__input').on('keydown',prohibitTyping)
});

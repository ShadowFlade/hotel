import './date-picker.scss'
import daterangepicker from 'daterangepicker'
$(function() {
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
  })


  $('td').on('click', function() {
    $('.end-date').removeClass('in-range')
  })

  $('.js-card__datepicker').click()
  $(document).mouseup(function() {
    $('.end-date').removeClass(
      'in-range'
    )
  }),
    $('.ui-datepicker-calendar a.ui-state-default').css('width', '20px')



}) 


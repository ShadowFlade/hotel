import daterangepicker from 'daterangepicker'
$(function() {
  $('.datepicker').daterangepicker({
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
    // linkedCalendars: false,
    singleDatePicker: true,
    showCustomRangeLabel: false,
    startDate: '02/04/2021',
    endDate: '02/11/2021',
    autoUpdateInput: true,
    // autoApply: false,
  })

  $('.card__datepicker').on('hide.daterangepicker', function(ev, picker) {
    $('.card__datepicker').click()
  })
  $('td').on('click', function() {
    $('.end-date').removeClass('in-range')
  })
  // $('.card__datepicker').on('apply.daterangepicker', function(ev, picker) {
  //   $('.card__datepicker').after("<div id='object1'>hey hey hey</div>")
  //   console.log('hey')
  // })

  $('.card__datepicker').click()
  $(document).mouseup(function() {
    $('.end-date').removeClass(
      'in-range'
    ) /*not the best solution,needs reworking*/
  }),
    $('.ui-datepicker-calendar a.ui-state-default').css('width', '20px')
})

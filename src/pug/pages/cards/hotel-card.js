import moment from 'moment'
$(function() {
  $('.js-card__datepicker').daterangepicker({
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
  })
  $('.daterangepicker').addClass('moveup')
  $('.js-card__datepicker').on('apply.daterangepicker', function(ev, picker) {
    var monthNames = [
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
    ]
    var thisMonth = moment()
      .locale('ru')
      .format('MMMM')
    if (thisMonth[thisMonth.length - 1] == 'т') {
      thisMonth += 'а'
    } else if (thisMonth[thisMonth.length - 1] !== 'т') {
      thisMonth = thisMonth.slice(0, 6) + 'я'
    }
    $(this).val(
      picker.startDate.format('D ' + thisMonth) +
        ' - ' +
        picker.endDate.format('D ' + thisMonth)
    )
  })
  $('td').on('click', function() {
    $('.end-date').removeClass('in-range')
  })
  $(document).mouseup(function() {
    $('.end-date').removeClass(
      'in-range'
    )
  })
})

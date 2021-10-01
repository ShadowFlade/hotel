import './filter-date-dropdown.scss'
import moment from 'moment'
$(function() {
  $('.js-filter-date-dropdown').daterangepicker({
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
  $('.js-filter-date-dropdown').on('apply.daterangepicker', function(ev, picker) {
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
  var thisMonth = moment()
    .locale('ru')
    .format('MMMM')

  $('.daterangepicker').css('top', '20%')
})


import './filter-date-dropdown.scss'
import moment from 'moment'
// import 'moment/locale/ru'npm
// moment.locale('ru')
$(function() {
  // moment.locale('ru')
  $('.filter-date-dropdown').daterangepicker({
    maxSpan: {
      days: 7,
    },
    locale: {
      format: 'MM/DD/YYYY',
      // locale: 'ru',
      // language: 'ru',
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
    // showCustomRangeLabel: false,
    startDate: '02/04/2021',
    endDate: '02/11/2021',
    // autoUpdateInput: true,
  })
  $('.filter-date-dropdown').on('apply.daterangepicker', function(ev, picker) {
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

    // var lastMonth = moment()
    //   .subtract(1, 'month')
    //   .format('MMMM')

    if (thisMonth[thisMonth.length - 1] == 'т') {
      thisMonth += 'а'
    } else if (thisMonth[thisMonth.length - 1] !== 'т') {
      thisMonth = thisMonth.slice(0, 6) + 'я'
    }
    // moment.locale('ru')
    $(this).val(
      picker.startDate.format('D ' + thisMonth) +
        ' - ' +
        picker.endDate.format('D ' + thisMonth)
    )
  })
  var thisMonth = moment()
    .locale('ru')
    .format('MMMM')
  console.log(thisMonth)
  console.log(thisMonth[thisMonth.length - 1])
})
// document.addEventListener('DOMContentLoaded', function() {
//   function simClick() {
//     document.getElementById('filter-date-dropdown').click
//   }
//   simClick()
// })

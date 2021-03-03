import moment from 'moment'
// import 'Src/pug/includes/modules/filter-date-dropdown/filter-date-dropdown.js'
// import 'moment/locale/ru'npm
// moment.locale('ru')
$(function() {
  // moment.locale('ru')
  $('.card__datepicker').daterangepicker({
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
  $('.daterangepicker').addClass('moveup')
  $('.card__datepicker').on('apply.daterangepicker', function(ev, picker) {
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
  })
})

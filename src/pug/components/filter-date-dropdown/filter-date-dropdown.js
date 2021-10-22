import './filter-date-dropdown.scss'
import moment from 'moment'
$(function () {
  const $filterDateDropdown = $('.js-filter-date-dropdown')
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
  })
  const onApply = function (ev, picker) {
    var thisMonth = moment()
      .locale('ru')
      .format('MMMM')

    if (thisMonth[thisMonth.length - 1] === 'т') {
      thisMonth += 'а'
    } else if (thisMonth[thisMonth.length - 1] !== 'т') {
      thisMonth = thisMonth.slice(0, 6) + 'я'
    }

    $(this).val(
      picker.startDate.format('D ' + thisMonth)
        + ' - '
        + picker.endDate.format('D ' + thisMonth)
    )
  }
  $filterDateDropdown.on('apply.daterangepicker', onApply)

  // eslint-disable-next-line fsd/jq-use-js-prefix-in-selector
  $('.daterangepicker').css('top', '20%')
  const onHide = function () {
    $('.js-card__datepicker').click()
  }
  $('.js-card__datepicker').on('hide.daterangepicker', onHide)
})

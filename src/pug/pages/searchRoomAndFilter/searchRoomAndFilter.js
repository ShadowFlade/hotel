import '../../includes/modules/range-slider/range-slider.js'
import '../../includes/modules/rate-button/rate-button.js'
import '../../includes/modules/subscription-text-field/subscription-text-field.js'
import '../../includes/modules/text-field/text-field.js'
import '../../includes/modules/toggle/toggle.js'
import '../../includes/modules/checkbox-rich/checkbox-rich.js'
import '../../includes/modules/dropdownSubmitAndClear/dropdownSubmitAndClear.js'
import '../../includes/modules/hotel-card/hotel-card.js'
import '../../includes/modules/pagination/pagination.js'
import '../../includes/modules/filter-date-dropdown/filter-date-dropdown.js'
import '../../includes/modules/checkbox-list/checkbox-list.js'
import '../../includes/modules/navbar/navbar.js'
import './searchRoomAndFilter.scss'
$(function() {
  $('.content__datepicker').daterangepicker({
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
  })
  $('.card__datepicker').on('hide.daterangepicker', function(ev, picker) {
    $('.card__datepicker').click()
  })
  $('td').on('click', function() {
    $('.end-date').removeClass('in-range')
  })
})

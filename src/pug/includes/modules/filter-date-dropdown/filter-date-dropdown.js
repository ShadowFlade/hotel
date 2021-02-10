$(function() {
  $('#filter-date-dropdown').daterangepicker(
    {
      maxSpan: {
        days: 7,
      },

      locale: {
        format: 'MM/DD/YYYY',

        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
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
      showCustomRangeLabel: false,
      startDate: '02/04/2021',
      endDate: '02/11/2021',
    },
    function(start, end, label) {
      console.log(
        'New date range selected: ' +
          start.format('YYYY-MM-DD') +
          ' to ' +
          end.format('YYYY-MM-DD') +
          ' (predefined range: ' +
          label +
          ')'
      )
    }
  )
})
// document.addEventListener('DOMContentLoaded', function() {
//   function simClick() {
//     document.getElementById('filter-date-dropdown').click
//   }
//   simClick()
// })

$(function() {
  //   $('#card__datepicker').datepicker({
  //     // hideIfNoPrevNext: true,
  //     showOtherMonths: true,
  //     firstDay: 1,
  //     mode: 'range',
  //     maxDate: '+1w',
  //     onChange: function(formated) {
  //       $('#widgetField span').get(0).innerHTML = formated.join(' - ')
  //     },
  //     onSelect: DRonSelect,
  //   })
  //   function DRonSelect(dateText, inst) {
  //     var date1 = $.datepicker.parseDate('MM d, yy', $('#checkinDate').text())
  //     var date2 = $.datepicker.parseDate('MM d, yy', $('#checkoutDate').text())
  //     if (!date1 || date2) {
  //       $('#checkinDate').text(dateText)
  //       $('#checkoutDate').text('')
  //       $('#Datepicker').datepicker()
  //     } else {
  //       if (
  //         $.datepicker.parseDate('MM d, yy', $('#checkinDate').text()) >=
  //         $.datepicker.parseDate('MM d, yy', dateText)
  //       ) {
  //         $('#checkinDate').text(dateText)
  //         $('#checkoutDate').text('')
  //         $('#Datepicker').datepicker()
  //       } else {
  //         $('#checkoutDate').text(dateText)
  //         $('#Datepicker').datepicker()
  //       }
  //     }
  //   }
  // })
  // $(
  //   '.ui-button, .ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default, html .ui-button.ui-state-disabled:active, html .ui-button.ui-state-disabled:hover'
  // ).css('width', '40px')
  // $('#card__datepicker').datepicker($.datepicker.regional['ru'])

  // $(document).ready(function() {
  //   $('.hotel-card__slider').slick({
  //     infinite: true,
  //     slidesToShow: 3,
  //     slidesToScroll: 3,
  //   })
  //   console.log('hey')
  // })
  $('.card__datepicker').daterangepicker({
    maxSpan: {
      days: 7,
    },
    opens: 'center',
    applyButtonClasses: 'hotel-card__applybtn',
    cancelButtonClasses: 'hotel-card__cancelbtn',
    locale: {
      applyLabel: 'очистить',
      cancelLabel: 'применить',
      format: 'MM/DD/YYYY',
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
    singleDatePicker: true,
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

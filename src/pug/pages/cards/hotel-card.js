$(function() {
  $('.hotel-card__slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
    dots: true,
  })
  $('#card__datepicker').datepicker({
    hideIfNoPrevNext: true,
    selectOtherMonths: true,
    // showOtherMonths: true,
  })
})
$(
  '.ui-button, .ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default, html .ui-button.ui-state-disabled:active, html .ui-button.ui-state-disabled:hover'
).css('width', '40px')

// $(document).ready(function() {
//   $('.hotel-card__slider').slick({
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//   })
//   console.log('hey')
// })

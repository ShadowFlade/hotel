/* eslint-disable fsd/jq-use-js-prefix-in-selector */
import './date-picker.scss';
import 'daterangepicker';
$(function () {

  $('.js-card__datepicker').click();
  $(document).mouseup(function () {
    $('.end-date').removeClass('in-range');
  });
  $('.ui-datepicker-calendar a.ui-state-default').css('width', '20px');
  const prohibitTyping=(event)=>{
    event.preventDefault()
  }
  $('.js-date-picker__input').on('keydown',prohibitTyping)
});

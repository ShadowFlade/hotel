import './date-picker.scss';
import 'daterangepicker';
import '../air-datepicker/air-datepicker';
$(function () {
  $('.js-card__datepicker').click();
  $(document).mouseup(function () {
    $('.end-date').removeClass('in-range');
  });
  $('.ui-datepicker-calendar a.ui-state-default').css('width', '20px');
  const prohibitTyping = (event)=>{
    console.log(event, event.char);
    if (event.key === 'Tab') {
      return true;
    }
    event.preventDefault();
    return true;
  };
  $('.js-date-picker__input').on('keydown', prohibitTyping);
});

import '../svg-arrow-right/svg-arrow-right';
import './pagination.scss';
$(function () {
  const handlePaginationClick = function () {
    if (!$(this).hasClass('pagination__item--active')) {
      $(this)
        .siblings()
        .removeClass('pagination__item--active');

      $(this).addClass('pagination__item--active');
    }
  };
  $('.js-pagination__item').on('click', handlePaginationClick);
});

import '../svg-arrow-right/svg-arrow-right'
import './pagination.scss'
$(function () {
  const handlePaginationClick = function () {
    if (!$(this).hasClass('page-active')) {
      $(this)
        .siblings()
        .removeClass('page-active')

      $(this).addClass('page-active')
    }
  }
  $('.js-pagination__item').on('click', handlePaginationClick)
})

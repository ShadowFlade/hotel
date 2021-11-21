import './pagination.scss'
import '../svg-arrow-right/svg-arrow-right'

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

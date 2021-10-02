import './pagination.scss'

$(function () {
  $('.js-pagination__item').on('click', function () {
    if (!$(this).hasClass('page-active')) {
      $(this)
        .siblings()
        .removeClass('page-active')

      $(this).addClass('page-active')
    }
  })
})

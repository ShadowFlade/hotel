$(function() {
  $('.page-item').on('click', function() {
    if (!$(this).hasClass('page-active')) {
      $(this)
        .siblings()
        .removeClass('page-active')

      $(this).addClass('page-active')
    }
  })
})
import './pagination.scss'

import './rate-button.scss'
$(function () {
  const handleStarClicked = function () {
    $(this)
      .parent()
      .prevAll()
      .find('.star--active')
      .css('opacity', '1')
    $(this).css('opacity', 1)
    $(this)
      .parent()
      .nextAll()
      .find('.star--active')
      .css('opacity', 0)
  }
  $('.js-star--active').on('click', handleStarClicked)
})

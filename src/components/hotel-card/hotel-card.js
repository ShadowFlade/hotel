import '../rate-button/rate-button.js'
import './hotel-card.scss'
$(function () {
  $('.js-hotel-card__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    dots: true,
  })
})

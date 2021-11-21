import './hotel-card.scss'
import '../rate-button/rate-button.js'
$(function () {
  $('.js-hotel-card__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    dots: true,
  })
})

import './hotel-card.scss'
import '../rate-button/rate-button.js'
import slick from 'slick'
$(function () {
  $('.js-hotel-card__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    dots: true,
  })
})

import './hotel-card.scss'
import slick from 'slick'
$(function() {
  $('.hotel-card__slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    dots: true,
  })
})

/* eslint-disable fsd/jq-use-js-prefix-in-selector */
import './range-slider.scss'
$(function () {
  $('.js-range-slider__item').slider({
    range: true,
    step: 500,
    max: 30000,
    min: 0,
    width: 70,
    slide: function (event, ui) {
      $('.range-slider__end').text(ui.values[1] + 'P')
      $('.range-slider__start').text(ui.values[0] + 'P')
    },
  })
})

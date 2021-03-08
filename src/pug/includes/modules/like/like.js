'use strict'
import './like.scss'
$(function() {
  let checked = false
  $('.like__input').on('click', function() {
    let num = Number(
      $(this)
        .next()
        .text()
    )
    if (checked == false) {
      checked = true
      num++
      $(this)
        .next()
        .text(num)
    } else {
      checked = false
      num--
      $(this)
        .next()
        .text(num)
    }
  })
})

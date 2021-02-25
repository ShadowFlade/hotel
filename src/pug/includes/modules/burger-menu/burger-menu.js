$(function() {
  $('.burger__button').click(function() {
    console.log($(this).siblings('.first-ul'))
    if (
      $(this)
        .siblings('.first-ul')
        .css('display') != 'none'
    ) {
      $(this)
        .siblings('.first-ul')
        .hide()
    } else {
      $(this)
        .siblings('.first-ul')
        .show()
    }
  })
})

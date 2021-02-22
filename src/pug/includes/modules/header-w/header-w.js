$(function () {
  $('.navbar__item').click(function () {
    console.log($(this))
    console.log($(this).find('.navbar__dd'))
    if ($(this).find('.navbar__dd').eq(0).css('display')!='none') {
      $(this).find('.navbar__dd').eq(0).hide()
    }

    else {
      $(this).find('.navbar__dd').eq(0).show()
    }
    // console.log('hey')
    // if ($('.navbar__dd').css('display')!='none') {
    //   $('.navbar__dd').hide() 
    // }
    // else {
    //   $('.navbar__dd').show()
    // }
  });
  
}) 
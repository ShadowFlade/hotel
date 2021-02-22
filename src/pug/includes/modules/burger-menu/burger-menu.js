$(function () {
let name = prompt("Ваше имя?", "");
alert(`ur name is ${name}`);
  $('.burger__button').click(function () {
    console.log($(this).siblings('.first-ul'))
    if ($(this).siblings('.first-ul').css('display')!='none') {
      $(this).siblings('.first-ul').hide()
    } else {
          $(this).siblings('.first-ul').show()
    }
  })
})
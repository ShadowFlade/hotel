import './dropdown-accom.scss'
$(function() {
  const dropSpan = $('.dropdown-accom__span')
  const dropPrButton = $('.dropdown-accom__button--prev')
  const dropNxtButton = $('.dropdown-accom__button--next')
  const dropAcc = $('.dropdown-accom__big')
  const dropAccUl = $('.dropdown-accom__ul')
  const dropAccInput = $('.input-box')
  const dropAccInsert = $('.dropdown-accom')
  //TODO 2 instances cant work on the same page together,fix it
  const inputFunc = (index) => {
    return $(this)
      .find(dropSpan)
      .eq(index)
      .text()
  }
  const setInput = function() {
    $(this)
      .parentsUntil(dropAcc)
      .find(dropAccInsert)
      .val(
        `${inputFunc(0)} спален, ${inputFunc('1')} кроватей, ${inputFunc(
          '2'
        )} ванных комнат`
      )
  }
  dropAccUl.has('.inbox-button').css('height', '159px')
  dropPrButton.click(function() {
    let num = Number(
      $(this)
        .next()
        .text()
    )
    num -= 1
    $(this)
      .next()
      .text(num)
    setInput()
    // $(this).parentsUntil(dropAcc).find(dropAccInsert).val(`${inputFunc(0)} спален, ${inputFunc('1')} кроватей, ${inputFunc('2')} ванных комнат`)
    $(this)
      .parentsUntil(dropAcc)
      .find(dropAccInsert)
      .val(`${+inputFunc(0) + +inputFunc('1')} гостей`)
    if (
      Number(
        $(this)
          .next()
          .text() === '0'
      )
    ) {
      $(this).prop('disabled', true)
      $(this).addClass('disabled')
    } else {
      $(this).prop('disabled', false)
      $(this).removeClass('disabled')
    }
  })

  dropNxtButton.click(function() {
    let num = Number(
      $(this)
        .prev()
        .text()
    )
    num += 1
    $(this)
      .prev()
      .text(num)
    setInput()
    $(this)
      .parentsUntil(dropAcc)
      .find(dropAccInsert)
      .val(
        `${+inputFunc(0) + +inputFunc('1')} гостей`
        // `${inputFunc(0)} ${$(this)
        //   .parents('ul')
        //   .find('li')
        //   .eq(0)
        //   .find('.dropdown-accom__variant')
        //   .text()}, ${inputFunc('1')} ${$(this)
        //   .parents('ul')
        //   .find('li')
        //   .eq(1)
        //   .find('.dropdown-accom__variant')
        //   .text()}, ${inputFunc('2')} ${$(this)
        //   .parents('ul')
        //   .find('li')
        //   .eq(2)
        //   .find('.dropdown-accom__variant')
        //   .text()}`
      )
    if (
      Number(
        $(this)
          .prev()
          .text() === '0'
      )
    ) {
      $(this)
        .prev()
        .prev()
        .prop('disabled', true)
      $(this)
        .prev()
        .prev()
        .addClass('disabled')
    } else {
      $(this)
        .prev()
        .prev()
        .prop('disabled', false)
      $(this)
        .prev()
        .prev()
        .removeClass('disabled')
    }
  })

  dropAccInput.click(function() {
    // $('.dropdown-accom-ul').css('display','block')
    if (
      $(this)
        .siblings(dropAccUl)
        .css('display') === 'block'
    ) {
      $(this)
        .siblings(dropAccUl)
        .css('display', 'none')
    } else {
      $(this)
        .siblings(dropAccUl)
        .css('display', 'block')
    }
  })
  var bgc = $('html').css('background')
  $('.dropdown-accom__ul').css('background', 'white')
  // $('.dropdown-accom__ul').css('background', 'red')
  // $(document).find(dropAcc).find(dropAccInsert).val(`${inputFunc(0)} спален, ${inputFunc('1')} кроватей, ${inputFunc('2')} ванных комнат`)
})

// 1st Var
// const inputFunc=function (index){
// 		return $(this).find(dropSpan).eq(index).text()
// 	}
// 	const setInput=function () {
// 		$(this).parentsUntil(dropAcc).find(dropAccInsert).val(`${inputFunc(0)} спален, ${inputFunc('1')} кроватей, ${inputFunc('2')} ванных комнат`)
// 	}

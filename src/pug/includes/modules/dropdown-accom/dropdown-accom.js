$(function() {
  const dropSpan = $('.dropdown-accom__span')
  const dropPrButton = $('.dropdown-accom__button--prev')
  const dropNxtButton = $('.dropdown-accom__button--next')
  const dropAcc = $('.dropdown-accom__big')
  const dropAccUl = $('.dropdown-accom__ul')
  const dropAccInput = $('.input-box')
  const dropAccInsert = $('.dropdown-accom')

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
        `${inputFunc(0)} спален, ${inputFunc('1')} кроватей, ${inputFunc(
          '2'
        )} ванных комнат`
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

  // $(document).find(dropAcc).find(dropAccInsert).val(`${inputFunc(0)} спален, ${inputFunc('1')} кроватей, ${inputFunc('2')} ванных комнат`)
})

// 1st Var
// const inputFunc=function (index){
// 		return $(this).find(dropSpan).eq(index).text()
// 	}
// 	const setInput=function () {
// 		$(this).parentsUntil(dropAcc).find(dropAccInsert).val(`${inputFunc(0)} спален, ${inputFunc('1')} кроватей, ${inputFunc('2')} ванных комнат`)
// 	}

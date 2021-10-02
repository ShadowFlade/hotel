const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)

// +closes and opens a popelement on click on clickelement
const BindOutsideClickDetection = (clickElementName, popElementName)=>{
  let clickElement
  let popElement
  if (typeof clickElementName === 'string') {
    clickElement = document.querySelector(clickElementName)
  } else if (typeof clickElementName === 'object') {
    clickElement = clickElementName
  }
  popElement = clickElement.querySelector(popElementName)

  const cat = (e)=>{
    const isClickInside = clickElement.contains(e.target) || clickElement.parentNode.contains(e.target);
    if (!isClickInside) {
      popElement.style.display = 'none'
    }
  }
  clickElement.addEventListener('click', (e)=>{
    const kidsHaveTarget = popElement.contains(e.target)
    if (!isVisible(popElement)) {
      popElement.style.display = 'block'
      document.addEventListener('click', cat)
    } else if (isVisible(popElement) && !kidsHaveTarget) {
      popElement.style.display = 'none'
      document.removeEventListener('click', cat)
    }
  })
}

export { isVisible, BindOutsideClickDetection }

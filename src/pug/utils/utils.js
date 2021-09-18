const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) 

//+closes and opens a popelement on click on clickelement
const BindOutsideClickDetection=(clickElementName,popElementName)=>{
  let clickElement
  let popElement
  if (typeof clickElementName==='string' && typeof popElementName==='string') {
     clickElement=document.querySelector(clickElementName)
     popElement=document.querySelector(popElementName)
  } else if (typeof clickElementName==='object' && typeof popElementName==='object') {
     clickElement=clickElementName
     popElement=popElementName
  }

  const cat=(e)=>{
    const isClickInside = clickElement.contains(e.target) || clickElement.parentNode.contains(e.target);
    if (!isClickInside) {
      popElement.style.display='none'
    }
  }
  clickElement.addEventListener('click',(e)=>{
    const kidsHaveTarget=popElement.contains(e.target)
    console.log('🚀 ~ clickElement.addEventListener ~ kidsHaveTarget', kidsHaveTarget)
    if (!isVisible(popElement)) {
      popElement.style.display='block'
      document.addEventListener('click',cat)
  
    } else if (isVisible(popElement )&& !kidsHaveTarget){
      popElement.style.display='none'
      document.removeEventListener('click',cat)
    }
  
  })
}

export {isVisible,BindOutsideClickDetection}
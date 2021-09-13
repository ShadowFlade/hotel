const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) 

//+closes and opens a popelement onclick on clickelement
const BindOutsideClickDetection=(clickElementName,popElementName)=>{
  const clickElement=document.querySelector(clickElementName)
  const popElement=document.querySelector(popElementName)
  const cat=(e)=>{
    const isClickInside = clickElement.contains(e.target);
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
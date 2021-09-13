import './burger-menu.scss'

// const hideOnClickOutside=(element) =>{
//   const outsideClickListener = (event) => {
//     const target=event.target
//       if (!element.contains(target) && isVisible(element)) { 
//         console.log('im also clicked')
//         element.style.display = 'none'
//         removeClickListener()
//       }
//   }
//   const removeClickListener = () => {
//       document.removeEventListener('click', outsideClickListener)
//   }
//   document.addEventListener('click', outsideClickListener)
// }

// const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) 

// document.addEventListener('DOMContentLoaded',(e)=>{
//   const burger=document.getElementsByClassName('burger')[0]
//   const HandleBurgerClicked=e=>{
//     const list=burger.getElementsByClassName('first-ul')[0]
//     if (isVisible(list)) {
//       list.style.display='none'
//     } else if (!isVisible(list)) {
//       console.log('im clicked')
//       list.style.display='block'
//       hideOnClickOutside(list)
//     }
//   }
//   burger.addEventListener('click',HandleBurgerClicked)
// })
const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) 
const burger = document.getElementsByClassName('burger')[0];
const list=document.getElementsByClassName('first-ul')[0]
const cat=(e)=>{
  const isClickInside = burger.contains(e.target);
  if (!isClickInside) {
    list.style.display='none'
  }
}
burger.addEventListener('click',(e)=>{
  const kidsHaveTarget=list.contains(e.target)
  if (!isVisible(list)) {
    list.style.display='block'
    document.addEventListener('click',cat)

  } else if (isVisible(list )&& !kidsHaveTarget){
    list.style.display='none'
    document.removeEventListener('click',cat)
  }

})

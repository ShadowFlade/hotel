import './burger-menu.scss'
import {BindOutsideClickDetection} from '../../../utils/utils'
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




document.addEventListener('DOMContentLoaded',(e)=>{
  BindOutsideClickDetection('.burger','.first-ul')
})


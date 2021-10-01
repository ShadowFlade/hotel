'use strict'
import './like.scss'
import Like from'../likeClass/likeClass'
const contentLoaded= () =>{
  const likeItems=Array.from(document.getElementsByClassName('js-like__item'))
  likeItems.forEach(likeItem => {
    const like=new Like(likeItem)
  });
}
document.addEventListener('DOMContentLoaded',contentLoaded)

'use strict'
import './like.scss'
class Like {
  constructor(likeItem,) {
    this.likeItem=likeItem
    this.getElemenets()
    this.bindIncrement()
    console.log(this.input,this.count,this.clicked)
  }
  getElemenets(){
    this.input=this.likeItem.getElementsByClassName('like__input')[0]
    this.count=this.likeItem.getElementsByClassName('like__number')[0]
    this.countNumber=Number(this.count.textContent)
  }
  bindIncrement(){
    this.clicked=false
    const bindLike=()=>{
      if (!this.clicked) {
        this.countNumber+=1
        this.clicked=true
      } else if (this.clicked) {
        this.countNumber-=1
        this.clicked=false
      }
      this.count.textContent=String(this.countNumber)
    }
    this.input.addEventListener('click',bindLike)

  }
}
const contentLoaded= () =>{
  const likeItems=Array.from(document.getElementsByClassName('like__item'))
  likeItems.forEach(likeItem => {
    const like=new Like(likeItem)
  });
}
document.addEventListener('DOMContentLoaded',contentLoaded)

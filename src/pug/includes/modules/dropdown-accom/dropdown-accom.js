import './dropdown-accom.scss'
import {BindOutsideClickDetection} from '../../../utils/utils'
class DropdownAccom{
  // queryName
  constructor(inputElement,list,limit){
    this.inputElementName=inputElement
    this.listName=list
    this.bindPopup()
    this.bindIncrement()
    this.limit=limit
  }
  bindPopup(elementName,listName) {
    this.list=document.querySelector(this.listName)
    this.input=document.querySelector(this.inputElementName)
    BindOutsideClickDetection(this.inputElementName,this.listName)
  }
  bindIncrement() {
    const listChidlren=Array.from(this.input.querySelectorAll(`${this.listName} li`))
    this.count=new Map()
    const HandleIncrementClick=(e)=>{
      const target=e.target
      const li=target.closest('li')
      const category=li.getElementsByClassName('dropdown-accom__variant')[0].textContent.toLowerCase()
      const storage=this.count.get(category)
      const value=Number(storage.get('value'))
      this.restrictDecrement(category,value+1)
      this.count.get(category).set('value',value+1 )
      this.refresh(category)
    }
    const HandleDecrementClick=(e)=>{
      const target=e.target
      const li=target.closest('li')
      const category=li.getElementsByClassName('dropdown-accom__variant')[0].textContent.toLowerCase()
      const storage=this.count.get(category)
      const value=Number(storage.get('value'))
      this.restrictDecrement(category,value-1)
      this.count.get(category).set('value', value-1)
      this.refresh(category)
    }
    listChidlren.forEach((child)=>{
      const textElement=child.getElementsByClassName('dropdown-accom__span')[0]
      const increment=child.getElementsByClassName('dropdown-accom__button--next')[0]
      const decrement=child.getElementsByClassName('dropdown-accom__button--prev')[0]
      const category=child.getElementsByClassName('dropdown-accom__variant')[0]
      const storage=new Map()
      storage.set('increment',increment)
      storage.set('decrement',decrement)
      storage.set('value',Number(textElement.textContent))
      storage.set('textElement',textElement)
      this.count.set(category.textContent.toLowerCase(),storage)
      increment.addEventListener('click',HandleIncrementClick)
      decrement.addEventListener('click',HandleDecrementClick)
    })

  }
  refresh(category){
    let value=this.count.get(category).get('value')
    this.restrictDecrement(category,value)
    const textElement=this.count.get(category).get('textElement')
    textElement.textContent=String(value)
    }

  
  restrictDecrement(category,value){
    const decrement=this.count.get(category).get('decrement')
    if (value===this.limit) {
      decrement.disabled=true
      return false
    } else {
      decrement.disabled=false
  }
}}
document.addEventListener('DOMContentLoaded',(e)=>{
  const dropAccom=new DropdownAccom('.dropdown-accom__big','.dropdown-accom__ul',0)
})


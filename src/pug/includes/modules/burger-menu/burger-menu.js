import './burger-menu.scss'
import {BindOutsideClickDetection} from '../../../utils/utils'
document.addEventListener('DOMContentLoaded',(e)=>{
  BindOutsideClickDetection('.burger','.first-ul')
})


import './burger-menu.scss'
import { BindOutsideClickDetection } from '../../../utils/utils'
const handleContentLoaded = (e)=>{
  BindOutsideClickDetection('.js-burger', '.js-burger__menu')
}
document.addEventListener('DOMContentLoaded', handleContentLoaded)

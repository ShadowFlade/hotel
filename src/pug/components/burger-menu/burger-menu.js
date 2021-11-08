import './burger-menu.scss'
import { bindOutsideClickDetection } from '../../../utils/utils'
const handleContentLoaded = (e)=>{
  bindOutsideClickDetection('.js-burger', '.js-burger__menu')
}
document.addEventListener('DOMContentLoaded', handleContentLoaded)

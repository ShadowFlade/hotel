import { bindOutsideClickDetection } from '../../utils/utils'
import './burger-menu.scss'

const handleContentLoaded = (e)=>{
  bindOutsideClickDetection('.js-burger', '.js-burger__menu')
}
document.addEventListener('DOMContentLoaded', handleContentLoaded)
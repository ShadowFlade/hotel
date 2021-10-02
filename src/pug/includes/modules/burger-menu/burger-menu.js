import './burger-menu.scss'
import { BindOutsideClickDetection } from '../../../utils/utils'
const handleContentLoaded = (e)=>{
  BindOutsideClickDetection('.js-burger', '.first-ul')
}
document.addEventListener('DOMContentLoaded', handleContentLoaded)

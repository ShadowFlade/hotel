import './like.scss'
import Like from '../likeClass/likeClass'
const contentLoaded = () =>{
  const likeItems = Array.from(document.getElementsByClassName('js-like__item'))
  likeItems.forEach(likeItem => {
    // eslint-disable-next-line no-new
    new Like(likeItem)
  });
}
document.addEventListener('DOMContentLoaded', contentLoaded)
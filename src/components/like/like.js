import './like.scss';
import LikeCounter from './LikeCounter.js';

const handleContentLoaded = () =>{
  const likeItems = Array.from(document.getElementsByClassName('js-like'));
  likeItems.forEach(likeItem => {
    // eslint-disable-next-line no-new
    new LikeCounter(likeItem);
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);

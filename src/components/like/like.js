import './like.scss';
import Like from './like-class.js';

const handleContentLoaded = () =>{
  const likeItems = Array.from(document.getElementsByClassName('js-like'));
  likeItems.forEach(likeItem => {
    // eslint-disable-next-line no-new
    new Like(likeItem);
  });
};
document.addEventListener('DOMContentLoaded', handleContentLoaded);
export default Like;

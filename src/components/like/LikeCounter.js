class LikeCounter {
  constructor(likeItem,) {
    this.likeItem = likeItem;
    this.getElements();
    this.bindIncrement();
  }

  getElements() {
    this.input = this.likeItem.getElementsByClassName('js-like__input')[0];
    this.count = this.likeItem.getElementsByClassName('js-like__number')[0];
    this.countNumber = Number(this.count.textContent);
  }

  bindIncrement() {
    this.clicked = false;
    const bindLike = ()=>{
      if (!this.clicked) {
        this.countNumber += 1;
        this.clicked = true;
      } else if (this.clicked) {
        this.countNumber -= 1;
        this.clicked = false;
      }
      this.count.textContent = String(this.countNumber);
    };
    this.input.addEventListener('click', bindLike);
  }
}
export default LikeCounter;

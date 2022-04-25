import './range-slider.scss';
const formatTheValue = (number) => {
  const results = [];
  let isOk = true;
  let decrement = 3;
  const numberArray = Array.from(number.toString());
  while (isOk) {
    results.push(numberArray.splice(numberArray.length - decrement, 3).join(''));
    decrement += 3;
    if (numberArray.length < decrement) {
      isOk = false;
      results.push(numberArray.join(''));
    }
  }
  return results.reverse().join(' ');
};
export default formatTheValue;

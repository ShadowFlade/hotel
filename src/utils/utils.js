const isVisible = (elem) => {
  if (!!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)) {
    return true;
  }
};

// +closes and opens a popelement on click on clickelement
const bindOutsideClickDetection = (clickElementName, popElementName) => {
  let clickElement;
  let popElement;
  if (typeof clickElementName === 'string') {
    clickElement = document.querySelector(clickElementName);
  } else if (typeof clickElementName === 'object') {
    clickElement = clickElementName;
  }
  if (typeof popElementName === 'string') {
    popElement = document.querySelector(popElementName);
  } else if (typeof popElementName === 'object') {
    popElement = popElementName;
  }
  const cat = (e) => {
    const isClickInside =
      clickElement.contains(e.target) || clickElement.parentNode.contains(e.target);
    if (!isClickInside) {
      // console.warn(e.target, clickElement, isClickInside);
      popElement.style.display = 'none';
    }
  };
  const handleElementClicked = (e) => {
    const kidsHaveTarget = popElement.contains(e.target);
    if (!isVisible(popElement)) {
      popElement.style.display = 'block';
      // console.warn('blocked');
      e.stopPropagation();
      document.addEventListener('click', cat);
    } else if (isVisible(popElement) && !kidsHaveTarget) {
      popElement.style.display = 'none';
      document.removeEventListener('click', cat);
    }
  };
  try {
    clickElement.addEventListener('click', handleElementClicked);
  } catch (e) {
    console.warn(`Element with classname ${clickElementName} not found`);
  }
};

const getDOMElement = (element, isSingle) => {
  if (typeof element === 'object') {
    return [element];
  } else if (typeof element === 'string' && !isSingle) {
    return Array.from(document.getElementsByClassName(element));
  } else if (typeof element === 'string' && isSingle) {
    return document.querySelector(element);
  }
};

const dateHelper = dateHelperFactory();
const formatMe = (date) => {
  const vals = [...`yyyy,mm,dd,hh,mmi,ss,mms`.split(`,`)];
  const myDate = dateHelper(date).toArr(...vals);
  return `${myDate.slice(0, 3).join(`/`)} ${myDate.slice(3, 6).join(`:`)}.${myDate.slice(-1)[0]}`;
};

// to a formatted date with zero padded values
// console.log(formatMe(new Date(1301090400 * 1000)));

// the raw values
// console.log(dateHelper(new Date(1301090400 * 1000)).values);

function dateHelperFactory() {
  const padZero = (val, len = 2) => `${val}`.padStart(len, `0`);
  const setValues = (date) => {
    let vals = {
      yyyy: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      mi: date.getMinutes(),
      s: date.getSeconds(),
      ms: date.getMilliseconds(),
    };
    Object.keys(vals)
      .filter((k) => k !== `yyyy`)
      .forEach((k) => (vals[k[0] + k] = padZero(vals[k], (k === `ms` && 3) || 2)));
    return vals;
  };

  return (date) => ({
    values: setValues(date),
    toArr(...items) {
      return items.map((i) => this.values[i]);
    },
  });
}

export { isVisible, bindOutsideClickDetection, getDOMElement, formatMe };

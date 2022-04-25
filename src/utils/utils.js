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
      popElement.style.display = 'none';
    }
  };
  const handleElementClicked = (e) => {
    const kidsHaveTarget = popElement.contains(e.target);
    if (!isVisible(popElement)) {
      popElement.style.display = 'block';
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

export { isVisible, bindOutsideClickDetection, getDOMElement };

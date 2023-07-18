// ==UserScript==
// @name     Vodkahaus Out Of Stock
// @version  1.0
// @grant    none
// @match    https://www.vodkahaus.de/*
// ==/UserScript==

(function() {
  'use strict';

  // Function to remove the parent element
  function removeParentElement(element) {
    let parentElement = element;
    while (parentElement && !parentElement.classList.contains('product--box') && !parentElement.classList.contains('box--image')) {
      parentElement = parentElement.parentNode;
    }

    if (parentElement) {
      parentElement.remove();
    }
  }

  // Function to handle URL changes
  function handleUrlChange() {
    // Remove existing elements
    const elements = Array.from(document.getElementsByClassName('btn variants-buy buynow is--center is--primary popup-buy is--disabled'));
    elements.forEach(element => {
      removeParentElement(element);
    });
  }

  // Observe URL changes
  window.onpopstate = handleUrlChange;

  // Function to handle initial load and page changes
  function handleInitialLoadAndPageChange() {
    // Remove existing elements
    const elements = Array.from(document.getElementsByClassName('btn variants-buy buynow is--center is--primary popup-buy is--disabled'));
    elements.forEach(element => {
      removeParentElement(element);
    });
  }

  // Call the function on initial load
  handleInitialLoadAndPageChange();

  // Observe page changes
  const observer = new MutationObserver(handleInitialLoadAndPageChange);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

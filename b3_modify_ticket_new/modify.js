document.addEventListener('change', (evt) => {
    // evt.currentTarget is the .radiogroup element
    // and we search for all elements with the active class
    evt.currentTarget
      .querySelectorAll('.active')
      .forEach(element => {
        // remove the active class from those elements
        element.classList.remove('active')
      })
    
    
    // in this simple case evt.target is the radio button 
    // that became active for more complex event delegation you
    // need to check what evt.target is.
    // search for the ascendant with the class posicao
    // and add the active class to it
    evt.target
      .closest('.sum_box')
      .classList.add('active');
  }, true);
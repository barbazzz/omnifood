(function(window){
  'use strict';
  var 
    w = window
   ,d = w.document;

  function noLinks(e) {
    var tag = e.target;
    if (tag.tagName.toUpperCase() === 'A' && tag.getAttribute('href').trim() === '#') {
      e.preventDefault();
    }
  }

  d.addEventListener('click', noLinks, false);
}(window));
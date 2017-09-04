(function(window, $){
  'use strict';

  new Waypoint({
    element: $('.js-fixed-nav-start'),

    handler: function(direction) {
      if (direction === 'down') {
        $('.header-nav').addClass('header-nav--fixed');
      } else {
        $('.header-nav').removeClass('header-nav--fixed');
      }
    },

    offset: '59px'
  });

  function handler(direction) {
    if (direction === 'down') {
      $('.header-nav').addClass('header-nav--fixed');
    } else {
      $('.header-nav').removeClass('header-nav--fixed');
    }
  }

  $(function() {
    var duration = 1000;

    $('a[data-scroll-to]').click(function(e) {
      e.preventDefault();

      $('body').animate({
        scrollTop: $( '.' + $(this).attr('data-scroll-to') ).offset().top
      }, duration);

    });
  });





  var w = window,
    d = w.document;

  function noLinks(e) {
    var tag = e.target;
    if (tag.tagName.toUpperCase() === 'A' && tag.getAttribute('href').trim() === '#') {
      e.preventDefault();
    }
  }

  d.addEventListener('click', noLinks, false);

}(window, $));
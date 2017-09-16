/* global Waypoint, global GMaps */
(function (window, $) {
  var w = window;
  var d = w.document;
  var wps = [];

  function noLinks (e) {
    var tag = e.target;
    if (tag.tagName.toUpperCase() === 'A' && tag.getAttribute('href').trim() === '#') {
      e.preventDefault();
    }
  }

  d.addEventListener('click', noLinks, false);

  // Fixed navigation for desctop version
  wps.push(new Waypoint({
    element: $('.js-fixed-nav-start'),

    handler: function (direction) {
      if (direction === 'down') {
        $('.header-nav').addClass('header-nav--fixed');
      } else {
        $('.header-nav').removeClass('header-nav--fixed');
      }
    },

    offset: '59px'
  }));

  // Animation on scroll effect with Animate.css library and Waypoint.js
  $('[data-anim-on-scroll]').each(function () {
    wps.push(new Waypoint({
      element: $(this),

      handler: function () {
        var $element = $(this.element);
        $element.addClass('animated ' + $element.attr('data-anim-on-scroll'));
        this.destroy();
      },

      offset: '50%'
    }));
  });

  wps.push(new Waypoint({
    element: $('.features'),

    handler: function () {
      var $element = $(this.element);
      $element.addClass('animated ' + $element.attr('data-anim-on-scroll'));
      this.destroy();
    },

    offset: '50%'
  }));

  $(function () {
    var duration = 1000;

    $('a[data-scroll-to]').click(function (e) {
      e.preventDefault();

      var offset = $('.' + $(this).attr('data-scroll-to')).offset().top - 50;

      $('body').animate({
        scrollTop: offset
      }, duration);
    });
  });

  $('.header-nav__btn').on('click touch', function (e) {
    var $icon = $('.header-nav__btn i');
    var burger = 'ion-navicon-round';
    var cross = 'ion-close-round';

    $('.hd-list').slideToggle(200);

    if ($icon.hasClass(burger)) {
      $icon.removeClass(burger).addClass(cross);
    } else {
      $icon.removeClass(cross).addClass(burger);
    }
  });

  $('.contacts-map').css('height', $('.form-box').innerHeight() || 500);

  new GMaps({
    div: '.contacts-map',
    lat: -12,
    lng: -77,
    zoom: 11
  }).addMarker({
    lat: -12.043333,
    lng: -77.028333,
    title: 'Lima',
    infoWindow: {
      content: '<p>Lima is cool, yeah</p>'
    }
  });
}(window, $));

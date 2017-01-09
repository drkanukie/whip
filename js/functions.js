// Whip web functions
//
// GLOBALS
var total = 0;
var basket_key = "basket";
var form_key = "form";
var id = "color";



(function(document, window, $) {
  $(document).ready(function() {
    $('.carousel').slick({
      centerMode: true,
      centerPadding: '60px',
      dots: true,
      infinite: true,
      slidesToShow: 3,
      prevArrow: '.carousel-container .prev',
      nextArrow: '.carousel-container .next',

      // responsive[
      //  breakpoint: 480, settings {
      //    centerMode: true,
      //    prevArrow: '.carousel-container .prev',
      //   nextArrow: '.carousel-container .next',
      //    slidesToShow: 1,
      //    dots: true,
      //    infinite: true,
      //   }
      //  ]

    });
    $('.add-remove').slick({
      slidesToShow: 3,
      slidesToScroll: 3
    });
    $('.js-add-slide').on('click', function() {
      slideIndex++;
      $('.add-remove').slick('slickAdd', '<div><h3>' + slideIndex + '</h3></div>');
    });

    $('.js-remove-slide').on('click', function() {
      $('.add-remove').slick('slickRemove', slideIndex - 1);
      if (slideIndex !== 0) {
        slideIndex--;
      }
    });

  });
})(document, window, jQuery);
// FUNCTIONS
function myFunction(p1, p2) {
  return p1 * p2; // The function returns the product of p1 and p2
}


function getTotal() {
  if (typeof(Storage) !== "undefined") {
    return localStorage.getItem(basket_key);
  } else {
    return 0;
  }
}

function getColor() {
  if (typeof(Storage) !== "undefined") {
    return localStorage.getItem(id);
  } else {
    return 0;
  }
}

function saveForm(form_id) {
  if (typeof(Storage) !== "undefined") {
    var form_html;
    form_html = document.getElementById(form_id).innerHTML;
    console.log("SAVED " + form_html);
    return localStorage.setItem(form_key, form_html);
  } else {
    return 0;
  }
}


function restoreForm(form_id) {
  if (typeof(Storage) !== "undefined") {
    var form_html;
    form_html = localStorage.getItem(form_key);
    console.log("RESTORED " + form_html);
    if (form_html) {
      document.getElementById(form_id).innerHTML = form_html;
    }
  } else {
    return 0;
  }
}

function saveRadio() {
  localStorage.clear();

  $('input[type="radio"]').each(function() {


    if ($(this).is(':checked')) {

      var id = $(this).attr('id');
      var value = $(this).prop('checked', true);
      console.log("SAVING " + id + " " + value);
      localStorage.setItem(id, value);
    }


  });
}

function restoreRadio() {
  $('input[type="radio"]').each(function() {
    var id = $(this).attr('id');
    var value = localStorage.getItem(id);

    if (value) {
      console.log("RESTORING " + id + " " + value);
      $(this).prop('checked', value);
    }
  });

  function initMap() {
    var lincoln = {
      lat: 53.230737,
      lng: -0.536323
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: lincoln
    });
    var marker = new google.maps.Marker({
      position: lincoln,
      map: map
    });
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: lincoln,
      radius: 100000
    });
  }
}

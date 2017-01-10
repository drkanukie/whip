// Whip web functions
//
// GLOBALS
var total = 0;
var basket_key = "basket";
var form_key = "form";
var id = "color";
var car = 0;
var bike = 0;
var boat = 0;


// FUNCTIONS


function carouselInit() {

  console.log("carouselInit");
  $('.carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    infinite: true,
    slidesToShow: 3,
    arrows: true,
  });
}



function myFunction(p1, p2) {
  return p1 * p2; // The function returns the product of p1 and p2
}


function getTotal() {
  var total;
  if (typeof(Storage) !== "undefined") {
    total = localStorage.getItem(basket_key);
  } else {
    return 0;
  }
  if (typeof total !== "undefined" && total !== null) {
    return total
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


// save element HTML
function saveElement(element_id, element_key) {
  if (typeof(Storage) !== "undefined") {
    var element_html;
    element_html = document.getElementById(element_id).innerHTML;
    console.log("SAVED ELEMENT " + element_id);
    return localStorage.setItem(element_key, element_html);
  } else {
    return 0;
  }
}

//restere element HTML
function restoreElement(element_id, element_key) {
  if (typeof(Storage) !== "undefined") {
    var element_html;
    element_html = localStorage.getItem(element_key);
    console.log("RESTORED ELEMENT " + element_id + element_html);
    if (element_html) {
      document.getElementById(element_id).innerHTML = element_html;
    }
  } else {
    return 0;
  }
}

function saveRadio() {
  $('input[type="radio"]').each(function() {
    // get radio id and checked state
    var id = $(this).attr('id');

    if ($(this).is(':checked')) {
      // save if radio is checked

      var value = $(this).prop('checked', true);
      console.log("SAVING " + id + " " + value);
      localStorage.setItem(id, value);
    } else {
      // clear the local store if unchecked
      console.log("REMOVING " + id);
      localStorage.removeItem(id);
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
}


function initMap() {

  console.log("map loaded");
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

function sayHello() {
  console.log("Hello");
}



function goToChoose() {

  car = 0;
  bike = 0;
  boat = 0;

  console.log("click to go to choose");
  $('#car-picker').on('click', function() {
    console.log("car is true")
    car = 1;
    bike = 0;
    boat = 0;
    return 0;
  });
  $('#bike-picker').on('click', function() {
    car = 0;
    bike = 1;
    boat = 0;
    return 0;
  });
  $('#boat-picker').on('click', function() {
    car = 0;
    bike = 0;
    boat = 1;
    return 0;
  });

}


function vehiclePickerInit() {

  console.log("vehiclePickerInit");
  saveElement("input-elements", "newform");

  /*
    if (car = 1) {
      console.log("car is true");
      $("#car-carousel").removeClass("warp");
      $("#bike-carousel").addClass("warp");
      $("#boat-carousel").addClass("warp");

      $('#bike-picker').removeClass("pick-selected");
      $('#boat-picker').removeClass("pick-selected");
      $('#car-picker').addClass("pick-selected");
      restoreElement("input-elements", "newform");
      calcTotal();
      return 0;
    } else {
      return 0;
    }
    if (bike = 1) {
      console.log("bike is true");
      $("#bike-carousel").removeClass("warp");
      $("#car-carousel").addClass("warp");
      $("#boat-carousel").addClass("warp");


      $('#car-picker').removeClass("pick-selected");
      $('#boat-picker').removeClass("pick-selected");
      $('#bike-picker').addClass("pick-selected");
      restoreElement("input-elements", "newform");
      calcTotal();
      return 0;
    } else {
      return 0;
    }
    if (boat = 1) {
      console.log("boat is true");
      $("#boat-carousel").removeClass("warp");
      $("#bike-carousel").addClass("warp");
      $("#car-carousel").addClass("warp");


      $('#car-picker').removeClass("pick-selected");
      $('#bike-picker').removeClass("pick-selected");
      $('#boat-picker').addClass("pick-selected");
      restoreElement("input-elements", "newform");
      calcTotal();
      return 0;
    } else {
      return 0;
    }

    */

  $('#car-picker').on('click', function() {
    $("#car-carousel").removeClass("warp");
    $("#bike-carousel").addClass("warp");
    $("#boat-carousel").addClass("warp");

    $('#bike-picker').removeClass("pick-selected");
    $('#boat-picker').removeClass("pick-selected");
    $(this).addClass("pick-selected");
    restoreElement("input-elements", "newform");
    calcTotal();
    localStorage.clear();

  });
  $('#bike-picker').on('click', function() {
    $("#bike-carousel").removeClass("warp");
    $("#car-carousel").addClass("warp");
    $("#boat-carousel").addClass("warp");


    $('#car-picker').removeClass("pick-selected");
    $('#boat-picker').removeClass("pick-selected");
    $(this).addClass("pick-selected");
    restoreElement("input-elements", "newform");
    calcTotal();
    localStorage.clear();
  });
  $('#boat-picker').on('click', function() {
    $("#boat-carousel").removeClass("warp");
    $("#bike-carousel").addClass("warp");
    $("#car-carousel").addClass("warp");


    $('#car-picker').removeClass("pick-selected");
    $('#bike-picker').removeClass("pick-selected");
    $(this).addClass("pick-selected");
    restoreElement("input-elements", "newform");
    calcTotal();
    localStorage.clear();
  });
}

function calcTotal() {
  if ($("input[name=color]:checked").val()) {
    p1 = $("input[name=color]:checked").val().substring(1) * 1;
    p2 = $("input[name=engine]:checked").val().substring(1) * 1;
    p3 = $("input[name=rims]:checked").val().substring(1) * 1;
    p4 = $("input[name=tyres]:checked").val().substring(1) * 1;
    p5 = $("input[name=decor]:checked").val().substring(1) * 1;
    total = p1 + p2 + p3 + p4 + p5;
    $("#output").val("£" + total);
  }
}


function basketContent() {
  console.log("basketContent");
  restoreElement("input-elements", "formdata");

  $('input[type="radio"]').each(function() {
    // get radio id and checked state
    var id = $(this).attr('id');
    var value = localStorage.getItem(id);
    if (value) {
      // set it visible & checked
      $(this).prop('checked', value);
    } else {
      // hide its parent <li> 

      $(this).parent().css('display', 'none');
    }
  });
}

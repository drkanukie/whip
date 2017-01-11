// Whip web functions
//
// GLOBALS
var total = 0;
var basket_key = "basket";
var form_key = "form";
var id = "color";



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
    //console.log("RESTORED ELEMENT " + element_id + element_html);
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



function savePicker() {
  console.log("savePicker");
  $('#car-picker').on('click', function() {
    console.log("picker = #car-picker");
    localStorage.setItem("picker", "#car-picker");
    localStorage.setItem("picker-reset", true);
    console.log("*** RESET ARMED***");
  });
  $('#bike-picker').on('click', function() {
    console.log("picker = #bike-picker");
    localStorage.setItem("picker", "#bike-picker");
    localStorage.setItem("picker-reset", true);
    console.log("*** RESET ARMED***");
  });
  $('#boat-picker').on('click', function() {
    console.log("picker = #boat-picker");
    localStorage.setItem("picker", "#boat-picker");
    localStorage.setItem("picker-reset", true);
    console.log("*** RESET ARMED***");
  });

}

function resetRadioEvents() {
  // RADIO CHANGE
  $("input[type=radio]").change(function() {
    calcTotal();
    saveRadio();
  });
}


function resetPicker(picker_on, picker1, picker2, carousel_on, carousel1, carousel2) {
  console.log("resetPicker");
  $(carousel_on).removeClass("warp");
  //$(carousel_on).addClass("carousel");
  $(picker_on).addClass("pick-selected");

  $(carousel1).addClass("warp");
  //$(carousel1).removeClass("carousel");
  $(picker1).removeClass("pick-selected");

  $(carousel2).addClass("warp");
  //$(carousel2).removeClass("carousel");
  $(picker2).removeClass("pick-selected");

  restoreElement("input-elements", "newform");
  resetRadioEvents();
  calcTotal();
  var reset = localStorage.getItem("picker-reset");
  console.log("reset = " + reset)
  if (reset) {
    localStorage.clear();
    localStorage.removeItem("picker-reset");
  }
}

function vehiclePickerInit() {

  console.log("vehiclePickerInit");
  saveElement("input-elements", "newform");
  var picker = localStorage.getItem("picker")

  if (picker == "#car-picker") {
    console.log("picker = #car-picker");
    resetPicker("#car-picker", "#bike-picker", "#boat-picker", "#car-carousel", "#bike-carousel", "#boat-carousel");
  }
  if (picker == "#bike-picker") {
    console.log("picker = #bike-picker");
    resetPicker("#bike-picker", "#car-picker", "#boat-picker", "#bike-carousel", "#car-carousel", "#boat-carousel");
  }
  if (picker == "#boat-picker") {
    console.log("picker = #boat-picker");
    resetPicker("#boat-picker", "#bike-picker", "#car-picker", "#boat-carousel", "#car-carousel", "#bike-carousel");
  }


  $('#car-picker').on('click', function() {
    resetPicker("#car-picker", "#bike-picker", "#boat-picker", "#car-carousel", "#bike-carousel", "#boat-carousel");
    console.log("CLEARED");
    localStorage.clear();
    localStorage.setItem("picker", "#car-picker");
  });

  $('#bike-picker').on('click', function() {
    resetPicker("#bike-picker", "#car-picker", "#boat-picker", "#bike-carousel", "#car-carousel", "#boat-carousel");
    console.log("CLEARED");
    localStorage.clear();
    localStorage.setItem("picker", "#bike-picker");
  });

  $('#boat-picker').on('click', function() {
    resetPicker("#boat-picker", "#bike-picker", "#car-picker", "#boat-carousel", "#car-carousel", "#bike-carousel");
    console.log("CLEARED");
    localStorage.clear();
    localStorage.setItem("picker", "#boat-picker");
  });
}

function calcTotal() {
  var currentSlide = $('.carousel').slick('slickCurrentSlide');
  console.log("currentSlide = " + currentSlide);
  p6 = $("#car" + currentSlide).attr("value").substring(1) * 1;
  if ($("input[name=color]:checked").val()) {
    p1 = $("input[name=color]:checked").val().substring(1) * 1;
    p2 = $("input[name=engine]:checked").val().substring(1) * 1;
    p3 = $("input[name=rims]:checked").val().substring(1) * 1;
    p4 = $("input[name=tyres]:checked").val().substring(1) * 1;
    p5 = $("input[name=decor]:checked").val().substring(1) * 1;

    total = p1 + p2 + p3 + p4 + p5 + p6;
    $("#output").val("£" + total);
  }
}


function basketContent() {
  console.log("basketContent");
  restoreElement("input-elements", "formdata");
  restoreElement("vehicle", "vehicledata");

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

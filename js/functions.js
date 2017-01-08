// Whip web functions
//

// GLOBALS
var total = 0;
var basket_key = "basket";
var form_key = "form";


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
}

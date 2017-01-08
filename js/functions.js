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

function saveForm(id) {
  if (typeof(Storage) !== "undefined") {
    return localStorage.getItem(basket_key);
  } else {
    return 0;
  }
}


function restoreForm(id) {
  if (typeof(Storage) !== "undefined") {
    return localStorage.getItem(form_key);
  } else {
    return 0;
  }
}

var checks = document.querySelectorAll('input[type=checkbox]');
var max = 3; // add an int to this to test with doing the entire booking
//sessionStorage.setItem('seatsSelected', JSON.stringify([0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]))
var selected = JSON.parse(sessionStorage.getItem('seatsSelected'));

for (var i = 0; i < checks.length; i++)
  checks[i].onclick = selectiveCheck;  

function selectiveCheck (event) {
  console.log("click")
  var checkedChecks = document.querySelectorAll(".seat:checked");
  updateText(checkedChecks.length);
  
  if (checkedChecks.length >= max+1) {
    enableConfirmBtn();
    return false;
  } else {
    if (checkedChecks.length == max) {
      storeSeatData();
      enableConfirmBtn();
    } else {
      disableConfirmBtn();
    } 
  }
}

function updateText(checked)  {
  var rem = String(max - checked);
  if (rem < 0)
    rem = 0;
  document.getElementById('count').innerText = "Remaining: " + rem + " / " + String(max);
}

function storeSeatData() {
  var checks2 = document.querySelectorAll('input[type=checkbox]');
  for (var i = 0; i < checks2.length; i++) {
    if (checks2[i].checked) {
      selected[i] = 1;
    } else {
      selected[i] = 0;
    } 
  }
  sessionStorage.setItem("temp-selectedSeats", JSON.stringify(selected))
}

function setSeats() {
  for (var i = 0; i < checks.length; i++) {
    if (selected[i] == 1) {
      checks[i].checked = true;
    }
  }
  var checkedChecks = document.querySelectorAll(".seat:checked");
  updateText(checkedChecks.length);
}

setSeats();
disableConfirmBtn();

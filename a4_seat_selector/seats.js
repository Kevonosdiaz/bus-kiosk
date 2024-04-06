var checks = document.querySelectorAll('input[type=checkbox]');
console.log(sessionStorage.getItem("passengers"))
var max = Number(sessionStorage.getItem("passengers"));

for (var i = 0; i < checks.length; i++)
  checks[i].onclick = selectiveCheck;

function selectiveCheck (event) {
  console.log("click")
  
  var checkedChecks = document.querySelectorAll(".seat:checked");
  updateText(checkedChecks.length);
  if (checkedChecks.length >= max + 1)
    return false;
}

function updateText(checked)  {
  var rem = String(max - checked);
  if (rem < 0)
    rem = 0;
  document.getElementById('count').innerText = "Remaining: " + rem + " / " + String(max);
}
updateText(0);
var checks = document.querySelectorAll('input[type=checkbox]');
var max = 2;
for (var i = 0; i < checks.length; i++)
  checks[i].onclick = selectiveCheck;
function selectiveCheck (event) {
  var checkedChecks = document.querySelectorAll(".seat:checked");
  if (checkedChecks.length >= max + 1)
    return false;
}
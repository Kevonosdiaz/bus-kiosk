const verifyLabel = document.getElementById('verifyLabel');
console.log(verifyLabel)
function verifyInfo() {
  verifyLabel.addEventListener('click', function() {
    var div = document.getElementById('vbox');
    if (div.style.display === "flex") {
        div.style.display = "none";
    } else {
        div.style.display = "flex";
        verifyLabel.style.display = 'none';
    }
  });
}

document.getElementById('next').onclick = function () {
    location.href = "../b3_modify_ticket_new/modify_1.html";
};

document.getElementById('back').onclick = function () {
    location.href = "../index.html"
};

document.addEventListener("DOMContentLoaded", function() {
    verifyInfo();
});



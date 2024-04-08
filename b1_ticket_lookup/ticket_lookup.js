const verifyLabel = document.getElementById('verifyLabel');

sessionStorage.setItem('name', "")
sessionStorage.setItem('email', "")
sessionStorage.setItem('phone', "")
sessionStorage.setItem('bookingid', "")
function handleInput(fieldName, value) {
    switch (fieldName) {
      case 'name':
      case 'email':
      case 'phone':
      case 'bookingid':
        sessionStorage.setItem(fieldName, value)
        if (!checkEmpty()) {
            verifyLabel.style.backgroundColor = "#7197FF";
            verifyLabel.style.color = "#000000";
            verifyLabel.style.cursor = 'pointer';
        } else {
            verifyLabel.style.cursor = 'not-allowed';
            verifyLabel.style.backgroundColor = "#C6C6C6";
            verifyLabel.style.color = "#5D5D5D";
        }
       /* if (value === '') {
          showRequiredTag(fieldName)
        } else {
          hideRequiredTag(fieldName)
        }
        validateFormState()*/
    }
  }

function checkEmpty() {
    if (sessionStorage.getItem('name') == "" || sessionStorage.getItem('email') == "" || sessionStorage.getItem('phone') == "" || sessionStorage.getItem('bookingid') == "") {
        return true
    } else {
        return false
    }
}

function verifyInfo() {
  verifyLabel.addEventListener('click', function() {
    var div = document.getElementById('vbox');
    if (!checkEmpty()) {
        if (div.style.display === "flex") {
            div.style.display = "none";
        } else {
            div.style.display = "flex";
            verifyLabel.style.display = 'none';
        }
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



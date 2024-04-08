const verifyLabel = document.getElementById('verifyLabel');

sessionStorage.setItem('m-name', "")
sessionStorage.setItem('m-email', "")
sessionStorage.setItem('m-phone', "")
sessionStorage.setItem('m-bookingid', "")

function handleInput(fieldName, value) {
    switch (fieldName) {
      case 'm-name':
      case 'm-email':
      case 'm-phone':
      case 'm-bookingid':
        sessionStorage.setItem(fieldName, value)
        if ((!checkEmpty()) && checkFormat()) {
            verifyLabel.style.backgroundColor = "#7197FF";
            verifyLabel.style.color = "#000000";
            verifyLabel.style.cursor = 'pointer';
        } else {
            verifyLabel.style.cursor = 'not-allowed';
            verifyLabel.style.backgroundColor = "#C6C6C6";
            verifyLabel.style.color = "#5D5D5D";
        }
    }
  }

function checkEmpty() {
    if (sessionStorage.getItem('m-name') == "" || sessionStorage.getItem('m-email') == "" || sessionStorage.getItem('m-phone') == "" || sessionStorage.getItem('m-bookingid') == "") {
        return true
    } else {
        return false
    }
}

function checkFormat() {
    if ( (/[a-zA-Z]+\s+[a-zA-Z]+/.test(sessionStorage.getItem('m-name'))) && (/\@/.test(sessionStorage.getItem('m-email'))) && (/^\d{10}$/g.test(sessionStorage.getItem('m-phone'))) && (/^[a-zA-Z0-9]{6}$/.test(sessionStorage.getItem('m-bookingid')))) {
        console.log(1)
        return true
    } else {
        console.log(0)
        return false
    }
}

function verifyInfo() {
  verifyLabel.addEventListener('click', function() {
    var div = document.getElementById('vbox');
    if (!checkEmpty() && checkFormat()) {
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
    location.href = "../b2_modify_stream/b2.1_modify_booking_options.html";
};

document.getElementById('back').onclick = function () {
    location.href = "../index.html"
};

document.addEventListener("DOMContentLoaded", function() {
    verifyInfo();
});
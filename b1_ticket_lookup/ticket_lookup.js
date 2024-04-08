const verifyLabel = document.getElementById('verifyLabel');
const nextBtn = document.getElementById('next');

const valid_inputs = ["gus ryder", "gus.ryder@bmail.com", "1112223333", "bus123", "737373"]

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
      case 'm-vcode':
        sessionStorage.setItem(fieldName, value)
        if (checkFormatCode()) {
            nextBtn.style.backgroundColor = "#7197FF";
            nextBtn.style.color = "#000000";
            nextBtn.style.cursor = 'pointer';
        } else {
            nextBtn.style.cursor = 'not-allowed';
            nextBtn.style.backgroundColor = "#C6C6C6";
            nextBtn.style.color = "#5D5D5D";
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
    if ( (/[a-zA-Z]+\s+[a-zA-Z]+/.test(sessionStorage.getItem('m-name'))) && (/\@/.test(sessionStorage.getItem('m-email'))) && (/^\d{10}$/.test(sessionStorage.getItem('m-phone'))) && (/^[a-zA-Z0-9]{6}$/.test(sessionStorage.getItem('m-bookingid')))) {
        return true
    } else {
        return false
    }
}

function findBooking () {
    var name = sessionStorage.getItem('m-name').toLowerCase();
    var email = sessionStorage.getItem('m-email').toLowerCase();
    var phone = sessionStorage.getItem('m-phone').toLowerCase();
    var id = sessionStorage.getItem('m-bookingid').toLowerCase();
    if (name == valid_inputs[0] && email == valid_inputs[1] && phone == valid_inputs[2] && id == valid_inputs[3]) {
        return true
    } else {
        return false
    }
}

function checkFormatCode() {
    var vcode = sessionStorage.getItem('m-vcode');
    if ( /^\d{6}$/.test(vcode)) {
        return true
    } else {
        return false
    }
}

function verifyCode() {
    var vcode = sessionStorage.getItem('m-vcode');
    if (vcode == valid_inputs[4]) {
        return true
    } else {
        return false
    }
}

function verifyInfo() {
  verifyLabel.addEventListener('click', function() {
    var div = document.getElementById('vbox');
    var message = document.getElementById('message_box');
    var msgtext = document.getElementById('msg');
    if (!checkEmpty() && checkFormat()) {
        if (findBooking()) {
            if (div.style.display === "flex") {
                div.style.display = "none";
            } else {
                message.style.display = "none";
                div.style.display = "flex";
                document.getElementById('vbox_text').innerText = "Please enter the verification code sent to \n" + String(sessionStorage.getItem('m-email'));
                verifyLabel.style.display = 'none';
            }
        } else {
            message.style.display = "flex";
            msgtext.innerText = "No booking matches this information. Please check that you have entered the correct information and try again.";
        }
        
    }
  });
}

nextBtn.onclick = function () {
    if (verifyCode()) {
        sessionStorage.setItem('seatsSelected', JSON.stringify([0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]))
        location.href = "../b2_modify_stream/b2.1_modify_booking_options.html";
    } else {
        var div = document.getElementById('vbox');
        var message = document.getElementById('message_box');
        var msgtext = document.getElementById('msg');

        var code_input = document.getElementById('code-input');
        code_input.value = "";

        sessionStorage.setItem('m-vcode', "");

        verifyLabel.style.display = 'flex';
        div.style.display = "none";
        message.style.display = "flex";
        msgtext.innerText = "Verification code was incorrect. Please submit again to receive a new code.";

        nextBtn.style.cursor = 'not-allowed';
        nextBtn.style.backgroundColor = "#C6C6C6";
        nextBtn.style.color = "#5D5D5D";
    }
    
};

document.getElementById('back').onclick = function () {
    location.href = "../index.html"
};

document.addEventListener("DOMContentLoaded", function() {
    verifyInfo();
});
class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="header">
                <button class="back" button id="back">
                    <img class="offset-img" src="../Images/Icons/Screens/back black.png" alt="Back arrow" />
                    Back
                </button>

                <button id="reset" class="reset">
                    <img class="offset-img" src="../Images/Icons/Screens/reset red.png" alt="Reset icon" />
                    Start Over
                </button>

                <button class="confirm" button id="confirm">
                    Next
                    <img class="offset-img" src="../Images/Icons/Screens/green next.png" alt="Green checkmark" />
                </button>
            </div>
      `;
    }
} 

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `    
         <div class="footer">
                <button class="back">
                    <img class="offset-img" src="../Images/Icons/Screens/back red.png" alt="Back arrow" />
                    Back
                </button>
                <button class="confirm">
                    Confirm
                    <img class="offset-img" src="../Images/Icons/Screens/confirm green.png" alt="Green checkmark" />
                </button>
            </div>
      `;
    }
}

class Footer2 extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <div class="footer">
                <button class="back">
                    <img class="offset-img" src="../Images/Icons/Screens/back red.png" alt="Back arrow" />
                    Back
                </button>
                <button class="confirm">
                    Search
                    <img class="offset-img" src="../Images/Icons/Screens/search green.png" alt="Green search icon" />
                </button>
            </div>
        `
    }
}

class Footer3 extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <div class="footer">
                <button class="back">
                    <img class="offset-img" src="../Images/Icons/Screens/back red.png" alt="Back arrow" />
                    Back
                </button>
                <button class="confirm">
                    Pay
                    <img class="offset-img" src="../Images/Icons/Screens/pay-green.png" alt="Green pay icon" />
                </button>
            </div>
        `
    }
}

class Footer4 extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <div class="footer">
            </div>
        `
    }
}

function handle_trip_item_click(optionNum) {
    let current_top_half = document.getElementById('ds-top-half')
    let current_bottom_half = document.getElementById('ds-bottom-half')
    let radio_button = document.getElementById(`item-input-${optionNum}`)

    if (current_top_half.className === 'ds-top-half') {
        current_top_half.className = 'ds-top-half-collapsed'
        current_bottom_half.className = 'ds-bottom-half-visible'
        radio_button.checked = true
    } else if (radio_button.checked) {
        radio_button.checked = false
        current_top_half.className = 'ds-top-half'
        current_bottom_half.className = 'ds-bottom-half'
    } else {
        radio_button.checked = true
    }


}

class TripItem extends HTMLElement {
    
    connectedCallback() {
        let optionNum = this.getAttribute('optionNum')
        this.innerHTML = `
        <div onclick="handle_trip_item_click(${optionNum})" id='ti-${optionNum}'>
            <div class='single-item'>
                <div class='grid-container'>
                    <p id='item-info-a'></p>
                    <p id='item-info-b'></p>
                    <p id='item-info-c'></p>
                    <p id='item-info-d'></p>
                </div>
                <input id='item-input-${optionNum}' type="radio" name="label" >
            </div>
        </div>
        `;
        
        
        let info_a = this.querySelector('#item-info-a')
        let info_b = this.querySelector('#item-info-b')
        let info_c = this.querySelector('#item-info-c')
        let info_d = this.querySelector('#item-info-d')

        let depart = this.getAttribute('departTime')
        let arrive = this.getAttribute('arriveTime')
        let duration = this.getAttribute('duration')
        let cost = this.getAttribute('cost')

        info_a.textContent = `Depart: ${depart}`
        info_b.textContent = `Duration: ${duration}`
        info_c.textContent = `Arrive: ${arrive}`
        info_d.textContent = `Cost: ${cost}`
    }

}

class AdditionalTripInfo extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class='add-details' id='details'>
            <div class="trip-summary">
                <div class='add-details-depart'>
                    <p style="font-weight: 600;">Departure</p>
                    <p>Calgary City Center Station</p>
                    <p>9:00AM, April 25, 2024</p>
                </div>
                <div class='add-details-arrive'>
                    <p style="font-weight: 600;">Arrival</p>
                    <p>Edmonton International Airport</p>
                    <p>2:15PM, April 25, 2024</p>
                </div>
            </div>
            <div class="trip-extra">
                <p>Number of Stops: 3</p>
                <p>15 Seats Available</p>
                <p>Ebus</p>
                <p>Wifi</p>
            </div>
        </div>
        `;
    }
}

customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('trip-item', TripItem);
customElements.define('alt-footer',Footer2);
customElements.define('pay-footer',Footer3);
customElements.define('empty-footer',Footer4);

////// Navigation Function /////////

// Sets the url of the previous page to the 'previousPage variable'
var previousPage;
function setPreviousPage(page) {
    previousPage = page;
}

var nextPage;
function setNextPage(page) {
    nextPage = page;
}

// Reads the url and looks for any variable data for the name of the passed variable
function readURLData(inVar) {
    var urlParams = new URLSearchParams(window.location.search);
    var data = urlParams.get(inVar);
    //console.log(data);
    return data;
}

// Function for when the user clicks on 'back button'
// this will read the previousPage url and load that html page
function backButtonClick() {
    const backButton = document.getElementById('back');
    backButton.addEventListener('click', function() {
        window.location.href = previousPage;
    });
};

function nextButtonClick() {
    const nextButton = document.getElementById('confirm');
    nextButton.addEventListener('click', function() {
        window.location.href = nextPage;
    });
}

// Array to store a string of indexes in the order of screens visited
// This is used by the program to keep track of where the back button goes
var visitOrder = "";

// Switchboard to translate the index strings to urls for the program to point to the right page
function indexToPath(index) {
    var url = "";
    switch (index) {
        case '0': url = '../0_welcome_screen/welcome_screen.html';
        break;
        case '1': url = '../a1_search_screen/2-new_ticket_search_screen.html';
        break;
        case '2': url = '../a2_trip_info/DetailedSearch.html';
        break;
        case '3': url = '../a3_passenger_info/passenger_info.html';
        break;
        case '4': url = '../a4_seat_selector/seat_selector.html';
        break;
        case '5': url = '../a5_summary/summary.html';
        break;
        case '6': url = '../a5_summary/pay.html';
        break;
        case '7': url = '../a5_summary/finish.html';
        break;
        case '8': url = '../b1_ticket_lookup/modify_ticket.html';
        break;
        case '9': url = '../b2_ticket_modification/modify_ticket2.html';
    }

    return url;
}

// waits for the page to be fully loaded before buttons can be pressed
document.addEventListener("DOMContentLoaded", function() {
    backButtonClick();
    nextButtonClick();
});

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

class TripItem extends HTMLElement {
    
    connectedCallback() {
        this.innerHTML = `
        <div>
            <div class='single-item'>
                <div class='grid-container'>
                    <p id='item-info-a'></p>
                    <p id='item-info-b'></p>
                    <p id='item-info-c'></p>
                    <p id='item-info-d'></p>
                </div>
                <input id='item-input' type="radio" name="label" >
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

customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('trip-item', TripItem);
customElements.define('alt-footer',Footer2);
customElements.define('pay-footer',Footer3);
customElements.define('empty-footer',Footer4);

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
    console.log(data);
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

// waits for the page to be fully loaded before buttons can be pressed
document.addEventListener("DOMContentLoaded", function() {
    backButtonClick();
    nextButtonClick();
});

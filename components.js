class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="header">
                <button id="reset" class="back">
                    <img class="offset-img" src="Images/Icons/Screens/reset red.png" alt="Reset icon" />
                    Restart
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
                    <img class="offset-img" src="Images/Icons/Screens/back red.png" alt="Back arrow" />
                    Back
                </button>
                <button class="confirm">
                    Confirm
                    <img class="offset-img" src="Images/Icons/Screens/confirm green.png" alt="Green checkmark" />
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
                    <img class="offset-img" src="Images/Icons/Screens/back red.png" alt="Back arrow" />
                    Back
                </button>
                <button class="confirm">
                    Search
                    <img class="offset-img" src="Images/Icons/Screens/search green.png" alt="Green search icon" />
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
                    <img class="offset-img" src="Images/Icons/Screens/back red.png" alt="Back arrow" />
                    Back
                </button>
                <button class="confirm">
                    Pay
                    <img class="offset-img" src="Images/Icons/Screens/pay-green.png" alt="Green pay icon" />
                </button>
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
        let details = this.querySelector('#details')

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

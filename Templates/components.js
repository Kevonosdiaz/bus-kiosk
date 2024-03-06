class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="header">
                <button id="reset" class="back">
                    <img class="offset-img" src="../Images/Icons/Screens/reset red.png" alt="Reset icon" />
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

class TripItem extends HTMLElement {
    
    connectedCallback() {
        this.innerHTML = `
        <div>
            <div class='single-item'>
                <label id='item-label' for="label"></label>
                <input id='item-input' type="radio" name="label" >
            </div>
        </div>
        `;
        let label = this.querySelector('#item-label')
        let input = this.querySelector('#item-input')

        let itemNum = this.getAttribute('optionNum')

        label.id = `item-label${itemNum}`
        label.for = `i-${itemNum}`
        input.id = `item-input${itemNum}`
        input.name = `i-${itemNum}`

        let depart = this.getAttribute('departTime')
        let arrive = this.getAttribute('arriveTime')
        let duration = this.getAttribute('duration')
        let cost = this.getAttribute('cost')
        label.textContent = `${depart} ${arrive} ${duration} ${cost}`
    }

}

customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('trip-item', TripItem);
customElements.define('alt-footer',Footer2);

let pName = "";
let pEmail = "";
let pPhone = "";
// TODO Add checkboxes for ticket copy/notification (?) opt-in
let pEmailNotif = false;
let pPhoneNotif = false;
let currentPage = 2; // Page number, not it's index number
const numPassengers = Math.max(1, Number(sessionStorage.getItem("passengers")));
let passInfo = []; // Store nth passengers info (object) at index n
const statuses = [];
const finishedPages = [2];
disableConfirmBtn();

// Functions to fetch/push passenger info, using session variables
function fetchPassInfo() {
    passInfo = JSON.parse(sessionStorage.getItem("pInfo"));
}

function pushPassInfo() {
    sessionStorage.setItem("pInfo", JSON.stringify(passInfo));
}

// Contains name/email/phone, as well as additional services
// TODO Add info/help button for 1st page only
class PassengerInfoContainer extends HTMLElement {
    connectedCallback() {
        for (let i = 0; i < 1; i++) {
            // Change 1 to numPassengers for n containers
            const wrapper = document.createElement("div");
            wrapper.id = `passengerWrapper${i}`;
            wrapper.innerHTML = `
            <div class="info">
            <div class="passenger-header" id="passenger-header" >Passenger ${i + 1} Info</div>
            <div class="field">
                <label for="name-input" class="label">
                    <img src="../Images/Icons/Screens/personal info black.png" alt="ID card icon" />
                    Name
                </label>
                <input oninput="pName=this.value" required placeholder="firstname lastname" id="name-input" />
            </div>
            <div class="field">
                <label for="email-input" class="label">
                    <img src="../Images/Icons/Screens/email black.png" alt="Email icon" />
                    Email
                </label>
                <input required placeholder="ex. myEmail@mail.com" id="email-input" />
            </div>
            <div class="field">
                <label for="phone-input" class="label">
                    <img src="../Images/Icons/Screens/phone black.png" alt="Phone icon" />
                    Phone
                </label>
                <input type="text" required placeholder="ex. 1112223333" id="phone-input" />
            </div>
        </div>
        <div class="services">
            <div class="services-header">Additional Services</div>
            <div class="service-box">
                <div class="left-services">
                    <div class="service" id="checked-bags">
                        <button class="left-button" id="bag-minus" onclick="decrement('bag-count', 0)">
                            -
                        </button>
                        <div class="service-text">
                            <div>Extra Bags</div>
                            <div>+ $10</div>
                            <div class="divider"></div>
                            <div id="bag-count">Qty: 0</div>
                        </div>

                        <button class="right-button" id="bag-plus" onclick="increment('bag-count', 0)">
                            +
                        </button>
                    </div>
                    <div class="service" id="animal-transport">
                        <button class="left-button" id="animal-minus" onclick="decrement('animal-count', 1)">
                            -
                        </button>
                        <div class="service-text">
                            <div>Animal Transport</div>
                            <div>+ $15</div>
                            <div class="divider"></div>
                            <div id="animal-count">Qty: 0</div>
                        </div>
                        <button class="right-button" id="animal-plus" onclick="increment('animal-count', 1)">
                            +
                        </button>
                    </div>
                </div>
                <div class="right-services">
                    <div class="service" id="bicycle-storage">
                        <button class="left-button" id="bike-minus" onclick="decrement('bike-count', 2)">
                            -
                        </button>
                        <div class="service-text">
                            <div>Bicycle Storage</div>
                            <div>+ $15</div>
                            <div class="divider"></div>
                            <div id="bike-count">Qty: 0</div>
                        </div>
                        <button class="right-button" id="bike-plus" onclick="increment('bike-count', 2)">
                            +
                        </button>
                    </div>
                    <div class="service" id="ski-snowboard">
                        <button class="left-button" id="skisnow-minus" onclick="decrement('skisnow-count', 3)">
                            -
                        </button>
                        <div class="service-text">
                            <div>Ski/Snowboard</div>
                            <div>+ $10</div>
                            <div class="divider"></div>
                            <div id="skisnow-count">Qty: 0</div>
                        </div>
                        <button class="right-button" id="skisnow-plus" onclick="increment('skisnow-count', 3)">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
            
            `;
            if (i === 0) {
                wrapper.className = `wrapperVisible`;
            } else {
                wrapper.className = `wrapperHidden`;
            }
            document.getElementById(`outer`).appendChild(wrapper);
        }

        const statusBar = document.createElement("div");
        statusBar.id = "status-bar";
        statusBar.innerHTML = `
            <button class="prev" button id="nav-back">
                <img
                    class="offset-img"
                    src="../Images/Icons/Screens/back black.png"
                    alt="Prev passenger button" />
            </button>
            <div class="status" id="status-container"></div>
            <button class="next" button id="nav-next">
                <img
                    id="nav-next-img"
                    class="offset-img"
                    src="../Images/Icons/Screens/black next.png"
                    alt="Next passenger button" />
            </button>
        `;
        document.getElementById(`outer`).appendChild(statusBar);
    }
}

// Add status circles and lines to status bar
class StatusBar extends HTMLElement {
    connectedCallback() {
        // Populate status bar based on # of passengers
        const container = document.getElementById(`status-container`);
        for (let i = 0; i < numPassengers; i++) {
            const statusCircle = document.createElement("div");
            statusCircle.id = `stat${i}`;
            statusCircle.classList.add("stat-indicator");
            statusCircle.innerText = `P${i + 1}`;
            container.appendChild(statusCircle);
            statuses.push(statusCircle);
            if (i !== numPassengers - 1) {
                const line = document.createElement("div");
                line.classList.add("line");
                container.appendChild(line);
            }
        }
        updateStatus();
    }
}

customElements.define("passenger-info-container", PassengerInfoContainer);
customElements.define("status-bar", StatusBar);

// Clear styles for all status nodes, reapply correct style
// Assumes all previous nodes are completed
function updateStatus() {
    let curr = currentPage - 1;
    for (let i = 0; i < numPassengers; i++) {
        let stat = statuses[i].classList;
        stat.remove("current-stat");
        stat.remove("unfinished-stat");
        stat.remove("completed-stat");
        if (i === curr) stat.add("current-stat");
        else if (i < curr || finishedPages.includes(i)) stat.add("completed-stat");
        else stat.add("unfinished-stat");
    }
}


const tnum_i = 0 // Ticket Number index
const name_i = 1 // Passenger Name index
const total_i = 2 // Total ticket cost index (ticket + additional)
const tcost_i = 3 // Ticket cost  index
const adds_i = 4 // Additional Services index
const bag_i = 0 // Extra Bags index
const ani_i = 1  // Animal Storage index
const bic_i = 2 // Bicycle Storage index
const ski_i = 3 // Ski/Snowboard index

// get ticket info that needs to be modified
var ticket_index = JSON.parse(sessionStorage.getItem('ticket_to_mod'))
var ticket_list = JSON.parse(sessionStorage.getItem('m-tick-list'))
var ticket = ticket_list[[ticket_index]]
console.log(ticket)


// TODO consider allowing ability to switch to page N (or consider as "for future development")
// function switchPage(pageNo) {}

const serviceCosts = [10.00, 15.00, 15.00, 10.00]; // Costs of bag, animal, bike, and ski/snowboard services (in that order)
const serviceTotal = document.getElementById("totalnew");
const extraBags = document.getElementById("checked-bags");
const animalTransport = document.getElementById("animal-transport");
const bicycleStorage = document.getElementById("bicycle-storage");
const skiSnowboard = document.getElementById("ski-snowboard");
const sList = [extraBags, animalTransport, bicycleStorage, skiSnowboard]; // Store all services for easily selecting/deselecting
const sCount = ticket[adds_i]; // Store qty of each service
console.log(sCount)

const SERVICELIMIT = 10; // max number of service count per service

// Store current state of fields into variables
function fetchFields() {
    pName = document.getElementById("name-input").value;
    pEmail = document.getElementById("email-input").value;
    pPhone = document.getElementById("phone-input").value;
    // Note: service quantities are stored in servicesCount, updated automatically
}

// Update passInfo for nth passenger
function updatePassInfoN(n) {
    names = pName.split(" "); // Assumes name in format "first last"
    pInfo = createPInfo(
        names[0],
        names[1],
        pEmail,
        pEmailNotif,
        pPhone,
        pPhoneNotif,
        sCount[0],
        sCount[1],
        sCount[2],
        sCount[3]
    );
    passInfo[n] = pInfo;
}

// Fetch passenger object for nth passenger
function getPassInfoN(n) {}

// Remove 'selected' class to remove selected service background
function deselect(serviceNo) {
    let element = sList[serviceNo];
    element.classList.remove("selected");
}

// Add 'selected' class to add selected service background
function select(serviceNo) {
    let element = sList[serviceNo];
    element.classList.add("selected");
}

// Helper fn used to get count # from strings of pattern "Qty: #"
function parseQty(str) {
    arr = str.split(" "); // delimit by space
    var  count = parseInt(arr[1]); // fetch #, parse as int
    return count;
}

// increment() and decrement() used by button onclick event to update qty count and total cost
function decrement(qtyID, serviceNo) {
    let element = document.getElementById(qtyID);
    let count = parseQty(element.innerText);
    if (count === 1) deselect(serviceNo);
    if (count > 0) {
        // Update qty # on label + in count array
        count--;
        element.innerText = "Qty: " + count;
        sCount[serviceNo] = count;
        // Update total cost
        let cost = serviceCosts[serviceNo];
        let currentTotal = parseFloat(serviceTotal.innerText.split("$")[1]);
        serviceTotal.innerText = "New Total - $" + (currentTotal - cost).toFixed(2);
    }
}

function increment(qtyID, serviceNo) {
    let element = document.getElementById(qtyID);
    let count = parseQty(element.innerText);
    if (count === 0) select(serviceNo);
    if (count < SERVICELIMIT) {
        // Update qty # on label + in count array
        count++;
        element.innerText = "Qty: " + count;
        sCount[serviceNo] = count;
        // Update total cost
        let cost = serviceCosts[serviceNo];
        let currentTotal = parseFloat(serviceTotal.innerText.split("$")[1]);
        serviceTotal.innerText = "New Total - $" + (currentTotal + cost).toFixed(2);
    }
}

// Handle page back/next button click events
//let prevPageButton = document.getElementById("nav-back");
//let nextPageButton = document.getElementById("nav-next");
//prevPageButton.addEventListener("click", prevPage);
//nextPageButton.addEventListener("click", nextPage);

// Prevent user from going to next passenger page
function disableNextPage() {
    let nextBtn = document.getElementById("nav-next");
    let nextBtnImg = document.getElementById("nav-next-img");
    nextBtnImg.src = "../Images/Icons/Screens/x circle black.png";
    nextBtn.disabled = true;
    nextBtn.className = "disabled";
}

// Allow user to go to next page (ex. when all fields are filled)
function enableNextPage() {
    let nextBtn = document.getElementById("nav-next");
    let nextBtnImg = document.getElementById("nav-next-img");
    nextBtnImg.src = "../Images/Icons/Screens/black next.png";
    nextBtn.disabled = false;
    nextBtn.className = "next";
}

// Update status bar, page header, field values to 'targetNo' page info. targetNo is actual page no, not index
// TODO Show/hide required fields, help info pop-up for first page
function swapPage(targetNo) {
    document.getElementById("passenger-header").innerText = `Passenger ${targetNo} Info`;
    currentPage = targetNo;
    updateStatus();
    index = targetNo - 1;
}

function prevPage() {
    if (currentPage === 1) return; // Don't switch on first page
    // Store any inputted fields into session vars
    // Change current page, status, and populated field values
    swapPage(currentPage - 1);
}

function nextPage() {
    if (currentPage === numPassengers) return; // Don't switch on last page
    // Check if any required fields are left blank, allow change to next page if all filled

    // Change current page, status, and populated field values
    swapPage(currentPage + 1);
}

// Manage passenger information
// Return object containing info for one passenger
function createPInfo(
    firstName,
    lastName,
    email,
    emailNotif,
    phone,
    phoneNotif,
    extraBags,
    animalTransport,
    bike,
    skiSnow
) {
    return {
        firstName: firstName,
        lastName: lastName,
        email: email,
        emailNotif: emailNotif,
        phone: phone,
        phoneNotif: phoneNotif,
        extraBags: extraBags,
        animalTransport: animalTransport,
        bike: bike,
        skiSnow: skiSnow,
    };
}

function setText() {
    document.getElementById('b_title').innerText = "Modifying Ticket #"+ticket[tnum_i];
    document.getElementById('pname').innerText = ticket[name_i];
    if (ticket[tnum_i] == "1")  {
        document.getElementById('pemail').innerText = "gus.ryder@bmail.com";
        document.getElementById('pphone').innerText = "111-222-3333";
    } else {
        document.getElementById('pemail').innerText = "None";
        document.getElementById('pphone').innerText = "None";
    }
    document.getElementById('totalc').innerText = String(ticket[total_i]);

    document.getElementById('bag-count').innerText = "Qty: "+String(ticket[adds_i][bag_i]);
    document.getElementById('animal-count').innerText = "Qty: "+String(ticket[adds_i][ani_i]);
    document.getElementById('bike-count').innerText = "Qty: "+String(ticket[adds_i][bic_i]);
    document.getElementById('skisnow-count').innerText = "Qty: "+String(ticket[adds_i][ski_i]);
    for (var i = 0; i < 4; i++) {
        if (ticket[adds_i][i] > 0) {
            select(i)
        }
    }

    document.getElementById('totalnew').innerText = "New Total - $"+String(ticket[total_i]);
} 

const saveBtn = document.getElementById('saveLabel')
saveBtn.onclick = function (){
    ticket[adds_i] = sCount;
    ticket_list[[ticket_index]] = ticket;
    sessionStorage.setItem('m-tick-list', JSON.stringify(ticket_list))
    window.location.href = "b2.2_modify_tickets_options.html";
}

setText()
// For future reference:
// sessionStorage.setItem("routeList", JSON.stringify(routeList));

// TODO On subpage load: populate fields with saved info if stored

// Update page/information on arrow clicks
// Make sure 1st left and last right arrow transitions to next page
// Update numPassengers per click
// document.addEventListener("");

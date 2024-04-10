let pName = "";
let pEmail = "";
let pPhone = "";
// TODO Add checkboxes for ticket copy/notification (?) opt-in
let pEmailNotif = false;
let pPhoneNotif = false;
let currentPage = 1; // Page number, not its index number
let addServiceTotal = 0;
const numPassengers = Math.max(1, Number(sessionStorage.getItem("passengers")));
let passInfo = []; // Store nth passengers info (object) at index n
const statuses = [];
let finishedPages = [];
disableConfirmBtn();
let totalServiceCost;

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
            <div class="header-container">
                <div class="passenger-header" id="passenger-header" >Passenger ${i + 1} Info</div>
                <button class="question" id="question" onclick="togglePopUp()">?</button>
            </div>
            <div id="fields-container">
                <div id="fields">
                    <div class="field">
                    <label for="name-input" class="label">
                        <img src="../Images/Icons/Screens/personal info black.png" alt="ID card icon" />
                        Name<span class="tag" id="name-tag" style="color: red">*</span>
                    </label>
                    <input oninput="handleInput()" required placeholder="ex. FirstName LastName" id="name-input" />
                    
                </div>
                <div class="field">
                    <label for="email-input" class="label">
                        <img src="../Images/Icons/Screens/email black.png" alt="Email icon" />
                        Email<span class="tag" id="email-tag" style="color: red">*</span>
                    </label>
                    <input required placeholder="ex. myEmail@mail.com" id="email-input" oninput="handleInput()" />
                    
                </div>
                <div class="field">
                    <label for="phone-input" class="label">
                        <img src="../Images/Icons/Screens/phone black.png" alt="Phone icon" />
                        Phone<span class="tag" id="phone-tag" style="color: red">*</span>
                    </label>
                    <input type="text" required placeholder="ex. 1112223333" id="phone-input" oninput="handleInput()"/>
                    
                </div>
            </div>
            <div id="popup">
                <button id="popup-close" onclick="togglePopUp()">X</button>
                <div id="popup-message">Please input email and phone for passenger 1. These will be used for confirmation if modifying the ticket, and for communication.</div>
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
            <div id="service-total">Additional Service Total: $0</div>
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
        else if (i < curr || finishedPages[i]) stat.add("completed-stat");
        else stat.add("unfinished-stat");
    }
}

// Functions to fetch/push passenger info, using session variables
function fetchPassInfo() {
    passInfo = JSON.parse(sessionStorage.getItem("pInfo"));
}

function pushPassInfo() {
    sessionStorage.setItem("pInfo", JSON.stringify(passInfo));
}

// TODO consider allowing ability to switch to page N (or consider as "for future development")
// function switchPage(pageNo) {}

const serviceCosts = [10, 15, 15, 10]; // Costs of bag, animal, bike, and ski/snowboard services (in that order)
const serviceTotal = document.getElementById("service-total");
const extraBags = document.getElementById("checked-bags");
const animalTransport = document.getElementById("animal-transport");
const bicycleStorage = document.getElementById("bicycle-storage");
const skiSnowboard = document.getElementById("ski-snowboard");
const sList = [extraBags, animalTransport, bicycleStorage, skiSnowboard]; // Store all services for easily selecting/deselecting
const sCount = [0, 0, 0, 0]; // Store qty of each service

const SERVICELIMIT = 10; // max number of service count per service

// Store current state of fields into variables
function fetchFields() {
    pName = document.getElementById("name-input").value;
    pEmail = document.getElementById("email-input").value;
    pPhone = document.getElementById("phone-input").value;
    // Note: service quantities are stored in servicesCount, updated automatically
}

// Reset value of name, email, phone fields
// TODO reset notif checkboxes too!
function clearFields() {
    pName = "";
    pEmail = "";
    pEmailNotif = false;
    pPhone = "";
    pPhoneNotif = false;
    document.getElementById("name-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("phone-input").value = "";
}

// Populate fields based on nth passenger's currently stored info
function restoreFields(n) {
    if (passInfo.length <= n) return;
    // console.log("Attempting to restore field");
    let p = passInfo[n];
    // Handle info fields
    pName = p.firstName + " " + p.lastName;
    pEmail = p.email;
    pEmailNotif = p.emailNotif;
    pPhone = p.phone;
    pPhoneNotif = p.phoneNotif;
    // TODO Modify when notif is added
    document.getElementById("name-input").value = pName;
    document.getElementById("email-input").value = pEmail;
    document.getElementById("phone-input").value = pPhone;
    // Handle additional services
    sCount[0] = p.extraBags;
    sCount[1] = p.animalTransport;
    sCount[2] = p.bike;
    sCount[3] = p.skiSnow;
    // console.log(JSON.stringify(sCount));
    setQty("bag-count", 0, sCount[0]);
    setQty("animal-count", 1, sCount[1]);
    setQty("bike-count", 2, sCount[2]);
    setQty("skisnow-count", 3, sCount[3]);
}

// Update passInfo for nth passenger (0-indexed)
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
        sCount[3],
        addServiceTotal
    );
    // console.log(JSON.stringify(pInfo));
    passInfo[n] = pInfo;
    pushPassInfo();
}

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
    let arr = str.split(" "); // delimit by space
    let count = parseInt(arr[1]); // fetch #, parse as int
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
        let currentTotal = parseInt(serviceTotal.innerText.split("$")[1]);
        let newCost = currentTotal - cost;
        addServiceTotal = newCost;
        serviceTotal.innerText = "Additional Service Total: $" + newCost;
        updatePassInfoN(currentPage - 1);
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
        let currentTotal = parseInt(serviceTotal.innerText.split("$")[1]);
        let newCost = currentTotal + cost;
        addServiceTotal = newCost;
        serviceTotal.innerText = "Additional Service Total: $" + newCost;
        updatePassInfoN(currentPage - 1);
    }
}

// Like increment() and decrement(), but designed for restoring page info
// Directly sets value of qty, and adjusts service cost total
function setQty(qtyID, serviceNo, newQty) {
    let element = document.getElementById(qtyID);
    let oldQty = parseQty(element.innerText);

    if (newQty === 0) deselect(serviceNo);
    else select(serviceNo);
    if (oldQty !== newQty) {
        let diff = newQty - oldQty; // Allow for increasing/decreasing service total cost
        let costPerServ = serviceCosts[serviceNo];
        let currentTotal = parseInt(serviceTotal.innerText.split("$")[1]);
        let newCost = currentTotal + diff * costPerServ;
        addServiceTotal = newCost;
        serviceTotal.innerText = "Additional Service Total: $" + newCost;
        updatePassInfoN(currentPage - 1);
    }
    element.innerText = "Qty: " + newQty;
}

function clearQty() {
    let ids = ["bag-count", "animal-count", "bike-count", "skisnow-count"];
    for (let i = 0; i < ids.length; i++) {
        sCount[i] = 0;
        let element = document.getElementById(ids[i]);
        element.innerText = "Qty: 0";
        deselect(i);
    }
    serviceTotal.innerText = "Additional Service Total: $0";
    addServiceTotal = 0;
    // updatePassInfoN(currentPage - 1);
}

// Handle page back/next button click events
let prevPageButton = document.getElementById("nav-back");
let nextPageButton = document.getElementById("nav-next");
prevPageButton.addEventListener("click", prevPage);
nextPageButton.addEventListener("click", nextPage);

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
    // let index = targetNo - 1;
}

function prevPage() {
    if (currentPage === 1) return; // Don't switch on first page
    if (currentPage === 2) pageOneDisplay();
    // Store any inputted fields into session vars
    if (!checkStrictReqEmpty() && validateName()) updatePassInfoN(currentPage - 1);
    finishedPages[currentPage - 1] = true;
    // Restore fields for prev page if saved (should be saved)
    // console.log("About to check for restoring prev!");
    swapPage(currentPage - 1); // Change current page, status, and populated field values
    if (passInfo[currentPage - 1] !== null) {
        restoreFields(currentPage - 1);
        handleInput();
    } else {
        clearFields();
        clearQty();
    }
}

function nextPage() {
    if (currentPage === numPassengers) return; // Don't switch on last page
    updatePassInfoN(currentPage - 1); // Update for current passenger (*0-indexed fn)
    pushPassInfo();
    otherPageDisplay(); // Guaranteed to not be first page
    swapPage(currentPage + 1); // Change current page/status
    if (passInfo[currentPage - 1] != null) {
        // Restore fields for next page if saved
        restoreFields(currentPage - 1);
        handleInput();
        enableNextPage();
    } else {
        // Clear and disable ability to move to next page otherwise
        disableNextPage();
        clearFields();
        clearQty();
    }
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
    skiSnow,
    serviceCost
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
        serviceCost: serviceCost,
    };
}

document.addEventListener("DOMContentLoaded", function () {
    // Load first subpage information right away, initialize some stuff
    currentPage = 1;
    fetchPassInfo();
    // console.log(JSON.stringify(passInfo));
    // console.log("Onload event!");
    if (passInfo === null) passInfo = [];
    if (finishedPages.length === 0) {
        for (let i = 0; i < numPassengers; i++) finishedPages.push(false);
    }
    pageOneDisplay(); // Show special elements for first page
    document.getElementById("popup").style.display = "flex";
    restoreFields(0);
    handleInput();
    tmp = sessionStorage.getItem("finished-pages");
    if (tmp !== null) finishedPages = tmp;
    if (checkCompletion()) enableConfirmBtn();
    // let size = passInfo.length;
    // if (size === 0) disableNextPage();
    // if (size < numPassengers) disableConfirmBtn();
});
// Update page/information on arrow clicks
// Make sure 1st left and last right arrow transitions to next page
// Update numPassengers per click
// document.addEventListener("");

// oninput listener handler => check for fields and re-enable/disable next button
function handleInput() {
    fetchFields();
    // console.log(checkEmpty());
    if (currentPage === 1 && !(1 === numPassengers)) {
        // Different required fields for first
        if (checkEmpty() || !validateAllFields()) {
            disableNextPage();
            finishedPages[currentPage - 2] = false;
        } else {
            enableNextPage();
            finishedPages[currentPage - 2] = true;
        }
    } else if (currentPage === numPassengers) {
        // Check if we can enable next page btn
        if (checkStrictReqEmpty() || !validateRequiredOrFilledFields()) {
            disableConfirmBtn();
            finishedPages[currentPage - 2] = false;
        } else {
            enableConfirmBtn();
            updatePassInfoN(currentPage - 1); // Update for current passenger (*0-indexed fn)
            pushPassInfo();
            finishedPages[currentPage - 2] = true;
            sessionStorage.setItem("finished-pages", JSON.stringify(finishedPages));
        }
    } else {
        if (checkStrictReqEmpty() || !validateRequiredOrFilledFields()) {
            disableNextPage();
            finishedPages[currentPage - 2] = false;
        } else {
            enableNextPage();
            finishedPages[currentPage - 2] = true;
        }
    }
}

// Check if all fields are empty (all required for first passsenger/leader)
function checkEmpty() {
    if (pName == "" || pEmail == "" || pPhone == "") return true;
    else return false;
}

// Check if name field is empty (only field required across all passengers)
function checkStrictReqEmpty() {
    return pName == "" ? true : false;
}

// Use regex to validate formatting of all fields
function validateAllFields() {
    return validateName() && /\@/.test(pEmail) && /^\d{10}$/g.test(pPhone);
}

// If email/phone are filled, they should be checked as well, even if not required
function validateRequiredOrFilledFields() {
    let name = validateName();
    let email = true;
    let phone = true;
    if (pEmail !== "") email = /\@/.test(pEmail);
    if (pPhone !== "") phone = /^\d{10}$/g.test(pPhone);
    return name && email && phone;
}

// Validate just name, which is required for all passengers
function validateName() {
    return /[a-zA-Z]+\s+[a-zA-Z]+/.test(pName);
}

// Strings to construct URL variable to pass
const currentPageIndex = "3";
const nextPageIndex = "4";
const prevPageVarName = "prevPage";
var nextButtonPath = "";
var prevButtonPath = "";

// Waits until the page is fully loaded before executing
document.addEventListener("DOMContentLoaded", function () {
    // sends the visit order (index string) to the js file
    visitOrder = readURLData("prevPage");
    // sets the previous page url based on the index at the end of the visit order string
    prevButtonPath =
        indexToPath(visitOrder.slice(-1)) + "?" + prevPageVarName + "=" + visitOrder.slice(0, visitOrder.length - 1);
    // console.log(prevButtonPath);
    setPreviousPage(prevButtonPath);
    // creates the url path for the next button with a variable that stores the visit order
    nextButtonPath = indexToPath(nextPageIndex) + "?" + prevPageVarName + "=" + visitOrder.concat(currentPageIndex);
    setNextPage(nextButtonPath);
});

// On pressing (?) button, toggle help pop-up
function togglePopUp() {
    if (document.getElementById("popup").style.display === "flex") {
        document.getElementById("popup").style.display = "none";
    } else {
        document.getElementById("popup").style.display = "flex";
    }
}

// Display special instructions, required fields for first page
function pageOneDisplay() {
    let emailTag = document.getElementById("email-tag");
    let phoneTag = document.getElementById("phone-tag");
    emailTag.style.display = "block";
    phoneTag.style.display = "block";
    document.getElementById("question").style.display = "block";
    document.getElementById("popup").style.display = "none";
}

// Hide special fields used for page one
function otherPageDisplay() {
    let emailTag = document.getElementById("email-tag");
    let phoneTag = document.getElementById("phone-tag");
    emailTag.style.display = "none";
    phoneTag.style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("popup").style.display = "none";
}

// Check if all pages have been completed
function checkCompletion() {
    let flag = true;
    for (let i = 0; i < numPassengers; i++) flag = flag && finishedPages[i];
    return flag;
}

function validRoute(route, origin, destination, departDate, returnDate) {
    if (
        route.origin.toUpperCase() === origin.toUpperCase() &&
        route.destination.toUpperCase() === destination.toUpperCase() &&
        route.departureInfo.departDate.toUpperCase() === departDate.toUpperCase() &&
        route.returnInfo.departDate.toUpperCase() === returnDate.toUpperCase()
    ) {
        return true;
    }

    return false;
}

function matchRoutes(origin, destination, departDate, returnDate = "") {
    trips = JSON.parse(sessionStorage.getItem("routeList"));

    var returnList = [];
    trips.map((trip) => validRoute(trip, origin, destination, departDate, returnDate) && returnList.push(trip));

    sessionStorage.setItem("selectedTrip", JSON.stringify(returnList));
    return returnList;
}

function disableConfirmBtn() {
    var confirmBtn = document.getElementById("confirm");
    var confirmBtnImg = document.getElementById("confirm-img");
    confirmBtnImg.src = "../Images/Icons/Screens/x circle black.png";
    confirmBtn.disabled = true;
    confirmBtn.className = "confirm-disabled";
    confirmBtn.style.backgroundColor = "#C6C6C6";
}

function enableConfirmBtn() {
    var confirmBtn = document.getElementById("confirm");
    var confirmBtnImg = document.getElementById("confirm-img");
    confirmBtnImg.src = "../Images/Icons/Screens/green next.png";
    confirmBtn.disabled = false;
    confirmBtn.className = "confirm";
    confirmBtn.style.backgroundColor = "#FFFFFF";
}

class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="restartDialogue" class="restartDialogue">
                <div class="restartDialogueContent">
                    <div class="warning_symbol">
                        <img class="warning" src="../Images/Icons/Screens/warning_triangle.png" />
                    </div>
                    <p style="margin-top: 0px;">Are you sure you want to Start Over?</p>
                    <p2>This will erase all information and return you to the welcome screen</p2>
                    <div class="startOverDialogueButtons">
                        <button class="restartDecline" button id="restartDecline">
                            <img class="declineRestart" src="../Images/Icons/Screens/x circle black.png"/>
                            Cancel
                        </button>
                        <button class="restartConfirm" button id="restartConfirm">
                            <img class="confirmRestart" src="../Images/Icons/Screens/confirm red.png" />
                            Yes - Start Over
                        </button>
                    </div>
                </div>
            </div>

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
                    <img class="offset-img" id="confirm-img" src="../Images/Icons/Screens/green next.png" alt="Green checkmark" />
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
    connectedCallback() {
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
        `;
    }
}

class Footer3 extends HTMLElement {
    connectedCallback() {
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
        `;
    }
}

class Footer4 extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="footer">
                <button class="help" id="help">
                    <img class="offset-img" src="../Images/Icons/Screens/help.png" alt="Call icon" />
                    Help
                </button>
            </div>
        `;
    }
}

function collapse_additional_details() {
    var old_info = document.getElementsByClassName("add-details");
    for (var old of old_info) {
        old.className = "add-details-hidden";
    }
}

function handle_trip_item_click(optionNum) {
    var current_top_half = document.getElementById("ds-top-half");
    var current_bottom_half = document.getElementById("ds-bottom-half");
    var radio_button = document.getElementById(`item-input-${optionNum}`);
    var additional_details = document.getElementById(`details-${optionNum}`);
    var map_toggle = document.getElementById(`map-toggle`);
    var map_toggle_text = document.getElementById(`map-toggle-text`);
    var header_text = document.getElementById("ds-header-text");
    var map_toggle_img_l = document.getElementById(`map-toggle-img-l`);
    var map_toggle_img_r = document.getElementById(`map-toggle-img-r`);

    if (current_top_half.className === "ds-top-half") {
        collapse_additional_details();

        if (radio_button.checked) {
            radio_button.checked = false;
            sessionStorage.setItem("selectedOption", "");
            map_toggle.className = "ds-map-btn-hidden";
            disableConfirmBtn();
        } else {
            radio_button.checked = true;
            sessionStorage.setItem("selectedOption", optionNum);
            map_toggle_text.innerText = "HIDE MAP";
            map_toggle_img_l.src = "../Images/Icons/Screens/down-arrow.png";
            map_toggle_img_r.src = "../Images/Icons/Screens/down-arrow.png";
            header_text.className = "ds-header-hidden";
            current_top_half.className = "ds-top-half-collapsed";
            current_bottom_half.className = "ds-bottom-half-visible";
            additional_details.className = "add-details";
            map_toggle.className = "ds-map-btn";
            enableConfirmBtn();
        }
    } else if (radio_button.checked) {
        collapse_additional_details();
        radio_button.checked = false;
        sessionStorage.setItem("selectedOption", "");
        header_text.className = "ds-header";
        map_toggle.className = "ds-map-btn-hidden";
        additional_details.className = "add-details-hidden";
        current_top_half.className = "ds-top-half";
        current_bottom_half.className = "ds-bottom-half";
        disableConfirmBtn();
    } else {
        collapse_additional_details();
        additional_details.className = "add-details";
        map_toggle.className = "ds-map-btn";
        sessionStorage.setItem("selectedOption", optionNum);
        radio_button.checked = true;
        enableConfirmBtn();
    }
}

function handle_map_toggle() {
    let current_top_half = document.getElementById("ds-top-half");
    let current_bottom_half = document.getElementById("ds-bottom-half");
    let map_toggle_img_l = document.getElementById(`map-toggle-img-l`);
    let map_toggle_img_r = document.getElementById(`map-toggle-img-r`);
    let map_toggle_text = document.getElementById(`map-toggle-text`);

    if (current_bottom_half.className === "ds-bottom-half-visible") {
        map_toggle_text.innerText = "SHOW MAP";
        map_toggle_img_l.src = "../Images/Icons/Screens/up-arrow.png";
        map_toggle_img_r.src = "../Images/Icons/Screens/up-arrow.png";
        current_bottom_half.className = "ds-bottom-half";
        current_top_half.className = "ds-top-half-btn";
    } else {
        map_toggle_text.innerText = "HIDE MAP";
        map_toggle_img_l.src = "../Images/Icons/Screens/down-arrow.png";
        map_toggle_img_r.src = "../Images/Icons/Screens/down-arrow.png";
        current_bottom_half.className = "ds-bottom-half-visible";
        current_top_half.className = "ds-top-half-collapsed";
    }
}

class DetailedSearchHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="ds-header" id="ds-header-text">Select a Trip</div>
        `;
    }
}

class MapToggleButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="ds-map-btn-hidden" id="map-toggle" onclick="handle_map_toggle()">
            <img id="map-toggle-img-l" src="../Images/Icons/Screens/down-arrow.png"></img>
            <p id="map-toggle-text">HIDE MAP<p>
            <img id="map-toggle-img-r" src="../Images/Icons/Screens/down-arrow.png"></img>
        </div>
        `;
    }
}

class TripItem extends HTMLElement {
    connectedCallback() {
        let optionNum = this.getAttribute("optionNum");
        this.innerHTML = `
        <div onclick="handle_trip_item_click(${optionNum})" id='ti-${optionNum}'>
            <div class='single-item'>
                <div class="ds-details-container">
                    <p class="ds-details-depart" id='item-info-a'></p>
                    <p class="ds-details-arrive" id='item-info-b'></p>
                    <hr></hr>
                    <p class="ds-details-duration" id='item-info-c'></p>
                </div>
                <hr></hr>
                <div class="ds-cost-container">
                    <hr></hr>
                    <p class="ds-single-cost" id='item-info-e'></p>
                    <p class="ds-cost" id='item-info-d'></p>
                </div>     
                <input id='item-input-${optionNum}' type="radio" name="label" >
            </div>
        </div>
        `;

        var info_a = this.querySelector("#item-info-a");
        var info_b = this.querySelector("#item-info-b");
        var info_c = this.querySelector("#item-info-c");
        var info_d = this.querySelector("#item-info-d");
        var info_e = this.querySelector("#item-info-e");

        var depart = this.getAttribute("departTime");
        var arrive = this.getAttribute("arriveTime");
        var duration = this.getAttribute("duration");
        var cost = this.getAttribute("cost");
        var passengers = this.getAttribute("passengers");

        info_a.textContent = `Depart: ${depart}`;
        info_b.textContent = `Arrive: ${arrive}`;
        info_c.textContent = `Duration: ${duration}`;
        info_d.textContent = `Total: ${currencyFormatter.format(Number(cost) * passengers)}`;
        info_e.textContent = `${passengers}x ${cost}`;
    }
}

function numberToMonth(monthNumber) {
    switch (Number(monthNumber)) {
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Ap";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aug";
        case 9:
            return "Sept";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
        default:
            return "NULL";
    }
}

function Dateify(dateString) {
    const dateArray = dateString.split("/");
    return numberToMonth(dateArray[1]) + " " + dateArray[0] + ", " + dateArray[2];
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

class AdditionalTripInfo extends HTMLElement {
    connectedCallback() {
        var optionNum = this.getAttribute("optionNum");
        var departureDate = this.getAttribute("departureDate");
        var departureTime = this.getAttribute("departureTime");
        var arrivalDate = this.getAttribute("arrivalDate");
        var arrivalTime = this.getAttribute("arrivalTime");
        Dateify(departureDate);
        this.innerHTML = `
        <div class='add-details-hidden' id='details-${optionNum}'>
            <span>Departure Schedule</span>
            <div class="trip-summary">
                <div class='add-details-depart'>
                    <p style="font-weight: 500;">Departure</p>
                    <p>Calgary City Center Station</p>
                    <p>${departureTime}, ${Dateify(departureDate)}</p>
                </div>
                <hr></hr>
                <div class='add-details-arrive'>
                    <p style="font-weight: 500;">Arrival</p>
                    <p>Edmonton International Airport</p>
                    <p>${arrivalTime}, ${Dateify(arrivalDate)}</p>
                </div>
            </div>
            <div style="border-top: 1px solid gray;" class="trip-extra">
                <p>Number of Stops: 3</p>
                <p>15 Seats Available</p>
                <p>Ebus</p>
                <p>Wifi</p>
            </div>
        </div>
        `;
    }
}

class AdditionalRoundTripInfo extends HTMLElement {
    connectedCallback() {
        var optionNum = this.getAttribute("optionNum");
        var departureDate = this.getAttribute("departureDate");
        var departureTime = this.getAttribute("departureTime");
        var arrivalDate = this.getAttribute("arrivalDate");
        var arrivalTime = this.getAttribute("arrivalTime");
        var returnDepartureDate = this.getAttribute("returnDepartureDate");
        var returnDepartureTime = this.getAttribute("returnDepartureTime");
        var returnArrivalDate = this.getAttribute("returnArrivalDate");
        var returnArrivalTime = this.getAttribute("returnArrivalTime");

        this.innerHTML = `
        <div class='add-details-hidden' id='details-${optionNum}'>
            <span>Departure Schedule</span>
            <div class="trip-summary">
                <div class='add-details-depart'>
                    <p style="font-weight: 500;">Departure</p>
                    <p>Calgary City Center Station</p>
                    <p>${departureTime}, ${Dateify(departureDate)}</p>
                </div>
                <hr></hr>
                <div class='add-details-arrive'>
                    <p style="font-weight: 500;">Arrival</p>
                    <p>Edmonton International Airport</p>
                    <p>${arrivalTime}, ${Dateify(arrivalDate)}</p>
                </div>
            </div>
            <span>Return Schedule</span>
            <div class="trip-summary">
                <div class='add-details-depart'>
                    <p style="font-weight: 500;">Departure</p>
                    <p>Calgary City Center Station</p>
                    <p>${returnDepartureTime}, ${Dateify(returnDepartureDate)}</p>
                </div>
                <hr></hr>
                <div class='add-details-arrive'>
                    <p style="font-weight: 500;">Arrival</p>
                    <p>Edmonton International Airport</p>
                    <p>${returnArrivalTime}, ${Dateify(returnArrivalDate)}</p>
                </div>
            </div>
            <div style="border-top: 1px solid gray;" class="trip-extra">
                <p>Number of Stops: 3</p>
                <p>15 Seats Available</p>
                <p>Ebus</p>
                <p>Wifi</p>
            </div>
        </div>
        `;
    }
}

class TripItemContainer extends HTMLElement {
    connectedCallback() {
        var origin = sessionStorage.getItem("origin");
        var destination = sessionStorage.getItem("destination");
        var departureDate = sessionStorage.getItem("departDate");
        var returnDate = sessionStorage.getItem("returnDate");
        var passengers = sessionStorage.getItem("passengers");

        const validTrips = matchRoutes(origin, destination, departureDate, returnDate);
        sessionStorage.setItem("validTrips", JSON.stringify(validTrips));
        var itemNumber = 0;

        validTrips.map((trip) => {
            const wrapper = document.createElement("div");
            wrapper.id = `trip-item-${itemNumber}`;
            if (returnDate === "") {
                wrapper.innerHTML = `
                        <trip-item optionNum="${itemNumber}" departTime="${trip.departureInfo.departTime}" arriveTime="${trip.departureInfo.arriveTime}" duration="5 h 15 m" cost="${trip.cost}" passengers="${passengers}"></trip-item>
                        <trip-additional 
                            optionNum="${itemNumber}"
                            departureDate="${trip.departureInfo.departDate}" 
                            departureTime="${trip.departureInfo.departTime}"
                            arrivalDate="${trip.departureInfo.arriveDate}"
                            arrivalTime="${trip.departureInfo.arriveTime}"
                        ></trip-additional>
                    `;
            } else {
                wrapper.innerHTML = `
                        <trip-item optionNum="${itemNumber}" departTime="${trip.departureInfo.departTime}" arriveTime="${trip.departureInfo.arriveTime}" duration="5 h 15 m" cost="${trip.cost}" passengers="${passengers}"></trip-item>
                        <round-trip-additional 
                            optionNum="${itemNumber}"
                            departureDate="${trip.departureInfo.departDate}" 
                            departureTime="${trip.departureInfo.departTime}"
                            arrivalDate="${trip.departureInfo.arriveDate}"
                            arrivalTime="${trip.departureInfo.arriveTime}"
                            returnDepartureDate="${trip.returnInfo.departDate}"
                            returnDepartureTime="${trip.returnInfo.departTime}"
                            returnArrivalDate="${trip.returnInfo.arriveDate}"
                            returnArrivalTime="${trip.returnInfo.arriveTime}"
                        ></round-trip-additional>
                    `;
            }

            itemNumber++;

            document.getElementById("ds-trip-container").appendChild(wrapper);
        });
    }
}

customElements.define("main-header", Header);
customElements.define("main-footer", Footer);
customElements.define("trip-item", TripItem);
customElements.define("trip-additional", AdditionalTripInfo);
customElements.define("round-trip-additional", AdditionalRoundTripInfo);
customElements.define("trip-item-container", TripItemContainer);
customElements.define("alt-footer", Footer2);
customElements.define("pay-footer", Footer3);
customElements.define("empty-footer", Footer4);
customElements.define("map-toggle", MapToggleButton);
customElements.define("ds-header", DetailedSearchHeader);
////// Navigation Function /////////

function restartButtonClick() {
    const restartButton = document.getElementById("reset");
    restartButton.addEventListener("click", function () {
        document.getElementById("restartDialogue").style.display = "block";
    });
}

function restartConfirmButtonFunc() {
    const yesRestartButton = document.getElementById("restartConfirm");
    yesRestartButton.addEventListener("click", function () {
        window.location.href = "../index.html";
        sessionStorage.clear();
        // window.location.href = indexToPath('0');
    });
}

function restartDeclineButtonFunc() {
    const noRestartButton = document.getElementById("restartDecline");
    noRestartButton.addEventListener("click", function () {
        document.getElementById("restartDialogue").style.display = "none";
    });
}

function callforhelp(){
    const helpButton = document.getElementById("help");
    helpButton.addEventListener("click", function (){
        window.location.href = "../Templates/help.html";
    });
}

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
    const backButton = document.getElementById("back");
    backButton.addEventListener("click", function () {
        window.location.href = previousPage;
    });
}

function nextButtonClick() {
    const nextButton = document.getElementById("confirm");
    nextButton.addEventListener("click", function () {
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
        case "0":
            url = "../index.html";
            break;
        case "1":
            url = "../a1_search_screen/2-new_ticket_search_screen.html";
            break;
        case "2":
            url = "../a2_trip_info/DetailedSearch.html";
            break;
        case "3":
            url = "../a3_passenger_info/passenger_info.html";
            break;
        case "4":
            url = "../a4_seat_selector/seat_selector.html";
            break;
        case "5":
            url = "../a5_summary/summary.html";
            break;
        case "6":
            url = "../a5_summary/pay.html";
            break;
        case "7":
            url = "../a5_summary/finish.html";
            break;
        case "8":
            url = "../b1_ticket_lookup/modify_ticket.html";
            break;
        case "9":
            url = "../b2_modify_stream/b2.1_modify_booking_options.html";
            break;
        case "10":
            url = "../b2_modify_stream/b2.2_modify_tickets_options.html";
            break;
        case "11":
            url = "../b2_modify_stream/b2.3_edit_ticket.html";
            break;
        case "12":
            url = "../b4_change_seats/change_seats.html";
            break;
        case "13":
            url = "../b4_change_seats/confirm_seats.html";
            break;
    }

    return url;
}

// filter function for drop down menus
function filterFunction(input, div, a) {
    var filter = input.value.toUpperCase();

    for (var i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
    div.style.display = "block";
}

// waits for the page to be fully loaded before buttons can be pressed
document.addEventListener("DOMContentLoaded", function () {
    backButtonClick();
    nextButtonClick();
    restartConfirmButtonFunc();
    restartDeclineButtonFunc();
    restartButtonClick();
    callforhelp();
});

// list of the seat numbers in the order its read in the seat selector
var seat_order = [
    "A1",
    "B1",
    "A2",
    "B2",
    "A3",
    "B3",
    "A4",
    "B4",
    "A5",
    "B5",
    "A6",
    "B6",
    "A7",
    "B7",
    "A8",
    "B8",
    "C1",
    "D1",
    "C2",
    "D2",
    "C3",
    "D3",
    "C4",
    "D4",
    "C5",
    "D5",
    "C6",
    "D6",
    "C7",
    "D7",
    "C8",
    "D8",
];

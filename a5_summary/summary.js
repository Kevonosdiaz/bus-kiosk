function numberToMonth(monthNumber) {
    switch (Number(monthNumber)) {
        case 1:
            return "Jan"
        case 2:
            return "Feb"
        case 3:
            return "Mar"
        case 4:
            return "Ap"
        case 5:
            return "May"
        case 6:
            return "Jun"
        case 7:
            return "Jul"
        case 8:
            return "Aug"
        case 9:
            return "Sept"
        case 10:
            return "Oct"
        case 11:
            return "Nov"
        case 12:
            return "Dec"
        default:
            return "NULL"
    }
}


function Dateify(dateString) {
    const dateArray = dateString.split('/')
    return numberToMonth(dateArray[1]) + " " + dateArray[0] + ", " + dateArray[2]
}

class SummaryInfo extends HTMLElement {
    connectedCallback() {
        var isOneWay = sessionStorage.getItem('isRoundTrip') === 'false'
        var selectedTripArray = JSON.parse(sessionStorage.getItem('selectedTrip'))
        var selectedOption = sessionStorage.getItem('selectedOption')
        var selectedTrip = selectedTripArray[Number(selectedOption)]
        var passengers = Number(sessionStorage.getItem('passengers'))
        var passengerInfo = JSON.parse(sessionStorage.getItem('pInfo'))
        const currencyFormatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });

        const wrapper = document.createElement('div')
        wrapper.className = 'summary-info-box'

        if (isOneWay) {
            wrapper.innerHTML = `
            <p class="title_sum">Trip Summary</p>
            <ul class="main_list2">
                <p class="grid_item1">Date of Trip</p>
                <p class="grid_item">${Dateify(selectedTrip.departureInfo.departDate)}</p>
                <p class="grid_item1">Trip Type</p>
                <p class="grid_item">One Way Trip</p>
                <p class="grid_item1">Pick-Up Location</p>
                <p class="grid_item">${selectedTrip.departureInfo.pickUpLocation}</p>
                <p class="grid_item1">Departure Time</p>
                <p class="grid_item">${selectedTrip.departureInfo.departTime}</p>
                <p class="grid_item1">Drop-Off Location</p>
                <p class="grid_item">${selectedTrip.departureInfo.dropOffLocation}</p>
                <p class="grid_item1">Est. Arrival Time</p>
                <p class="grid_item">${selectedTrip.departureInfo.arriveTime}</p>
                <p class="grid_item1">Trip Duration</p>
                <p class="grid_item">${selectedTrip.departureInfo.duration}</p>
                <p class="grid_item1">Number of Stops</p>
                <p class="grid_item">${selectedTrip.departureInfo.numberOfStops} Stop</p>
            </ul>
            `
        } else {
            wrapper.innerHTML = `
            <p class="title_sum">Departing Trip Summary</p>
            <ul class="main_list2">
                <p class="grid_item1">Date of Trip</p>
                <p class="grid_item">${Dateify(selectedTrip.departureInfo.departDate)}</p>
                <p class="grid_item1">Trip Type</p>
                <p class="grid_item">Round Trip - Departure</p>
                <p class="grid_item1">Pick-Up Location</p>
                <p class="grid_item">${selectedTrip.departureInfo.pickUpLocation}</p>
                <p class="grid_item1">Departure Time</p>
                <p class="grid_item">${selectedTrip.departureInfo.departTime}</p>
                <p class="grid_item1">Drop-Off Location</p>
                <p class="grid_item">${selectedTrip.departureInfo.dropOffLocation}</p>
                <p class="grid_item1">Est. Arrival Time</p>
                <p class="grid_item">${selectedTrip.departureInfo.arriveTime}</p>
                <p class="grid_item1">Trip Duration</p>
                <p class="grid_item">${selectedTrip.departureInfo.duration}</p>
                <p class="grid_item1">Number of Stops</p>
                <p class="grid_item">${selectedTrip.departureInfo.numberOfStops} Stop</p>
            </ul>
            <p class="title_sum">Return Trip Summary</p>
            <ul class="main_list2">
                <p class="grid_item1">Date of Trip</p>
                <p class="grid_item">${Dateify(selectedTrip.returnInfo.departDate)}</p>
                <p class="grid_item1">Trip Type</p>
                <p class="grid_item">Round Trip - Return</p>
                <p class="grid_item1">Pick-Up Location</p>
                <p class="grid_item">${selectedTrip.returnInfo.pickUpLocation}</p>
                <p class="grid_item1">Departure Time</p>
                <p class="grid_item">${selectedTrip.returnInfo.departTime}</p>
                <p class="grid_item1">Drop-Off Location</p>
                <p class="grid_item">${selectedTrip.returnInfo.dropOffLocation}</p>
                <p class="grid_item1">Est. Arrival Time</p>
                <p class="grid_item">${selectedTrip.returnInfo.arriveTime}</p>
                <p class="grid_item1">Trip Duration</p>
                <p class="grid_item">${selectedTrip.returnInfo.duration}</p>
                <p class="grid_item1">Number of Stops</p>
                <p class="grid_item">${selectedTrip.returnInfo.numberOfStops} Stop</p>
            </ul>
            `
        }
        var extraBags = 0
        var bikeStorage = 0
        var animalTransport = 0
        var skiSnow = 0

        for (let i = 0; i < passengers; i++) {
            const passenger = document.createElement('div')
            passenger.innerHTML = `
            <p class="title_sum">Passenger ${i+1} Details</p>
            <ul class="main_list2">
                <p class="grid_item1">Name</p>
                <p class="grid_item">${passengerInfo[i].firstName + " " + passengerInfo[i].lastName}</p>
                <p class="grid_item1">Phone</p>
                <p class="grid_item">${passengerInfo[i].phone}</p>
                <p class="grid_item1">Email</p>
                <p class="grid_item">${passengerInfo[i].email}</p>
            </ul>
            `
            wrapper.appendChild(passenger)

            extraBags += Number(passengerInfo[i].extraBags)
            bikeStorage += Number(passengerInfo[i].bike)
            animalTransport += Number(passengerInfo[i].animalTransport)
            skiSnow += Number(passengerInfo[i].skiSnow)
        }

        const costBreakdown = document.createElement('div')
        costBreakdown.innerHTML = `
        <p class="title_sum">Cost Breakdown</p>
            <ul class="main_list2" id="total-cost-breakdown-list">
                <p class="grid_item1">Ticket x${passengers}</p>
                <p class="grid_item">+${currencyFormatter.format(passengers*Number(selectedTrip.cost))}</p>

            </ul>
        `

        if (extraBags > 0) {
            let tempText = document.createElement('p')
            tempText.className = "grid_item1"
            tempText.textContent = `Extra Bag(s) x${extraBags}`
            let tempCost = document.createElement('p')
            tempCost.className = "grid_item"
            tempCost.textContent = `+${currencyFormatter.format(extraBags*10)}`
            costBreakdown.querySelector('.main_list2').appendChild(tempText)
            costBreakdown.querySelector('.main_list2').appendChild(tempCost)
        }

        if (bikeStorage > 0) {
            let tempText = document.createElement('p')
            tempText.className = "grid_item1"
            tempText.textContent = `Bike Storage x${bikeStorage}`
            let tempCost = document.createElement('p')
            tempCost.className = "grid_item"
            tempCost.textContent = `+${currencyFormatter.format(bikeStorage*15)}`
            costBreakdown.querySelector('.main_list2').appendChild(tempText)
            costBreakdown.querySelector('.main_list2').appendChild(tempCost)
        }

        if (animalTransport > 0) {
            let tempText = document.createElement('p')
            tempText.className = "grid_item1"
            tempText.textContent = `Animal Transport x${animalTransport}`
            let tempCost = document.createElement('p')
            tempCost.className = "grid_item"
            tempCost.textContent = `+${currencyFormatter.format(animalTransport*15)}`
            costBreakdown.querySelector('.main_list2').appendChild(tempText)
            costBreakdown.querySelector('.main_list2').appendChild(tempCost)
        }

        if (skiSnow > 0) {
            let tempText = document.createElement('p')
            tempText.className = "grid_item1"
            tempText.textContent = `Ski/Snowboard Storage x${skiSnow}`
            let tempCost = document.createElement('p')
            tempCost.className = "grid_item"
            tempCost.textContent = `+${currencyFormatter.format(skiSnow*10)}`
            costBreakdown.querySelector('.main_list2').appendChild(tempText)
            costBreakdown.querySelector('.main_list2').appendChild(tempCost)
        }

        var total = Number(selectedTrip.cost) + (extraBags*10) + (bikeStorage*15) + (animalTransport*15) + (skiSnow*10)

        let tempText = document.createElement('p')
        tempText.className = "grid_item1"
        tempText.textContent = `Total`
        let tempCost = document.createElement('p')
        tempCost.className = "grid_item"
        tempCost.textContent = `${currencyFormatter.format(total)}`
        costBreakdown.querySelector('.main_list2').appendChild(tempText)
        costBreakdown.querySelector('.main_list2').appendChild(tempCost)

        wrapper.appendChild(costBreakdown)
        
        const totalCost = document.createElement('div')
        totalCost.innerHTML = `
        </div>
            <div class="cost_box">
                <p class="total_text">Total: ${currencyFormatter.format(total)}</p>
            </div>
        </div>
        `
        document.getElementById('summary-outer-box').appendChild(wrapper)
        document.getElementById('summary-outer-div').appendChild(totalCost)
    }
}

customElements.define('summary-info', SummaryInfo)
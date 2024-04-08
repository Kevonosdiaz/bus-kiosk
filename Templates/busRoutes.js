function BusRoute(
    origin, 
    destination,
    cost,
    departureDate, 
    departureTime,
    arrivalDate,
    arrivalTime,
    duration,
    pickUpLocation,
    dropOffLocation,
    returnDepartureDate = "", 
    returnDepartureTime = "",
    returnArrivalDate = "",
    returnArrivalTime = "",
    returnDuration = "",
    returnPickUpLocation = "",
    returnDropOffLocation = "",
) {
    this.origin = origin;
    this.destination = destination;
    this.cost = cost

    this.departureInfo = {
        departDate: departureDate, 
        departTime: departureTime, 
        arriveDate: arrivalDate,
        arriveTime: arrivalTime,
        duration: duration,
        pickUpLocation: pickUpLocation,
        dropOffLocation: dropOffLocation
    };

    this.returnInfo = {
        departDate: returnDepartureDate, 
        departTime: returnDepartureTime, 
        arriveDate: returnArrivalDate,
        arriveTime: returnArrivalTime,
        duration: returnDuration,
        pickUpLocation: returnPickUpLocation,
        dropOffLocation: returnDropOffLocation,
    }

}

function createBusRouteList() {
    // create trip list with hardcoded values
    const routeList = [
        // round trips include return info
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB",
            "185.50",
            "1/12/2024", 
            "9:15 AM", 
            "1/12/2024", 
            "2:45 PM", 
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station",
            "2/12/2024", 
            "9:15 AM", 
            "2/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Edmonton SE Station",
            "Calgary International Airport",
        ),
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB",
            "185.50",
            "1/12/2024", 
            "9:15 AM", 
            "1/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station",
            "2/12/2024", 
            "9:15 AM", 
            "2/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Edmonton SE Station",
            "Calgary International Airport",
        ),
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB",
            "185.50",
            "1/12/2024", 
            "9:15 AM", 
            "1/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station",
            "2/12/2024", 
            "9:15 AM", 
            "2/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Edmonton SE Station",
            "Calgary International Airport",
        ),
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB",
            "185.50",
            "1/12/2024", 
            "9:15 AM", 
            "1/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station",
            "2/12/2024", 
            "9:15 AM", 
            "2/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Edmonton SE Station",
            "Calgary International Airport",
        ),
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB",
            "185.50",
            "1/12/2024", 
            "9:15 AM", 
            "1/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station",
            "2/12/2024", 
            "9:15 AM", 
            "2/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Edmonton SE Station",
            "Calgary International Airport",
        ),
        // one way trips include only original departure info
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB", 
            "112.50",
            "1/12/2024", 
            "9:15 AM", 
            "1/12/2024", 
            "2:45 PM",
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station"
        ),
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB",
            "112.50",
            "1/12/2024", 
            "10:15 AM", 
            "1/12/2024", 
            "3:45 PM",
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station"
        ),
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB",
            "112.50",
            "1/12/2024", 
            "11:15 AM", 
            "1/12/2024", 
            "4:45 PM",
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station"
        ),
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB",
            "112.50",
            "1/12/2024", 
            "12:15 PM", 
            "1/12/2024", 
            "5:45 PM",
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station"
        ),
        new BusRoute(
            "Calgary, AB", 
            "Edmonton, AB",
            "112.50",
            "1/12/2024", 
            "1:15 PM", 
            "1/12/2024", 
            "6:45 PM",
            "5h 30 min",
            "Calgary International Airport",
            "Edmonton SE Station"
        ),
    ];

    sessionStorage.setItem("routeList", JSON.stringify(routeList))
}
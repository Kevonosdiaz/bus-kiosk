## CPSC481W24 Project - Bus Ticketing Kiosk

### Group T02-5

-   Note: Development/testing was performed on Chromium-based browsers (ex. Google Chrome, Edge, Brave, etc.), issues may arise when using Firefox

## New Ticket Booking Process
### 1. Landing Page
![](./Images/landing_page.png?=x500)  
Navigate to the [landing page](https://kevonosdiaz.github.io/bus-kiosk/index.html) and Click 'New Booking'  


### 2. Search Page
One Way Trip             |  Round Trip
:-------------------------:|:-------------------------:
![](./Images/trip_search.png?=x500) | ![](./Images/trip_search_round.png?=x50)  
Empty fields with greyed-out 'Next' button | Completed fields with green 'Next' button 

  
To search for a trip, enter the following information:
   - Origin: Calgary, AB
   - Destination: Edmonton, AB
   - Departure Date: 1/12/2024
   - (Optionally) Return Date: 2/12/2024

  
If the optional return date is entered, a list of round trips will be displayed on the next page. The red asterix will also remain visible until correctly formatted text is entered as shown above.
When all fields are filled in correctly, the 'Next' button will turn green and become clickable.  

### 3. Detailed Search Page
Detailed Search Page     |  Trip Selected With Map         |  Trip Selected No Map
:-------------------------:|:-------------------------:|:-------------------------:
![](./Images/detailed_search.png?=x500) | ![](./Images/detailed_search_selected_map.png?=x50)  | ![](./Images/detailed_search_selected_nomap.png?=x50)
'Next' button is inaccessible until trip is selected | Trip selected with map shown | map hidden
  
Once an appropriate Trip is selected, click 'Next'  

### 4. Passenger Info Screen
One Way Trip             |  Round Trip
:-------------------------:|:-------------------------:
![](./Images/passenger_info.png?=x500) | ![](./Images/passenger_info_complete.png?=x50)  
Empty fields with greyed-out 'Next' button | Completed fields with green 'Next' button  

In order to proceed to the next page, you must enter the passenger information in the following format:  
   - Name: firstName lastName
   - Email: email@example.com
   - Phone: 0123456789

    
### 5. Seat Selection
![](./Images/seat_selection.png?=x500)  

The seat selection page allows the user to select seat for each passenger requested. Once all requested seats are selected, the 'Next' button will become enabled.  

### 6. Summary Screen
![](./Images/summary_page.png?=x500)  

The summary screen shows a list of the selected trip's information to the user, allowing all additional options, their costs as well as the tickets and their costs.
### 7. Payment
![](./Images/pay.png?=x500)  

Progression through the payment screen is automatic, and meant to simulate a successful payment process. After 5 seconds the final screen will be loaded.  
### 8. Final Screen
![](./Images/final.png?=x500)  

This is the final landing page for the application, progression from here back to the starting landing page is also automatic and will happen after 5 seconds.  

## Modify Booking Process
### 1. Enter Passenger and Booking Information
Empty Fields            |  Filled in Fields
:-------------------------:|:-------------------------:
![](./Images/ticket_lookup_empty.png?=x500) | ![](./Images/ticket_lookup_filled.png?=x50)  
Click to Verify is greyed out | Turns blue once information of correct format is entered 

We have created a preset booking that can be modifed. Please use the following details to proceed:  
   - Name: Gus Ryder
   - Email: gus.ryder@bmail.com
   - Phone: 1112223333
   - Booking ID: BUS123

### 2. Enter Verification Code
![](./Images/ticket_lookup_verify.png?=x500)
Verification codes are 6 digits long. Please use the following code to proceed:
   - Code: 737373

### 3. Choose a Booking Option
Empty Fields            |  Filled in Fields
:-------------------------:|:-------------------------:
![](./Images/booking_options.png?=x500) | ![](./Images/booking_options_popup.png?=x50)
You can either modify individual tickets on your booking, change your seating arrangement, or cancel the entire booking. | Cancelling a booking will redirect you to an ending screen indicating that you will receive a refund.


## Edit Tickets
:-------------------------:|:-------------------------:|:-------------------------:
![](./Images/edit_tickets_base.png?=x500) | ![](./Images/edit_tickets_details.png?=x50) | ![](./Images/edit_details_select.png?=x50)
You can select and either cancel or modify tickets on this screen.

## Cancel Tickets
Confirmation Popup           |  Updated List and Total
:-------------------------:|:-------------------------:
![](./Images/edit_tickets_cancel.png?=x500) | ![](./Images/edit_tickets_cancel2.png?=x50)
A popup opens when you try to cancel a ticket. If you accept, the ticket is removed from the list and the new total is adjusted.

## Modify Tickets
![](./Images/tickets_modify.png?=x500)
When you modify a ticket, you can add or remove additional services, which will be reflected in the previous screen if you click the save button.
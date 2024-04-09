/* document.addEventListener('change', (evt) => {
    // evt.currentTarget is the .radiogroup element
    // and we search for all elements with the active class
    evt.currentTarget
      .querySelectorAll('.active')
      .forEach(element => {
        // remove the active class from those elements
        element.classList.remove('active')
      })
    
    
    // in this simple case evt.target is the radio button 
    // that became active for more complex event delegation you
    // need to check what evt.target is.
    // search for the ascendant with the class posicao
    // and add the active class to it
    evt.target
      .closest('.sum_box')
      .classList.add('active');
  }, true);
 */

const radios = document.querySelectorAll('input[type="radio"]');
radios.forEach(radio => {
  radio.onclick = () => {
    var actives = document.querySelectorAll('.active');
    actives.forEach(act => { act.classList.remove('active')})
    toggleButtons()
    radio.closest('.sum_box').classList.add('active');
    
    for (var i = 0; i < tickets.length; i++) {
      if (String(radio.value) == tickets[i][tnum_i])  {
        sessionStorage.setItem('ticket_to_mod', JSON.stringify(i))
      }
    }
  }

})

const tnum_i = 0 // Ticket Number index
const name_i = 1 // Passenger Name index
const total_i = 2 // Total ticket cost index (ticket + additional)
const tcost_i = 3 // Ticket cost  index
const adds_i = 4 // Additional Services index
const bag_i = 0 // Extra Bags index
const ani_i = 1  // Animal Storage index
const bic_i = 2 // Bicycle Transport index
const ski_i = 3 // Ski/Snowboard index

const add_costs  = [10.00, 15.00, 15.00, 10.00]
var total = 0.0
var old_total = 0.0
var ticket1 = ["1", "Gus Ryder", 0.0, 29.99, [0.0, 0.0, 1.0, 0.0]]
var ticket2 = ["2", "Mo Torbus", 0.0, 29.99, [1.0, 1.0, 0.0, 0.0]]
var ticket3 = ["3", "Carrie Awning", 0.0, 29.99, [1.0, 0.0, 0.0, 1.0]]

if (JSON.parse(sessionStorage.getItem('m-tick-list')) != null) {
  var tickets = JSON.parse(sessionStorage.getItem('m-tick-list'))
} else {
  sessionStorage.setItem('m-tick-list', JSON.stringify([ticket1, ticket2, ticket3]))
  var tickets = [ticket1, ticket2, ticket3]
  calcTotal()
  old_total = total
  sessionStorage.setItem('m-old-total', JSON.stringify(old_total))
}

function calcTotal() {
  total = 0.0
  for (var i = 0; i < tickets.length; i++) {
    var sum = tickets[i][tcost_i];
    for (var j = 0; j < add_costs.length; j++) {
      sum += tickets[i][adds_i][j] * add_costs[j];
    }
    tickets[i][total_i] = sum;
    total += tickets[i][total_i];
    tickets[i][total_i] = tickets[i][total_i].toFixed(2);
  }
  sessionStorage.setItem('m-tick-list', JSON.stringify(tickets));
  total = total.toFixed(2)
}

function updateTotal() {
  calcTotal();
  document.getElementById('new_total').innerText = String(total);
}

function isRadioSelected() {
  var rbutton = document.querySelector('input[type="radio"]:checked');
  if (rbutton != null) {
    return true
  } else {
    return false
  }
}

const cancelAcceptbtn = document.getElementById("cancelAccept");
cancelAcceptbtn.onclick = function () {
  if (isRadioSelected()) {
    var rbutton = document.querySelector('input[type="radio"]:checked');
    document.getElementById('cancelConfirm').style.display = 'none';
    var ticketnum = String(rbutton.value);
    for (var i = 0; i < tickets.length; i++) {
      if (ticketnum == tickets[i][tnum_i])  {
        tickets.splice(i, 1);
      }
    }
    switch (ticketnum){
      case "1":
        document.getElementById('ticket1').style.display = "none";
        break;
      case "2":
        document.getElementById('ticket2').style.display = "none";
        break;
      case "3":
        document.getElementById('ticket3').style.display = "none";
        break;
    }
    
    rbutton.checked = false;
    toggleButtons()
    updateTotal()
  }
}

function toggleButtons() {
  if (isRadioSelected()) {
    cancelTicketbtn.classList.remove('disabled');
    modifyTicketbtn.classList.remove('disabled');
  } else {
    cancelTicketbtn.classList.add('disabled');
    modifyTicketbtn.classList.add('disabled');
  }
}

function updateSummmary(tcost, adds) {
  var summary_string = "";
  summary_string = summary_string + "Ticket Cost - $"+String(tcost)+"\n"
  if (adds[bag_i] > 0) {
    summary_string = summary_string + String(adds[bag_i])+"x Extra Bags - $"+String(adds[bag_i] * add_costs[bag_i])+"\n";
  }
  if (adds[bic_i] > 0) {
    summary_string = summary_string + String(adds[bic_i])+"x Bicycle Storage - $"+String(adds[bic_i] * add_costs[bic_i])+"\n";
  }
  if (adds[ani_i] > 0) {
    summary_string = summary_string + String(adds[ani_i])+"x Animal Transport - $"+String(adds[ani_i] * add_costs[ani_i])+"\n";
  }
  if (adds[ski_i] > 0) {
    summary_string = summary_string + String(adds[ski_i])+"x Ski/Snowboard - $"+String(adds[ski_i] * add_costs[ski_i])+"\n";
  }

  return summary_string
}

function updateTickets() {
  var data = JSON.parse(sessionStorage.getItem('m-tick-list'));
  data.forEach(t => {
    switch (t[tnum_i]) {
      case "1":
        document.getElementById('tick1_total').innerText = "Cost: $"+String(t[total_i]);
        document.getElementById('t1_sum').innerText = updateSummmary(t[tcost_i], t[adds_i]);  
        break;
      case "2":
        document.getElementById('tick2_total').innerText = "Cost: $"+String(t[total_i]);
        document.getElementById('t2_sum').innerText = updateSummmary(t[tcost_i], t[adds_i]);
        break;
      case "3":
        document.getElementById('tick3_total').innerText = "Cost: $"+String(t[total_i]);
        document.getElementById('t3_sum').innerText = updateSummmary(t[tcost_i], t[adds_i]);
        break;
    }
  })
}

const cancelTicketbtn = document.getElementById("cancelTicketLabel");
cancelTicketbtn.onclick = function(){
  if (isRadioSelected())
    document.getElementById('cancelConfirm').style.display = 'block';
}

const modifyTicketbtn = document.getElementById("modifyTicketLabel");
modifyTicketbtn.onclick = function (){
  if (isRadioSelected())
    document.querySelector('input[type="radio"]:checked').checked = false;
    window.location.href = "b2.3_edit_ticket.html";
}

toggleButtons()
calcTotal()
updateTotal()
updateTickets()
document.getElementById('old_total').innerText = JSON.parse(sessionStorage.getItem('m-old-total'));
sessionStorage.setItem("m-ticket1", JSON.stringify(ticket1))
sessionStorage.setItem("m-ticket2", JSON.stringify(ticket1))
sessionStorage.setItem("m-ticket3", JSON.stringify(ticket1))
sessionStorage.setItem("m-total", total)
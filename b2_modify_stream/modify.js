document.addEventListener('change', (evt) => {
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

const tnum_i = 0
const name_i = 1
const total_i = 2
const tcost_i = 3
const adds_i = 4
const bag_i = 0
const bic_i = 1
const ani_i = 2
const ski_i = 3

const add_costs  = [10.00, 15.00, 15.00, 10.00]
var total = 0.0

var ticket1 = ["1", "Gus Ryder", 0.0, 29.99, [0.0, 0.0, 1.0, 0.0]]
var ticket2 = ["2", "Mo Torbus", 0.0, 29.99, [1.0, 1.0,  0.0, 0.0]]
var ticket3 = ["3", "Carrie Awning", 0.0, 29.99, [1.0, 0.0, 0.0, 1.0]]

var tickets = [ticket1, ticket2, ticket3]

function calcTotal() {
  total = 0.0
  for (var i = 0; i < tickets.length; i++) {
    total += tickets[i][tcost_i];
    var sum = 0.0;
    for (var j = 0; j < add_costs.length; j++) {
      sum += tickets[i][adds_i][j] * add_costs[j];
    }
    tickets[i][total_i] = sum;
    total += tickets[i][total_i];
  }
  total = total.toFixed(2);
}

function updateText() {
  calcTotal();
  document.getElementById('new_total').innerText = String(total);
}

const cancelBtn = document.getElementById('cancelTicketLabel')
cancelBtn.onclick = function () {
  var ticketnum = String(document.querySelector('input[type="radio"]:checked').value);
  for (var i = 0; i < tickets.length; i++) {
    if (ticketnum == tickets[i][tnum_i])  {
      tickets.splice(i, 1);
      console.log("found")
    }
  }
  switch (ticketnum){
    case "1":
      console.log("bye")
      document.getElementById('ticket1').style.display = "none";
      break;
    case "2":
      document.getElementById('ticket2').style.display = "none";
      break;
    case "3":
      document.getElementById('ticket3').style.display = "none";
      break;
  }
    
  console.log(tickets)
  updateText()
}

updateText()
sessionStorage.setItem("m-ticket1", JSON.stringify(ticket1))
sessionStorage.setItem("m-ticket2", JSON.stringify(ticket1))
sessionStorage.setItem("m-ticket3", JSON.stringify(ticket1))
sessionStorage.setItem("m-total", total)
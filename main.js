"use strict";

const loginUsr = document.getElementById("login--1");
const newTicket = document.getElementById("new--ticket");
const alertTrigger = document.getElementById("liveAlertBtn");
const ticketNumDisplay = document.getElementById("ticket--Num");
const summaryText = document.getElementById("summary-text");
const submitOpenTicket = document.getElementById("submit-open-ticket")
const siteNumber = document.getElementById('site-select')
const currentStatus = document.getElementById('current-status')
const datePicker = document.getElementById('datetimepicker')

console.log(datePicker);
if (submitOpenTicket) {
  submitOpenTicket.addEventListener('click', function () {
    summaryText.textContent = `Site # - ${siteNumber.value} ||
    Current Status - ${currentStatus.value} ||
    Time Reported - ${datePicker.value} `
    console.log(datePicker.value);
    
  })
}
// let allTickets = [14, 15];
// let ticketNumber = allTickets[allTickets.length - 1] + 1;

// //For the submit button on te NewTicket Page
// if (alertTrigger) {
//   const alert = (message, type) => {
//     const wrapper = document.createElement("div");
//     wrapper.innerHTML = [
//       `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//       `   <div>${message}</div>`,
//       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//       "</div>",
//     ].join("");

//     submitTicket.append(wrapper);
//   };

//   alertTrigger.addEventListener(
//     "click",
//     () => {
//       alert("Issue Ticket Submitted!", "success");
//       console.log(ticketNumber);
//       allTickets.push(ticketNumber);
//       console.log(ticketNumber);
//       console.log(allTickets);
//     },
//     { once: true }
//   );
// }

//for the Login Button on the first page
if (loginUsr) {
  loginUsr.addEventListener("click", function () {
    console.log("login event");

    location.href = "dashboard.html";
  });
}

// ticketNumDisplay.textContent = `Issue Ticket Number #${ticketNumber}`;



//Figure out how to add number to alltickets array dynamically possibly by setting the ticket number to be th elast entry in te array

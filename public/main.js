"use strict";
// const navDashboard = document.getElementById("nav-dashboard")
// const navNewTicket = document.getElementById('nav-new-ticket')
// const navViewTickets = document.getElementById('nav-view-ticket')
// const navClosedTickets = document.getElementById('nav-closed-tickets')
const loginUsr = document.getElementById("login--1");
const newTicket = document.getElementById("new--ticket");
const alertTrigger = document.getElementById("liveAlertBtn");
const ticketNumDisplay = document.getElementById("ticket-Num");
const summaryText = document.getElementById("summary-text");
const submitOpenTicket = document.getElementById("submit-open-ticket");
const siteNumber = document.getElementById("site-select");
const currentStatus = document.getElementById("current-status");
const timeReported = document.getElementById("timeselector");
const newTicketSubmit = document.getElementById("new-ticket-submit")
const navItems = document.getElementsByClassName('nav-link')
const closeModal = document.getElementById('close-modal')
const newTicketForm = document.getElementById('new-ticket-form')

if (newTicketForm) {
  getData()
      async function getData(){
          const response = await fetch('/api')
          const data = await response.json()
          ticketNumDisplay.textContent = ` Ticket Number ${data.length}`
          
      }

}


if (submitOpenTicket) {
  submitOpenTicket.addEventListener("click", function () {
    

    newTicketSubmit.disabled = false;
    // newTicketForm.reset


    summaryText.textContent = `Site # - ${siteNumber.value} ||
    Current Status - ${currentStatus.value} ||
    Time Reported - ${timeReported.value} `;
    let txtIgnore = ticketNumDisplay.textContent.split(" ");
    let ticketNumber = txtIgnore[3]
    let site = siteNumber.value;
    let siteStatus = currentStatus.value;
    let date = timeReported.value;
    let ticketStatus = 'Open'   
    let data = { site, siteStatus, date, ticketStatus, ticketNumber };

    //For hitting the Submit button after Info is displayed to User

    if (newTicketSubmit){
      newTicketSubmit.addEventListener("click", function(){
        newTicketSubmit.disabled = true;
        newTicketSubmit.textContent = "Report Submitted"
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
        fetch("/api", options)
          .then((response) => response.json())
          .then((data) => console.log(data));

    
      })
      
    } if (closeModal) {
      closeModal.addEventListener("click", function(){
        window.location.reload();

      })
      
    }
  });
}

//for the Login Button on the first page
if (loginUsr) {
  loginUsr.addEventListener("click", function () {
    console.log("login event");

    location.href = "dashboard.html";
  });
}

// ticketNumDisplay.textContent = `Issue Ticket Number #${ticketNumber}`;

//Figure out how to add number to alltickets array dynamically possibly by setting the ticket number to be the last entry in te array

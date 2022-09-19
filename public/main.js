"use strict";
// const navDashboard = document.getElementById("nav-dashboard")
// const navNewTicket = document.getElementById('nav-new-ticket')
// const navViewTickets = document.getElementById('nav-view-ticket')
// const navClosedTickets = document.getElementById('nav-closed-tickets')

// Selectors for newticket.html page
const loginUsr = document.getElementById("login--1");
const newTicket = document.getElementById("new--ticket");
const alertTrigger = document.getElementById("liveAlertBtn");
const ticketNumDisplay = document.getElementById("ticket-Num");
const summaryText = document.getElementById("summary-text");
const submitOpenTicket = document.getElementById("submit-open-ticket");
const siteNumber = document.getElementById("site-select");
const currentStatus = document.getElementById("current-status");
const timeReported = document.getElementById("timeselector");
const newTicketSubmit = document.getElementById("new-ticket-submit");
const navItems = document.getElementsByClassName("nav-link");
const closeModal = document.getElementById("close-modal");
const newTicketForm = document.getElementById("new-ticket-form");
const firstModal = document.getElementById("staticBackdrop");
//Selectors for opentickets.html page

const firstOpenTicket = document.getElementById("first-open-ticket");
const firstCloseTicket = document.getElementById("first-close-ticket");
const openTicket = document.getElementById("open-tickets");
const closedTicket = document.getElementById("closed-tickets");
const pillOpen = document.getElementById("open-pill");
const pillClose = document.getElementById("close-pill");
const inker = document.createElement("a");
inker.className = "dropdown-item";
const listItem = document.createElement("li");
const newListItem = listItem.appendChild(inker);
const ticketStatusForm = document.getElementById("ticket-status-form");
function insertIds(arr) {
  arr.forEach(function (i, index) {
    newListItem.textContent = `Ticket Id ${i}`;
    console.log(`id number ${i}`);
  });
}

//Selectors for OpenTicket modal window -ot
const newTicketUpdate = document.getElementById('new-ticket-update')
const newTicketClose = document.getElementById('new-ticket-close')
const secondModal = document.getElementById("staticBackdrop2");
const siteSelectOT = document.getElementById("site-select-ot");
const ticketNumDisplayOT = document.getElementById("ticket-num-ot");
const siteStatusOT = document.getElementById("current-status-ot");
const timeReportedOT = document.getElementById("time-reported-ot");
const downtimeReasons = document.getElementById("downtime-reasons")
const reasonServer = document.getElementById("reason-server")
const reasonComms = document.getElementById("reason-comms")
const reasonPedastal = document.getElementById("reason-pedastal")
const reasonElectrical = document.getElementById("reason-electrical")
const reasonSoftware = document.getElementById("reason-software")
const reasonOther = document.getElementById("reason-other")

// const ticketNumDisplayOT = document.getElementById("ticket-Num-ot");

if (ticketStatusForm) {
  getData();
  async function getData() {
    const response = await fetch("/api");
    const data = await response.json();
    var numOpen = 0;
    var numClose = 0;
    const otickets = [];
    // otickets.sort((a, b) => a - b);
    const ctickets = [];
    ctickets.sort((a, b) => a - b);

    for (var item of data) {
      // const firstOpenTicket = document.getElementById("first-open-ticket");
      // const firstCloseTicket = document.getElementById("first-close-ticket");
      const openTicket = document.getElementById("open-tickets");
      const closedTicket = document.getElementById("closed-tickets");
      const pillOpen = document.getElementById("open-pill");
      const pillClose = document.getElementById("close-pill");
      const inker = document.createElement("a");
      inker.className = "dropdown-item";
      const listItem = document.createElement("li");
      const newListItem = listItem.appendChild(inker);
      const itemSite = item.site;
      const itemStatus = item.siteStatus;
      const itemReportTime = item.date;

      function insertIds(arr) {
        arr.forEach(function (item, index) {
          newListItem.innerHTML = `Ticket Id ${item}`;
          newListItem.id = `dropdown-id-${item}`;
          newListItem.type = "button";
          newListItem.setAttribute("data-bs-toggle", "modal");
          newListItem.setAttribute("data-bs-target", "#staticBackdrop2");
          newListItem.addEventListener("click", function () {
            ticketNumDisplayOT.textContent = `Ticket ${item} Details`;
            siteSelectOT.textContent = `Site ${itemSite}`;
            siteStatusOT.textContent = `${itemStatus}`;
            timeReportedOT.textContent = `${itemReportTime}`
          });
        });
      }

      //For displaying dropdown of Currently open tickets
      if (
        item.ticketStatus === "Open" &&
        otickets.includes(item.ticketNumber) != true
      ) {
        numOpen++;
        // Show number of open tickets on pill
        pillOpen.textContent = numOpen;
        otickets.push(Number(item.ticketNumber));
        otickets.forEach(function (item, index) {
          openTicket.appendChild(newListItem);
        });
        insertIds(otickets);

        //For displaying dropdown of Currently closed tickets
      } else if (
        item.ticketStatus === "Closed" &&
        ctickets.includes(item.ticketNumber) != true
      ) {
        numClose++;
        pillClose.textContent = numClose;
        ctickets.push(Number(item.ticketNumber));
        ctickets.forEach(function (item, index) {
          closedTicket.appendChild(newListItem);
        });
        insertIds(ctickets);
      } else {
        console.log("No data");
      }
    }
  }
}

if (newTicketForm) {
  getData();
  async function getData() {
    const response = await fetch("/api");
    const data = await response.json();
    ticketNumDisplay.textContent = ` Ticket Number ${data.length}`;
  }
}
//For adding new ticket info to the datebase when a ticket is created by hitting the Submit open Ticket Button
if (submitOpenTicket) {
  submitOpenTicket.addEventListener("click", function () {
    newTicketSubmit.disabled = false;
    // newTicketForm.reset

    summaryText.textContent = `Site # - ${siteNumber.value} ||
    Current Status - ${currentStatus.value} ||
    Time Reported - ${timeReported.value} `;
    let txtIgnore = ticketNumDisplay.textContent.split(" ");
    let ticketNumber = txtIgnore[3];
    let site = siteNumber.value;
    let siteStatus = currentStatus.value;
    let date = timeReported.value;
    let ticketStatus = "Open";
    let data = { site, siteStatus, date, ticketStatus, ticketNumber };

    //For hitting the Submit button after Info is displayed to User

    if (newTicketSubmit) {
      newTicketSubmit.addEventListener("click", function () {
        newTicketSubmit.disabled = true;
        newTicketSubmit.textContent = "Report Submitted";
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
        fetch("/api", options)
          .then((response) => response.json())
          .then((data) => console.log(data));
      });
    }
    if (closeModal) {
      closeModal.addEventListener("click", function () {
        window.location.reload();
      });
    }
  });
}
//For Updating the ticket info in the database after the 'Update Ticket' button is selected
if (newTicketUpdate){
  newTicketUpdate.addEventListener("click", function(){
    
    let rfd = []
    const reasons = [reasonServer,reasonComms,reasonPedastal,reasonElectrical,reasonSoftware,reasonOther]

    for (let i = 0; i < reasons.length; i++){
      if (reasons[i].checked){
        rfd.push(reasons[i].id)
        console.log(rfd);
      }else {
        console.log('No reason selected');
      }  
    }
    




    
    // if (reasonServer.checked){
    //   rfd.push('Server')
    // }else if (reasonComms.checked){
    //   rfd.push('Communication')
    // }else if (reasonPedastal.checked){
    //   rfd.push('Pedastal')
    // }else if (reasonElectrical.checked){
    //   rfd.push('Electrical')
    // }else if (reasonSoftware.checked){
    //   rfd.push('Software')
    // }else if (reasonOther.checked){
    //   rfd.push('Other')
    // }else {
    //   alert('Please Select a Reason for Downtime')
    // }console.log(rfd);
    
    
    

  })

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

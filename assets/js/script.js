// Save reference to DOM elements
let currentDay = $('#currentDay');
let saveButton = $('.saveBtn');

// Array of all timeblocks, which access by ID 
let timeBlockArray = [];
$(".time-block").each(function(){ 
    timeBlockArray.push(this.id);
 });

// Function that displaying current date and time
function displayTime() {
    // Variable that shows real time by using Moment.js
    const rightNow = moment().format('DD MMM YYYY [at] hh:mm a');
    currentDay.text(rightNow);
}
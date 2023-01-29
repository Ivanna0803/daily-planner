// Save reference to DOM elements
let currentDay = $('#currentDay');
let saveButton = $('.saveBtn');

// Array of all timeblocks, which access by ID 
// That will be used during displayScheduler function 
let timeBlockArray = [];
$(".time-block").each(function(){ 
    timeBlockArray.push(this.id);
    // Takes second child (textarea) from timeBlock and 
    // setup value for child from local storage
    this.children[1].value = localStorage.getItem(this.id);
 });

// Function that displaying current date and time
function displayTime() {
    // Variable that shows real time by using Moment.js
    const rightNow = moment().format('DD MMM YYYY [at] hh:mm a');
    currentDay.text(rightNow);
}

// Function that deletes time classes(colors) from timeBlocks
// Will be called in displayScheduler function
function clearTimeCss(elemId)
{
    $(elemId).removeClass("past");
    $(elemId).removeClass("future");
    $(elemId).removeClass("present");
}

// Function that adds different colors to timeBlocks based on the current time
function displayScheduler() {
    // Variable that shows real time by using Moment.js
    // Used parseInt method to make a number from string
    const currentTime = parseInt(moment().format('HH'));

    // Loop that runs through timeBlockArray length 
    // to check the time and set/update right class for timeblocks
    for (let i = 0; i < timeBlockArray.length; i++) {
        const timeBlock = timeBlockArray[i];

        // Next two variables were createad based on the separation (substring method) 
        // timeBlock variable on two parts
        // amOrPm variable contains only two last characters (AM or PM)
        const amOrPm = timeBlock.substring(timeBlock.length - 2, timeBlock.length);
        // elemTime variable contains all characters except last two
        // Used parseInt method to make a number from string
        let elemTime = parseInt(timeBlock.substring(0, timeBlock.length - 2));

        // If elemTime equel 12 and AM, then - elemTime equel 0
        if (elemTime == 12 && amOrPm == 'AM') {
            elemTime = 0;
        }

        // If elemTime less than 12 and PM, then - adds 12 to elmTime
        // in that case was created 24 hour system
        if (elemTime < 12 && amOrPm == 'PM') {
            elemTime += 12;
        }

        // Call function that removes timeBlock classes
        clearTimeCss('#' + timeBlock);

        // If elemTime bigger than current time, then we add future class to timeBlock
        if (elemTime > currentTime) {
            $('#' + timeBlock).addClass("future");

        // If elemTime equal to currentTime, than we add present class to timeBlock
        } else if (elemTime === currentTime) {
            $('#' + timeBlock).addClass("present");

        // Else, or if elemTime not bigger or not equal to currentTime 
        // we add past class to timeBlock

        } else {
            $('#' + timeBlock).addClass("past");
        }
    }
}

// Function that calls displayTime and displayScheduler functions
function updateScheduler() {
    displayTime();
    displayScheduler();
}

// Calls updateScheduler function
updateScheduler();

// Method that calls updateScheduler function every minute
setInterval(updateScheduler, 60000);

// Save to the local storage 
saveButton.on("click", function () {
    let time = $(this).parent().attr("id");
    let event = $(this).siblings(".description").val();
    localStorage.setItem(time, event);
})
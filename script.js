var monthElement = document.getElementById("month");
var yearElement = document.getElementById("year");
var forwardButton = document.getElementById("forward");
var backwardButton = document.getElementById("backward");
var daysList = document.getElementById("day-list");

var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];



var selectedEvent = null;

function getEvents(user) {
  fetch(`http://dhbw.radicalsimplicity.com/calendar/${user}/events`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      addEventsToCalendar(data);
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der Events:', error);
    });
}

function addEventsToCalendar(events) {

  }
forwardButton.addEventListener("click", function () {
    var currentMonth = monthElement.textContent;
    var currentYear = yearElement.textContent;
    var currentMonthIndex = monthToInt(currentMonth);

    // increase month by one
    // use modulo to handle passing into the next year
    var nextMonthIndex = (currentMonthIndex + 1) % 12;

    // Wenn der nächste Monat Januar ist, erhöhe auch das Jahr
    var nextYear = currentYear;
    if (nextMonthIndex === 0) {
        nextYear = parseInt(currentYear) + 1;
    }

    // update month and year in html file
    monthElement.textContent = monthNames[nextMonthIndex];
    yearElement.textContent = nextYear;

    displayMonth();
});

backwardButton.addEventListener("click", function () {
    var currentMonth = monthElement.textContent;
    var currentYear = yearElement.textContent;
    var currentMonthIndex = monthToInt(currentMonth);

    // decrease month by one
    var nextMonthIndex = currentMonthIndex - 1;

    // Wenn der nächste Monat Januar ist, verringere das Jahr
    var nextYear = currentYear;
    if (nextMonthIndex === -1) {
        nextMonthIndex = 11; // Setze den Index auf 11 (Dezember)
        nextYear = parseInt(currentYear) - 1;
    }

    // update month and year in html file
    monthElement.textContent = monthNames[nextMonthIndex];
    yearElement.textContent = nextYear;

    displayMonth();
});






function displayMonth() {
    // get month and year from html and convert month to int
    var currentMonth = monthElement.textContent;
    var currentYear = yearElement.textContent;
    var currentMonthIndex = monthToInt(currentMonth);

    // delete days and fill in the new ones
    deleteDays();
    fillInDays(currentMonthIndex, currentYear);
}

// function to get number of days in the month
// create a date with current year and the next month(+1)
// by calling 0/month/year we get the last day of the current month
function getNumberOfDays(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

// render calender on startup
document.addEventListener("DOMContentLoaded", function () {
    displayMonth();
});

// create day list elements by getting the last day of the month
// then filling the rest in
function fillInDays(monthIndex, year) {

    var numberOfDays = getNumberOfDays(monthIndex, year);
    var firstDay = new Date(year, monthIndex, 1).getDay(); // Get the first day of the month (0-6, where 0 is Sunday)

    // Determine the number of empty list items to add before the first day of the month
    var numberOfEmptyDays = firstDay === 0 ? 6 : firstDay - 1;

    for (var i = 0; i < numberOfEmptyDays; i++) {
        var emptyLi = document.createElement("li");
        emptyLi.textContent = "";
        daysList.appendChild(emptyLi); // Add empty list items for the days before the first day of the month
    }

     

    // add actual days
    for (var i = 1; i <= numberOfDays; i++) {
        var li = document.createElement("li");
        li.textContent = i;
        daysList.appendChild(li);
    }
}

function deleteDays() {
    daysList.innerHTML = "";
}

function monthToInt(currentMonth) {
    // Wandle den aktuellen Monat in einen numerischen Wert um
    var currentMonthIndex = monthNames.indexOf(currentMonth);
    return currentMonthIndex;
}



// render calender on startup
document.addEventListener("DOMContentLoaded", function () {
    displayMonth();
    getEvents();
});




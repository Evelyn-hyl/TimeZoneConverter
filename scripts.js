/**
 * javascript file for TimeZoneConverter
 * 
 */

var moment = require('moment-timezone');                       // Imports moment.js

document.addEventListener('DOMContentLoaded', function() {
    // Declare variables
    var inputTimezoneSearch = document.getElementById('inputTimezoneSearch');
    var outputTimezoneSearch = document.getElementById('outputTimezoneSearch');
    var inputTimezoneResults = document.getElementById('inputTimezoneResults');
    var outputTimezoneResults = document.getElementById('outputTimezoneResults');
    var dateSelected;
    var hourDropdown = document.getElementById('hourDropdown');
    var minuteInput = document.getElementById('minuteInput');
    var amButton = document.getElementById('amButton');
    var pmButton = document.getElementById('pmButton');
    var convertButton = document.getElementById('convertButton');
    var dateOutputDescription = document.getElementById('dateOutputDescription');
    var timeOutputDescription = document.getElementById('timeOutputDescription');
    var dateOutputDisplay = document.getElementById('dateOutputDisplay');
    var hourOutputDisplay = document.getElementById('hourOutputDisplay');
    var minuteOutputDisplay = document.getElementById('minuteOutputDisplay');
    var amOutputDisplay = document.getElementById('amOutputDisplay');
    var outputTimeColon = document.getElementById('outputTimeColon');
    var pmOutputDisplay = document.getElementById('pmOutputDisplay');
    // var timezoneList = document.querySelectorAll('inputTimezoneResults li');      // use this for key navigation

    // Dynamic search bar that filters through timezones based on user input
    inputTimezoneSearch.addEventListener('input', function() {
        var tzInput = this.value.toLowerCase();            
        var timezones = moment.tz.names();
        var filteredTz = [];
        if (tzInput.length) {
            filteredTz = timezones.filter((tz) => {
                return tz.toLowerCase().includes(tzInput)
            });
        }

        displayTimezones(filteredTz, inputTimezoneSearch, inputTimezoneResults);
    });

    outputTimezoneSearch.addEventListener('input', function() {
        var tzInput = this.value.toLowerCase();            
        var timezones = moment.tz.names();
        var filteredTz = [];
        if (tzInput.length) {
            filteredTz = timezones.filter((tz) => {
                return tz.toLowerCase().includes(tzInput);
            });
        }

        displayTimezones(filteredTz, outputTimezoneSearch, outputTimezoneResults);
    });

    // Toggles am or pm (inverts color onclick)
    amButton.addEventListener('click', function() {
        toggleAmPm(this);
        console.log('amButton selected');
    });

    pmButton.addEventListener('click', function() {
        toggleAmPm(this);
        console.log('pmButton selected');
    });

    // Logs date selected in date picker
    $('#datepicker').on('change', function() {
        var date = $(this).val(); // or $(this).datepicker('value');
        console.log("Date selected: ", date);
        console.log(changeDateFormat(date));
        dateSelected = date;
    });

    // Logs hour selected by user
    hourDropdown.addEventListener('change', function() {
        console.log("Hour selected: " + this.value);
    });

    // Logs minute inputted by user
    minuteInput.addEventListener('input', function() {
        console.log("Minute inputted: ", this.value);
    });

    // When convertButton is clicked the conversion results boxes appears
    convertButton.addEventListener('click', function() {
        var fromTimezone = inputTimezoneSearch.value;
        var toTimezone = outputTimezoneSearch.value;
        var hours = convertTo24Hour(hourDropdown.value, pmButton);
        var minutes = minuteInput.value;

        var dateString = changeDateFormat(dateSelected);
        var minutesString = appendZero(minutes);
        var fromDateMinuteString = `${dateString}T${hours}:${minutesString}:00`;
        var conversionResults;
        

        //checks which am/pm button is selected
        if (amButton.classList.contains('active')) {
            amPm = amButton;
        }
        else if (pmButton.classList.contains('active')) {
            amPm = pmButton;
        }

        conversionResults = convertTimeZone(fromTimezone, 
                                             fromDateMinuteString, 
                                             toTimezone);

        // Sample convertedTimezone 2024-10-12T13:11:00+08:00
        var convertedYearMonthDay = conversionResults.slice(0, 10);
        var convertedHour = conversionResults.slice(11, 13);
        var convertedMinute = conversionResults.slice(14, 16);
        
        dateOutputDisplay.textContent = `${convertedYearMonthDay}`;
        hourOutputDisplay.textContent = `${convertedHour}`;
        minuteOutputDisplay.textContent = `${convertedMinute}`;
        
        var idsToDisplay = [
            dateOutputDescription,
            timeOutputDescription,
            dateOutputDisplay,
            hourOutputDisplay,
            minuteOutputDisplay,
            amOutputDisplay,
            outputTimeColon,
            pmOutputDisplay,
        ]

        idsToDisplay.forEach(id => {
            id.style.display = 'block';
        })
    })
})


/**
 * Functions
 */

// Displays timezones based on user's time zone input
function displayTimezones(timezones, searchBar, searchResults) {
    var resultsContainer = searchResults;
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = ' ';
    
    timezones.forEach(function(tz) {
        var li = document.createElement('li');                // Creates options for each timezone
        li.textContent = tz;
        li.addEventListener('click', function() {             // Add click event to each list item
            searchBar.value = tz;                   // Set the input field value to the clicked timezone
            resultsContainer.style.display = 'none';          // Optionally hide the list after selection
            console.log("Selected timezone: " + searchBar.value);
        });
        resultsContainer.appendChild(li);
    });
};

// TODO[Function]: Make a function that locates user's timezone and time and set as placeholder options

// TODO[Function]: Add arrow keys navigation for time zone search bar


// Change date format to the moment.js tz format
function changeDateFormat(dateInput) {
    var year = dateInput.slice(6, 10);
    var month = dateInput.slice(0, 2);
    var day = dateInput.slice(3, 5);

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
}

// Change minutes format to append a 0 if there is only a single digit
function appendZero(minutesInput) {
    var minutesInputLength = minutesInput.length;
    var minutesInputNumber = Number(minutesInput);

    while (minutesInputNumber > 59 || minutesInputNumber < 0) {
        alert('ERROR: Invalid minutes input. Please reenter.');
    }
    
    if (minutesInputLength == 1) {
        minutesInput = "0" + minutesInput;
        return minutesInput;
    }
    else {
        return minutesInput;
    }
}

// Toggles am and pm button
function toggleAmPm(clickedButton) {
    
    if (clickedButton.classList.contains('active')) {
        return;
    }

    // Toggle 'active' class
    clickedButton.classList.add('active');

    // Remove 'active' class from other button
    if (clickedButton === amButton) {
        pmButton.classList.remove('active');
    }
    else if(clickedButton === pmButton){
        amButton.classList.remove('active');
    }
}

// Converts selected hour from 12-hour to 24-hour clock
function convertTo24Hour(hourInput, pmButton) {
    var hourInputNumber = Number(hourInput);

    if (pmButton.classList.contains('active') && hourInput < 12) {
        hourInputNumber += 12;
        return String(hourInputNumber);
    }
    else {
        return hourInput;
    }
}

// Convert time zone from an input time zone to output time zone
function convertTimeZone(timeZone1, fromDateHoursMinutes, timeZone2) {
    var fromMoment = moment.tz(fromDateHoursMinutes, timeZone1);
    console.log(fromDateHoursMinutes + ", " + timeZone1 + ", " + timeZone2);
    var toMoment = fromMoment.tz(timeZone2).format();
    console.log(toMoment);

    return toMoment;
}
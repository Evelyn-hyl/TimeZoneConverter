/**
 * Main js file for TimeZoneConverter
 * @author Evelyn H
 * @since Oct 2024
 */

import moment from 'moment-timezone';                   // Imports moment.js
import * as convertUtils from './conversionUtils.js';
import * as displayUtils from './displayUtils.js';

document.addEventListener('DOMContentLoaded', function() {
    // Declare variables
    var inputTimezoneSearch = document.getElementById('inputTimezoneSearch');
    var outputTimezoneSearch = document.getElementById('outputTimezoneSearch');
    var inputTimezoneResults = document.getElementById('inputTimezoneResults');
    var outputTimezoneResults = document.getElementById('outputTimezoneResults');
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
    var selectedInputTimezone;
    var selectedOutputTimezone;
    var dateSelected;
    // var timezoneList = document.querySelectorAll('inputTimezoneResults li');      // use this for key navigation

    // Event listeners that uses a dynamic search bar to filter through timezones based on user input
    inputTimezoneSearch.addEventListener('input', function() {
        var tzInput = this.value.toLowerCase();            
        var timezones = moment.tz.names();
        var filteredTz = [];
        if (tzInput.length) {
            filteredTz = timezones.filter((tz) => {
                return tz.toLowerCase().includes(tzInput);
            });
        }

        displayUtils.displayTimezones(filteredTz, inputTimezoneSearch, inputTimezoneResults, (tz) => {
            selectedInputTimezone = tz;
            console.log("Stored selected input timezone:", selectedInputTimezone);
        });
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

        displayUtils.displayTimezones(filteredTz, outputTimezoneSearch, outputTimezoneResults, (tz) => {
            selectedOutputTimezone = tz;
            console.log("Stored selected output timezone:", selectedOutputTimezone);
        });
    });

    // Event listeners for toggling AM/PM buttons
    amButton.addEventListener('click', function() {
        displayUtils.toggleAmPm(this, amButton, pmButton);
    });

    pmButton.addEventListener('click', function() {
        displayUtils.toggleAmPm(this, amButton, pmButton);
    });

    // Additional event listeners and date/time handling (e.g., date picker, hour dropdown, minute input)
    $('#datepicker').on('change', function() {
        var date = $(this).val();
        console.log("Date selected: ", date);
        console.log(displayUtils.changeDateFormat(date));
        dateSelected = date;
    });

    hourDropdown.addEventListener('change', function() {
        console.log("Hour selected: " + this.value);
    });

    minuteInput.addEventListener('input', function() {
        console.log("Minute inputted: ", this.value);
    });

    // Convert button logic
    convertButton.addEventListener('click', function() {
        const errorMessage = displayUtils.alertIncorrectFields(
            selectedInputTimezone, selectedOutputTimezone, 
            dateSelected, hourDropdown, minuteInput, 
            amButton, pmButton
        );
        
        if (errorMessage !== "") {
            alert(errorMessage);
            return;
        }

        var hours = convertUtils.convertTo24Hour(hourDropdown.value, pmButton);
        var minutes = minuteInput.value;

        var dateString = displayUtils.changeDateFormat(dateSelected);
        var minutesString = displayUtils.prependZero(minutes);
        var fromDateMinuteString = `${dateString}T${hours}:${minutesString}:00`;
        var conversionResults;

        conversionResults = convertUtils.convertTimeZone(selectedInputTimezone, 
                                                        fromDateMinuteString, 
                                                        selectedOutputTimezone);

        // Sample converted Timezone: 10/12/2024 13:11
        // Displays converted Timezone information
        dateOutputDisplay.textContent = `${conversionResults.slice(0, 10)}`;
        hourOutputDisplay.textContent = `${conversionResults.slice(11, 13)}`;
        minuteOutputDisplay.textContent = `${conversionResults.slice(14, 16)}`;
        var hourOutputDisplayNum = Number(hourOutputDisplay.textContent);
        
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

        if (hourOutputDisplayNum > 12) {
            displayUtils.toggleAmPm(pmOutputDisplay, amOutputDisplay, pmOutputDisplay);
            hourOutputDisplayNum -= 12; 
        }
        else {
            displayUtils.toggleAmPm(amOutputDisplay, amOutputDisplay, pmOutputDisplay);
        }

        hourOutputDisplay.textContent = displayUtils.prependZero(String(hourOutputDisplayNum));

        idsToDisplay.forEach(id => {
            id.classList.add('fade-in');
            id.style.display = 'block'; 
        });

        setTimeout(() => {
            idsToDisplay.forEach(id => {
                id.classList.add('visible');
            });
        }, 50);
    })
})
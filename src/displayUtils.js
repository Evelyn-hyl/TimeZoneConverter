/**
 * Handles and displays timezone search functionality &
 * Utility functions for date and time formatting / AM and PM toggling
 * @author Evelyn H
 * @since Oct 2024
 */

/**
 * Displays timezones based on user's time zone input
 * @param {string[]} timezones 
 * @param {HTMLInputElement} searchBar 
 * @param {HTMLElement } searchResults 
 */
export function displayTimezones(timezones, searchBar, searchResults, onTimezoneSelected) {
    var resultsContainer = searchResults;
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = ' ';
    
    timezones.forEach(function(tz) {
        var li = document.createElement('li');                                                                  // Creates options for each timezone
        li.textContent = tz;
        li.addEventListener('click', function() {                                                               // Add click event to each list item
            const utcOffsetMins = moment.tz(tz).utcOffset();
            const utcOffsetHrs = (utcOffsetMins / 60).toFixed(0);
            searchBar.value = `${tz}  UTC${utcOffsetHrs >= 0 ? '+' : ''}${utcOffsetHrs}`;                       // Set the input field value to the clicked timezone and its UTC offset
            resultsContainer.style.display = 'none';                                                            // Optionally hide the list after selection
            onTimezoneSelected(tz);
            console.log("Selected timezone: " + searchBar.value);
        });
        resultsContainer.appendChild(li);
    });
};

/**
 * Change date format to the moment.js tz format
 * @param {string} dateInput 
 * @returns date formatted to the moment.js timezone format (e.g., )
 */
export function changeDateFormat(dateInput) {
    var year = dateInput.slice(6, 10);
    var month = dateInput.slice(0, 2);
    var day = dateInput.slice(3, 5);

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
}

/**
 * Change time format to append a 0 if there is only a single digit
 * @param {string} timeInput 
 * @returns formatted minute
 */
export function prependZero(timeInput) {
    var timeInputLength = timeInput.length;
    var timeInputNumber = Number(timeInput);

    while (timeInputNumber > 59 || timeInputNumber < 0) {
        alert('ERROR: Invalid input. Please reenter.');
    }
    
    if (timeInputLength == 1) {
        timeInput = "0" + timeInput;
        return timeInput;
    }
    else {
        return timeInput;
    }
}

/**
 * Toggles am and pm button
 * @param {HTMLButtonElement} Button 
 */
export function toggleAmPm(Button, amButton, pmButton) {
    
    if (Button.classList.contains('active')) {
        return;
    }

    // Toggle 'active' class
    Button.classList.add('active');

    // Remove 'active' class from other button
    if (Button === amButton) {
        console.log('AM Button toggled');
        pmButton.classList.remove('active');
    }
    else if(Button === pmButton){
        console.log('PM Button toggled');
        amButton.classList.remove('active');
    }
}

/**
 * Creates an alert message string based on the empty fields
 * @param {*} selectedInputTimezone 
 * @param {*} selectedOutputTimezone 
 * @param {*} dateSelected 
 * @param {*} hourDropdown 
 * @param {*} minuteInput 
 * @param {*} amButton 
 * @param {*} pmButton 
 * @returns alert message string
 */
export function alertIncorrectFields(selectedInputTimezone, selectedOutputTimezone, 
                                        dateSelected, hourDropdown, minuteInput, 
                                        amButton, pmButton) {
    var inputTzCheckMsg;
    var outputTzCheckMsg;
    var dateCheckMsg;
    var hourCheckMsg;
    var minuteCheckMsg;
    var amPmCheckMsg;
    var combinedMsg="";

    if (!selectedInputTimezone) {
        inputTzCheckMsg = "Invalid FROM timezone";
    }
    if (!selectedOutputTimezone) {
        outputTzCheckMsg = "Invalid TO timezone";
    }
    if (!dateSelected) {
        dateCheckMsg = "Invalid DATE input";
    }
    if (!hourDropdown) {
        hourCheckMsg = "Invalid HOUR input";
    }
    if (!minuteInput) {
        minuteCheckMsg = "Invalid MINUTE input";
    }
    if (!amButton.classList.contains('active') && !pmButton.classList.contains('active')) {
        amPmCheckMsg = "Invalid AM / PM toggle";
    }

    var errorMsgs = [
        inputTzCheckMsg,
        outputTzCheckMsg,
        dateCheckMsg,
        hourCheckMsg,
        minuteCheckMsg,
        amPmCheckMsg,
    ]

    errorMsgs.forEach(msg => {
        if (msg != undefined) {
            combinedMsg += `${msg}\n`;
        }
    })

    return combinedMsg;
}

// TODO[Function]: Make a function that locates user's timezone and time and set as placeholder options

// TODO[Function]: Add arrow keys navigation for time zone search bar
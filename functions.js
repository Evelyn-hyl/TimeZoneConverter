var moment = require('moment-timezone');                       // Imports moment.js

// Displays timezones based on user input
function displayTimezones(timezones) {
    var resultsContainer = document.getElementById('timezoneResults');
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = ' ';
    
    timezones.forEach(function(tz) {
        var li = document.createElement('li');                // Creates options for each timezone
        li.textContent = tz;
        li.addEventListener('click', function() { // Add click event to each list item
            inputTimezoneSearch.value = tz; // Set the input field value to the clicked timezone
            resultsContainer.style.display = 'none'; // Optionally hide the list after selection
        });
        resultsContainer.appendChild(li);
    });
};
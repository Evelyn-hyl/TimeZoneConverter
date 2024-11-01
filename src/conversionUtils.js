/**
 * Functions to handle time conversions
 * @author Evelyn H
 * @since Oct 2024
 */

/**
 * Converts selected hour from 12-hour to 24-hour clock
 * @param {string} hourInput 
 * @param {HTMLButtonElement} pmButton 
 * @returns hour coverted to 24-hour clock
 */
export function convertTo24Hour(hourInput, pmButton) {
    var hourInputNumber = Number(hourInput);

    if (pmButton.classList.contains('active') && hourInput < 12) {
        hourInputNumber += 12;
        return String(hourInputNumber);
    }
    else {
        return hourInput;
    }
}

/**
 * Convert time zone from an input time zone to output time zone
 * @param {string} fromTimezone
 * @param {string} fromDateHoursMinutes 
 * @param {string} toTimezone
 * @returns toTimeZone's time zone string
 */
export function convertTimeZone(fromTimezone, fromDateHoursMinutes, toTimezone) {
    var fromMoment = moment.tz(fromDateHoursMinutes, fromTimezone);
    console.log(fromDateHoursMinutes + ", " + fromTimezone + ", " + toTimezone);
    var toMoment = fromMoment.tz(toTimezone).format('MM/DD/YYYY HH:mm');
    console.log(toMoment);

    return toMoment;
}
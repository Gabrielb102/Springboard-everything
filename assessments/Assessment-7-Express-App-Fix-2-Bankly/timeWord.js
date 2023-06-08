// Parses time string ('HH:MM') to Object { hours : [int], minutes : [int] }
const produceTimeInts = (timeString) => {
    const timeValues = timeString.split(':');
    let hoursAndMinutes = { hour : parseInt(timeValues[0]), minute : parseInt(timeValues[1]) }
    return hoursAndMinutes;
}
// Generate word for the hour
const getHourWord = (hour) => {
    if (hour > 23 || hour < 0) {
        console.error("Hour must be any value from 00 to 23");
    }
    if (hour === 0 || hour === 12) {
        return 'twelve ';
    }
    if (hour === 1 || hour === 13) {
        return 'one ';
    }
    if (hour === 2 || hour === 14) {
        return 'two ';
    }
    if (hour === 3 || hour === 15) {
        return 'three ';
    }
    if (hour === 4 || hour === 16) {
        return 'four ';
    }
    if (hour === 5 || hour === 17) {
        return 'five ';
    }
    if (hour === 6 || hour === 18) {
        return 'six ';
    }
    if (hour === 7 || hour === 19) {
        return 'seven ';
    }
    if (hour === 8 || hour === 20) {
        return 'eight ';
    }
    if (hour === 9 || hour === 21) {
        return 'nine ';
    }
    if (hour === 10 || hour === 22) {
        return 'ten ';
    }
    if (hour === 11 || hour === 23) {
        return 'eleven ';
    }
}
// Generate word for the ones place of the minute
const getOnesPlaceMinuteWord = (onesPlaceMinString) => {
    if (onesPlaceMinString === '1') {
        return 'one '
    }
    if (onesPlaceMinString === '2') {
        return 'two ';
    }
    if (onesPlaceMinString === '3') {
        return 'three ';
    }
    if (onesPlaceMinString === '4') {
        return 'four ';
    }
    if (onesPlaceMinString === '5') {
        return 'five ';
    }
    if (onesPlaceMinString === '6') {
        return 'six ';
    }
    if (onesPlaceMinString === '7') {
        return 'seven ';
    }
    if (onesPlaceMinString === '8') {
        return 'eight ';
    }
    if (onesPlaceMinString === '9') {
        return 'nine ';
    }
    return '';
}
// Generate the whole word for the minutes in the teens, between 10 and 20, including 10
const getTeensMinuteWord = (minutes) => {
    if (minutes === 10) {
        return 'ten ';
    }

    if (minutes === 11) {
        return 'eleven ';
    }

    if (minutes === 12) {
        return 'twelve ';
    }

    if (minutes === 13) {
        return 'thirteen ';
    }

    if (minutes === 14) {
        return 'fourteen ';
    }

    if (minutes === 15) {
        return 'fifteen ';
    }

    if (minutes === 16) {
        return 'sixteen ';
    }

    if (minutes === 17) {
        return 'seventeen ';
    }

    if (minutes === 18) {
        return 'eighteen ';
    }
    
    if (minutes === 19) {
        return 'nineteen ';
    }
}
// Generates the phrase for the minutes of the time, 
// Dependent on getTeensMinuteWord and getOnesPlaceMinuteWord
const getMinuteWord = (minute) => {
    const minString =  minute.toString();
    let minuteString;

    if (minute > 59 || minute < 0) {
        console.error('Minutes must be any value from 00 to 59')
    }

    if (minute === 0) {
        return "o'clock ";
    }

    if (minString.length === 1) {
        minuteString = 'oh ' + getOnesPlaceMinuteWord(minString[0]);
    } else {
        if (minString[0] === '1') {
            minuteString= getTeensMinuteWord(minute);
        }
    
        if (minString[0] === '2') {
            minuteString = 'twenty ' + getOnesPlaceMinuteWord(minString[1]);
        }
    
        if (minString[0] === '3') {
            minuteString = 'thirty ' + getOnesPlaceMinuteWord(minString[1]);
        }
    
        if (minString[0] === '4') {
            minuteString = 'forty ' + getOnesPlaceMinuteWord(minString[1]);
        }
    
        if (minString[0] === '5') {
            minuteString = 'fifty ' + getOnesPlaceMinuteWord(minString[1]);
        }    
    }

    return minuteString
}
// Sort out am hours from pm hours
const getAmOrPm = (hour) => {
    if (hour < 12) {
        return 'am';
    }
    if (hour >= 12) {
        return 'pm';
    }
}

const produceTimeWord = (timeString) => {
    const { hour, minute } = produceTimeInts(timeString);
    let timeWord = '';

    if (hour === 0 & minute === 0) {
        return 'midnight'
    }

    if (hour === 12 && minute === 0) {
        return 'noon'
    }

    // For the hour 
    timeWord += getHourWord(hour);
    // For the minutes
    timeWord += getMinuteWord(minute);
    // For morning / afternoon
    timeWord += getAmOrPm(hour);
    return timeWord;
}

module.exports = { produceTimeWord,
                    produceTimeInts,
                    getHourWord,
                    getOnesPlaceMinuteWord, 
                    getMinuteWord, 
                    getTeensMinuteWord,
                    getAmOrPm };
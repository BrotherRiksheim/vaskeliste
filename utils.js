export function getMondays(startDate, endDate) {
    // Ensure startDate and endDate are valid Date objects
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new Error('Invalid date objects provided.');
    }

    // Ensure startDate is before endDate
    if (startDate > endDate) {
        throw new Error('Start date must be before end date.');
    }

    const mondays = [];
    let currentDate = new Date(startDate);

    // Adjust to the first Monday if the start date is not Monday
    const day = currentDate.getDay();
    if (day !== 1) {
        const daysToAdd = (1 - day + 7) % 7;
        currentDate.setDate(currentDate.getDate() + daysToAdd);
    }

    while (currentDate <= endDate) {
        mondays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 7);
    }

    return mondays;
}

export function getISOWeekNumber(date) {
    // Ensure the input is a valid Date object
    if (!(date instanceof Date)) {
        throw new Error('Invalid date object provided.');
    }

    // Copy the date object to avoid modifying the original date
    const currentDate = new Date(date.getTime());

    // Set the time to the start of the day
    currentDate.setHours(0, 0, 0, 0);

    // Set the date to Thursday in the current week
    currentDate.setDate(currentDate.getDate() + 3 - (currentDate.getDay() + 6) % 7);

    // January 4 is always in week 1
    const week1 = new Date(currentDate.getFullYear(), 0, 4);

    // Adjust to the nearest Thursday
    week1.setDate(week1.getDate() + 3 - (week1.getDay() + 6) % 7);

    // Calculate the full weeks between the adjusted dates
    const weekNumber = 1 + Math.round(((currentDate.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);

    return weekNumber;
}

export function formatDateToNorwegian(date) {
    // Ensure the input is a valid Date object
    if (!(date instanceof Date)) {
      throw new Error('Invalid date object provided.');
    }
  
    // Format the date to Norwegian standard with month in abbreviated form
    const options = { day: '2-digit', month: 'short' };
    return date.toLocaleDateString('nb-NO', options);
  }


export function getMondayForWeek(year, weekNumber) {
    // Calculate the date of the first day of the year
    const januaryFirst = new Date(year, 0, 1);

    // Get the day of the week of January 1st (0 for Sunday, 1 for Monday, etc.)
    const januaryFirstDay = januaryFirst.getDay();

    // Calculate the number of days to Monday of the first week
    const daysToAdd = (weekNumber - 1) * 7 - januaryFirstDay + 1;

    // Create a new date object for the Monday of the target week
    const targetMonday = new Date(year, 0, daysToAdd + 1);

    return targetMonday;
}

export function formatPeople(people){
    let names = ""
    if(Array.isArray(people)){
        people.forEach((person, index) => {
            if(index != people.length - 1){
                let andOrComma = index == people.length - 2 ? ' & ' : ', '
                names += person.name + andOrComma
            }else {
                names += person.name
            }
        })
    }else {
        names += people.name
    }

    return names
}
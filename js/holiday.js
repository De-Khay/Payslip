document.addEventListener('DOMContentLoaded', function () {
  const holidaysList = document.getElementById('holidaysList');

  // Get current year
  const currentYear = new Date().getFullYear();

  // Define holiday data (replace with actual holiday dates for Nigeria)
  const holidaysData = [
    { name: "New Year's Day", date: `${currentYear}-01-01` },
    { name: 'Easter Sunday', date: calculateEasterSundayDate(currentYear) },
    { name: 'Good Friday', date: calculateGoodFridayDate(currentYear) },
    { name: 'Easter Monday', date: calculateEasterMondayDate(currentYear) },
    { name: "Workers' Day", date: `${currentYear}-05-01` },
    { name: 'Democracy Day', date: `${currentYear}-05-29` },
    {
      name: 'Eid al-Fitr (End of Ramadan)',
      date: calculateEidAlFitrDate(currentYear),
    },
    { name: 'Independence Day', date: `${currentYear}-10-01` },
    { name: 'Christmas Day', date: `${currentYear}-12-25` },
    { name: 'Boxing Day', date: `${currentYear}-12-26` },
    // Add more holidays here...
  ];

  // Function to calculate Easter Sunday date for the given year
  function calculateEasterSundayDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  // Function to calculate Good Friday date for the given year
  function calculateGoodFridayDate(year) {
    const easterSundayDate = new Date(calculateEasterSundayDate(year));
    easterSundayDate.setDate(easterSundayDate.getDate() - 2); // Good Friday is 2 days before Easter Sunday
    return easterSundayDate.toISOString().split('T')[0];
  }

  // Function to calculate Easter Monday date for the given year
  function calculateEasterMondayDate(year) {
    const easterSundayDate = new Date(calculateEasterSundayDate(year));
    easterSundayDate.setDate(easterSundayDate.getDate() + 1); // Easter Monday is 1 day after Easter Sunday
    return easterSundayDate.toISOString().split('T')[0];
  }

  // Function to calculate Eid al-Fitr (End of Ramadan) date for the given year
  function calculateEidAlFitrDate(year) {
    // Calculate based on the lunar calendar (usually 29 or 30 days after the start of Ramadan)
    // This example uses a hypothetical calculation or predefined data for the specific year
    return `${year}-05-13`; // Example date for Eid al-Fitr (adjust as needed)
  }
  // Function to generate holiday list
  function generateHolidayList() {
    holidaysList.innerHTML = '';

    holidaysData.forEach((holiday) => {
      const holidayElement = document.createElement('div');
      holidayElement.classList.add('holiday');

      const holidayName = document.createElement('h2');
      holidayName.textContent = holiday.name;

      const holidayDate = document.createElement('p');
      holidayDate.textContent = `Date: ${formatDate(holiday.date)}`;

      holidayElement.appendChild(holidayName);
      holidayElement.appendChild(holidayDate);
      holidaysList.appendChild(holidayElement);
    });
  }

  // Function to format date (YYYY-MM-DD to DD MMM YYYY)
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  // Generate holiday list on page load
  generateHolidayList();
});

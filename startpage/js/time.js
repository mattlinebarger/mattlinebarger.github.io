window.onload = displayClock();
// Clock function
function displayClock() {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Get clock elements
  var d = new Date();
  var day = dayNames[d.getDay()];
  var mm = monthNames[d.getMonth()];
  var dd = d.getDate();
  var year = d.getFullYear();
  var min = (mins = ('0' + d.getMinutes()).slice(-2));
  var hh = d.getHours();
  var ampm = '';

  // Hour format
  if (CONFIG.twelveHourFormat) {
    ampm = hh >= 12 ? ' PM' : ' AM';
    hh = hh % 12;
    hh = hh ? hh : 12;
  }

  // Display clock elements
  document.getElementById('hour').innerText = hh;
  document.getElementById('separator').innerHTML = ' : ';
  document.getElementById('minutes').innerText = min + ampm;

  document.getElementById('day').innerText = day
  document.getElementById('date').innerText = mm + ' ' + dd + ', ' + year;

  setTimeout(displayClock, 1000);
}

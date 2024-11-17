let is24HourFormat = false; // Flag to track the current time format (12-hour or 24-hour)

function updateClock() {
  const now = new Date();
  
  // Get hours, minutes, and seconds
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // If in 12-hour format, adjust hours and set AM/PM
  if (!is24HourFormat) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle 12:00 as 12 instead of 0
    updateDigit('hour1', Math.floor(hours / 10));
    updateDigit('hour2', hours % 10);
    // If 12-hour format, set the AM/PM part (optional)
    updateDigit('minute1', Math.floor(minutes / 10));
    updateDigit('minute2', minutes % 10);
    updateDigit('second1', Math.floor(seconds / 10));
    updateDigit('second2', seconds % 10);
  } else {
    // 24-hour format
    hours = (hours < 10 ? '0' : '') + hours;
    updateDigit('hour1', hours[0]);
    updateDigit('hour2', hours[1]);
    updateDigit('minute1', Math.floor(minutes / 10));
    updateDigit('minute2', minutes % 10);
    updateDigit('second1', Math.floor(seconds / 10));
    updateDigit('second2', seconds % 10);
  }
}

function updateDigit(id, newValue) {
  const digit = document.getElementById(id);

  if (digit.textContent !== newValue.toString()) {
    digit.classList.add('flip');  // Trigger flip animation
    setTimeout(() => {
      digit.textContent = newValue;  // Update the digit after animation
      digit.classList.remove('flip');
    }, 400); // Match the duration of the flip animation
  }
}

// Toggle between 12-hour and 24-hour formats
function toggleFormat() {
  is24HourFormat = !is24HourFormat;
  const toggleButton = document.getElementById('toggleFormat');
  if (is24HourFormat) {
    toggleButton.textContent = 'Switch to 12-Hour Format';
  } else {
    toggleButton.textContent = 'Switch to 24-Hour Format';
  }
}

// Update clock every second
setInterval(updateClock, 1000);

// Initialize the clock immediately
updateClock();

// Add event listener to the toggle button
document.getElementById('toggleFormat').addEventListener('click', toggleFormat);

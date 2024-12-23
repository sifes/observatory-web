export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  // Array of month names
  const months = [
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
    'December',
  ];

  // Array of weekday names
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // Get parts of the date
  const dayOfWeek = weekdays[date.getUTCDay()]; // Day of the week
  const month = months[date.getUTCMonth()]; // Month (zero-indexed)
  const day = date.getUTCDate(); // Day of the month
  const year = date.getUTCFullYear(); // Year
  const hours = date.getUTCHours(); // Hour (24-hour format)
  const minutes = date.getUTCMinutes(); // Minutes
  const isPM = hours >= 12; // Check if PM
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Format minutes

  // Return formatted string
  return `${dayOfWeek}, ${month} ${day}, ${year} at ${formattedHours}:${formattedMinutes} ${isPM ? 'PM' : 'AM'}`;
}

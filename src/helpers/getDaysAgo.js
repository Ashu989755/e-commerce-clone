export const getTimeAgo = (dateTime) => {
    const chatDate = new Date(dateTime); // Convert the date string to a Date object
    const currentDate = new Date(); // Get the current date
    const timeDifference = Math.max(currentDate - chatDate, 0); // Ensure time difference is never negative
    
    // Check for invalid date
    if (isNaN(timeDifference)) {
      return "Invalid Date";
    }
  
    // Calculate time in different units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    // Return the appropriate time ago string
    if (seconds < 60) {
      return seconds <= 5 ? "now" : `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (hours < 24) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (days < 7) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (weeks < 4) {
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (months < 12) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
};

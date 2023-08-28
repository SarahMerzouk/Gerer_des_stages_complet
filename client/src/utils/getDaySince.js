export function getDaysSince(date) {
    const oneMinute = 60 * 1000; // milliseconds in a minute
    const oneHour = 60 * oneMinute; // milliseconds in an hour
    const oneDay = 24 * oneHour; // milliseconds in a day
    const oneYear = 365 * oneDay; // milliseconds in a year
    const currentDate = new Date(); // current date
    const dateCreated = new Date(date); // date object was created
    const diffTime = currentDate - dateCreated; // difference in milliseconds
    if (diffTime < oneMinute) {
      // less than a minute ago
      return "Il y a quelques secondes";
    } else if (diffTime < oneHour) {
      // less than an hour ago
      const diffMinutes = Math.round(diffTime / oneMinute);
      return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
    } else if (diffTime < oneDay) {
      // less than a day ago
      const diffHours = Math.round(diffTime / oneHour);
      return `Il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
    } else if (diffTime < oneYear) {
      // less than a year ago
      const diffDays = Math.round(diffTime / oneDay);
      return `Il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
    } else {
      // more than a year ago
      const diffYears = Math.round(diffTime / oneYear);
      return `Il y a ${diffYears} an${diffYears > 1 ? "s" : ""}`;
    }
  }
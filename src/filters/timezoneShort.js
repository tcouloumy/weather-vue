import moment from 'moment-timezone';

/**
  * Return a formated string (hours and minutes) of current time
  *
  * @param {String} timezone
  */
export default (timestamp, timezone) => moment.tz.zone(timezone).abbr(timestamp);

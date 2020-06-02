import moment from 'moment';

/**
* Return a string of the current date formatted for display
*/
export function currentFormatedTime() {
	return moment().format("HH:mm");
}

/**
* Return a formated date string from a timestamp
* @param {Int} timestamp Timestamp to format
*/
export function timestampToDate(timestamp) {
	return moment.unix(timestamp).format("MM/DD/YYYY");
}

/**
* Return a day name from a timestamp in the current locale language
* @param {Int} timestamp
*/
export function getDayNameFromTimestamp(timestamp) {
	moment.locale(this.$i18n.locale);
	return moment.unix(timestamp).format('dddd');
}

/**
* Return a formated string (number number/month number) from a timestamp
* @param {Int} timestamp
*/
export function getDateFromTimestamp(timestamp) {
	moment.locale(this.$i18n.locale);
	return moment.unix(timestamp).format('DD/MM');
}

/**
* Return a formated string (hours and minutes) from a timestamp
* @param {Int} timestamp
* @param {Int} offset Offset of timestamp (first parameter) compared to UTC time, in seconds
*/
export function getFormatedTimeFromTimestamp(timestamp, offset = 0) {
	// moment needs the offset in minutes
	offset /= 60;
	return moment.unix(timestamp).utcOffset(offset).format('HH:mm');
}

/**
* Return a formated string (hours and minutes) of current time
*/
export function getCurrentFormatedTime() {
	return moment().format('HH:mm');
}
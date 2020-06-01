import moment from 'moment';

/**
* Return a string of the current date formatted for display
*/
export function currentFormatedTime() {
	return moment().format("HH:mm");
}

/**
* Return a formated date string from a timestamp
* @param {String} timestamp Timestamp to format
*/
export function timestampToDate(timestamp) {
	return moment.unix(timestamp).format("MM/DD/YYYY");
}

/**
* Return a formated string (Day name + number) from a timestamp
* @param {String} timestamp
*/
export function getDayFromTimestamp(timestamp) {
	moment.locale(this.$i18n.locale);
	return moment.unix(timestamp).format('dddd DD');
}

/**
* Return a formated string (hours and minutes) from a timestamp
* @param {String} timestamp
*/
export function getFormatedTimeFromTimestamp(timestamp) {
	return moment.unix(timestamp).format('HH:mm');
}
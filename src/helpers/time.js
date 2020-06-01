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
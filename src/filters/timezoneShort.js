import Vue from 'vue';
import moment from 'moment-timezone';
import { i18n } from '@/plugins/i18n'

/**
* Return a formated string (hours and minutes) of current time
* @param {String} timezone
*/
export default (timestamp, timezone) => {
	return moment.tz.zone(timezone).abbr(timestamp);
}
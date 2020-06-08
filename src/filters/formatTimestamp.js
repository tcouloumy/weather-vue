import Vue from 'vue';
import moment from 'moment-timezone';
import { i18n } from '@/plugins/i18n'

/**
* Format dates
* @param {Int} timestamp
* @param {String} format Date format to output
* @param {Int} offset How much to offset result date/time, in second
*/
export default (timestamp, format, offset = 0) => {
	moment.locale(i18n.locale);
	offset /= 60;
	return moment.unix(timestamp).utcOffset(offset).format(format);
}

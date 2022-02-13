import moment from 'moment-timezone';
import { i18n } from '../plugins/i18n';

/**
  * Format dates
  *
  * @param {Int} timestamp
  * @param {String} format Date format to output
  * @param {Int} offset How much to offset result date/time, in seconds
  */
export default (timestamp, format, offset = 0) => {
  moment.locale(i18n.locale);

  return moment.unix(timestamp).utcOffset(offset / 60).format(format);
};

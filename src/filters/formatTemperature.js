import { i18n } from '../plugins/i18n';

/**
* Return a formated temperature for display
* @param {Float} temp Temperature to format
*/
export default (temp) => Math.round(temp).toString() + (i18n.locale === 'fr' ? '°C' : '°K');

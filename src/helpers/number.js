import { i18n } from '@/plugins/i18n'

/**
* Return a formated temperature for display
* @param {Float} temp Temperature to format
*/
export function formatTemperature(temp) {	
	return Math.round(temp).toString() + (i18n.locale == 'fr' ? '°C' : '°K');
}

/**
* Return a cardinal direction from a angle
* @param {Int} num Angle
*/
export function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}
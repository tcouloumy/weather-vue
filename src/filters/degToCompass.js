import { i18n } from '@/plugins/i18n'

/**
* Return a cardinal direction from a angle
* @param {Int} num Angle
*/
export default (num) => {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}
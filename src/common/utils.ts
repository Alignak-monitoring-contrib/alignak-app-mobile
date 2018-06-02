export const OK   = '#27ae60';
export const WARNING = '#fdb83a';
export const WARN = '#e67e22';
export const CRITICAL = '#e74c3c';
export const UNREACHABLE= '#9b59b6';
export const UNKNOWN = '#2a80b9';
export const ACKNOWLEDGED = '#f39c12';
export const IN_DOWNTIME = '#f1c40f';
export const FLAPPING = '#f1b3f0';

/**
 * Class who provide utils functions
 */
export class Utils {

  /**
   * Return formatted date for given item
   * @param {Object} item - backend item data
   * @returns {string} formatted date
   */
  public static getDate(item: Object): string {
    if (!item['ls_last_check']){
      return 'Not yet checked'
    } else {
      return new Date(item['ls_last_check'] * 1000).toLocaleString() || 'Error';
    }
  }

  /**
   * Return formatted name for given item
   * @param {Object} item - backend item data
   * @returns {string} formatted name of item
   */
  public static getItemName(item: Object): string {
    let name = <string>item['name'];
    if (item['alias'])
      name = <string>item['alias'];

    if (name.includes('_')) {
      let splitname = name.split('_');
      name = splitname.join(' ');
    }

    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  /**
   * Return corresponding color for given key
   * @param {string} key - key for color
   * @param {number} value - value of given key
   * @returns {string} color
   */
  public static getColor(key: string, value = 0): string {
    let color = '#000000';

    if (value == 0)
      return '#f4f4f4';

    if (key == 'ok' || key == 'up')
      color = OK;
    else if (key == 'warning')
      color = WARN;
    else if (key == 'down' || key == 'critical')
      color = CRITICAL;
    else if (key == 'unreachable')
      color = UNREACHABLE;
    else if (key == 'unknown')
      color = UNKNOWN;
    else if (key == 'acknowledged')
      color = ACKNOWLEDGED;
    else if (key == 'in_downtime')
      color = IN_DOWNTIME;
    else if (key == 'flapping')
      color = FLAPPING;

    return color
  }
}

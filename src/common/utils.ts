
export class Utils {

  public static getDate(item: {}): string {
    // Return check date
    if (!item['ls_last_check']){
      return 'Not yet checked'
    } else {
      return new Date(item['ls_last_check'] * 1000).toLocaleString() || 'Error';
    }
  }

  public static getItemName(item: {}): string {
    // Return formatted host name
    let name = item['name'];
    if (item['alias'])
      name = item['alias'];

    if (name.includes('_')) {
      let splitname = name.split('_');
      name = splitname.join(' ');
    }

    return name.charAt(0).toUpperCase() + name.slice(1)
  }
}

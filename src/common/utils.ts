
export class Utils {
  public static getDate(item: {}): string {
    // Return check date
    if (!item['ls_last_check']){
      return 'Not yet checked'
    } else {
      return new Date(item['ls_last_check'] * 1000).toLocaleString() || 'Error';
    }
  }
}

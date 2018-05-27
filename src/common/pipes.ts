import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'getKeys'})
/**
 * Pipe for keys of an Object item
 * @implements PipeTransform
 */
export class KeysPipe implements PipeTransform {

  /**
   * Return list of key
   * @param value - any object
   * @param {string[]} args - args of pipe
   * @returns any object (List here)
   */
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}

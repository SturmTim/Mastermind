import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestFilter'
})
export class RequestFilterPipe implements PipeTransform {

  transform(log : string, filter: string): string {
    if (log.includes(filter)) {
      return log
    }
    return '** not relevant **'
  }

}

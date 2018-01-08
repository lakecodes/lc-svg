import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'returnKeys'
})
export class ReturnKeysPipe implements PipeTransform {

  transform(value: {}): string[] {
    if (!value) { return []; } return Object.keys(value);
  }

}

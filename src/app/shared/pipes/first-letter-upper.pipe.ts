import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "firstLetterUpper"
})
export class FirstLetterUpperPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return value.charAt(0).toUpperCase() + value.substring(1);
  }
}

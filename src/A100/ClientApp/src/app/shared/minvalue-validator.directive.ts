import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[minvalueValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: minvalueValidatorDirective,
    multi: true
  }]
})
export class minvalueValidatorDirective implements Validator {
  validate(c: AbstractControl): { [key: string]: any; } {
    if (c.value === null) {
      return { 'nullPriceEntered': true };
    }
    return (c.value !== null && c.value <= 0) ? { 'lessThanZeroPriceEntered': true} : null;
  }
  private _onChange: () => void;

  registerOnValidatorChange?(fn: () => void): void {
    this._onChange = fn; 
  }  
}

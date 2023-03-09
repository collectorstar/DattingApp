import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor{
  @Input() label: string;
  @Input() type= 'text';
  //formcontrol: AbstractControl;
  constructor(@Self() public ngControl: NgControl){
      this.ngControl.valueAccessor = this;
      //this.formcontrol = this.ngControl.control;
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }


}

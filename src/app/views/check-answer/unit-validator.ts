import { AbstractControl } from "@angular/forms";

export const UnitValidator = (control: AbstractControl): any => {
  const validUnits = [
    'Fahrenheit',
    'Kelvin',
    'Rankine',
    'Celcius',
    'cups',
    'gallons',
    'liters',
  ];
  if (validUnits.includes(control.value)) {
    return null;
  } else {
    return { 'unit': true };
  }
}

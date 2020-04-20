import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { UnitValidator } from './unit-validator';


@Component({
  selector: 'app-check-answer',
  templateUrl: './check-answer.component.html',
  styleUrls: ['./check-answer.component.css']
})
export class CheckAnswerComponent implements OnInit {


  form: FormGroup;
  answerChecked: boolean = false;
  answerCheckMessage: string = '';
  answerCheckColor: string = '';
  answerValue: number;

  constructor() { }

  ngOnInit(): void {
    this.resetCheck();
    this.form = new FormGroup({
      inputValue: new FormControl(null, {
        validators: [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]
      }),
      inputUnit: new FormControl(null, {
        validators: [Validators.required, UnitValidator]
      }),
      targetValue: new FormControl(null, {
        validators: [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]
      }),
      targetUnit: new FormControl(null, {
        validators: [Validators.required, UnitValidator]
      })
    });

    this.form.valueChanges.subscribe(val => {
      this.resetCheck();
    });
  }

  onCheckAnswer() {
    let correctAnswer = this.answersValid();
    if(correctAnswer) {
      this.answerCheckMessage = 'Answer is correct!'
      this.answerCheckColor = 'green'
      this.answerChecked = true;
    } else {
      if(this.form.valid) {
        this.answerCheckMessage = 'Answer is incorect. The correct answer is: ' + this.answerValue.toString();
      } else {
        this.answerCheckMessage = 'Answer is incorect.';
      }
      this.answerCheckColor = 'red'
      this.answerChecked = true;
    }
  }

  answersValid():boolean {
    const inputValue = Math.round(this.form.controls.inputValue.value * 10) / 10;
    const inputUnit = this.form.controls.inputUnit.value;
    const targetValue = Math.round(this.form.controls.targetValue.value * 10) / 10;
    const targetUnit = this.form.controls.targetUnit.value;

    if(this.form.invalid) {
      return false;
    }
    switch(inputUnit) {
      case 'Fahrenheit':
        if(!['Kelvin','Rankine','Celcius'].includes(targetUnit)) {
          return false;
        }
        switch(targetUnit) {
          case 'Kelvin':
            // (32°F − 32) × 5/9 + 273.15 = 273.15K
            this.answerValue = Math.round((((inputValue - 32) / 1.8) + 273.15) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'Rankine':
            // 32°F + 459.67 = 491.67°R
            this.answerValue = Math.round((inputValue  + 491.67) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'Celcius':
            // (32°F − 32) × 5/9 = 0°C
            this.answerValue = Math.round(((inputValue - 32) * (5/9)) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
        }
        break;
      case 'Kelvin':
        if(!['Fahrenheit','Rankine','Celcius'].includes(targetUnit)) {
          return false;
        }
        switch(targetUnit) {
          case 'Fahrenheit':
            // (0K − 273.15) × 9/5 + 32 = -459.7°F
            this.answerValue = Math.round((((inputValue - 273.15) * (9/5)) + 32) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'Rankine':
            // (K) * (9/5)
            this.answerValue = Math.round((((inputValue - 32) / 1.8) + 273.15) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'Celcius':
            // 0K − 273.15 = -273.1°C
            this.answerValue = Math.round((inputValue - 273.15) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
        }
        break;
      case 'Rankine':
        if(!['Kelvin', 'Fahrenheit','Celcius'].includes(targetUnit)) {
          return false;
        }
        switch(targetUnit) {
          case 'Kelvin':
            // 1°R × 5/9 = 0.5556K
            this.answerValue = Math.round((inputValue * (5/9)) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'Fahrenheit':
            // 1°R − 459.67 = -458.7°F
            this.answerValue = Math.round((inputValue - 459.67) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'Celcius':
            // (1°R − 491.67) × 5/9 = -272.6°C
            this.answerValue = Math.round(((inputValue - 491.67) * (5/9)) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
        }
        break;
      case 'Celcius':
        if(!['Kelvin', 'Rankine', 'Fahrenheit'].includes(targetUnit)) {
          return false;
        }
        switch(targetUnit) {
          case 'Kelvin':
            // 0°C + 273.15 = 273.15K
            this.answerValue = Math.round((inputValue + 273.15) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'Rankine':
            // 0°C × 9/5 + 491.67 = 491.67°R
            this.answerValue = Math.round(((inputValue * (9/5)) + 491.67) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'Fahrenheit':
            // (0°C × 9/5) + 32 = 32°F
            this.answerValue = Math.round(((inputValue * (9/5)) + 32) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
        }
        break;
      case 'cups':
        if(!['gallons', 'liters'].includes(targetUnit)) {
          return false;
        }
        switch(targetUnit) {
          case 'gallons':
            // divide the volume value by 16
            this.answerValue = Math.round((inputValue / 16) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'liters':
            // for an approximate result, divide the volume value by 4.227
            this.answerValue = Math.round((inputValue / 4.227) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
        }
        break;
      case 'gallons':
        if(!['cups', 'liters'].includes(targetUnit)) {
          return false;
        }
        switch(targetUnit) {
          case 'cups':
            // multiply the volume value by 16
            this.answerValue = Math.round((inputValue * 16) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'liters':
            // for an approximate result, multiply the volume value by 3.785
            this.answerValue = Math.round((inputValue * 3.785) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
        }
        break;
      case 'liters':
        if(!['cups', 'gallons'].includes(targetUnit)) {
          return false;
        }
        switch(targetUnit) {
          case 'cups':
            // for an approximate result, multiply the volume value by 4.227
            this.answerValue = Math.round((inputValue * 4.227) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
          case 'gallons':
            // for an approximate result, divide the volume value by 3.785
            this.answerValue = Math.round((inputValue / 3.785) * 10) / 10;
            return targetValue == this.answerValue ? true : false;
        }
        break;
    }
    return true
  }

  resetCheck() {
    this.answerCheckMessage = '';
    this.answerCheckColor = '';
    this.answerChecked = false;
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  personInformationForm: FormGroup;
  age: number | null = null;


  constructor(private fb: FormBuilder) {
    this.personInformationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      fatherName: ['', []],
      dateOfBirth: ['', [Validators.required]],
      sex: ['male', [Validators.required, Validators.pattern(/^(male|female)$/)]],
    });
  }

  onBirthDayButtonClick() {
    if (this.personInformationForm.controls['dateOfBirth'].valid) {
      const dateOfBirth = new Date(this.personInformationForm.value.dateOfBirth);
      this.age = this.calculateAge(dateOfBirth);
    }
  }
  
  onSubmit() {
    if (this.personInformationForm.valid) {
    }
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}

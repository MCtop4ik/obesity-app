import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tab1-page',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements OnInit {

  ngOnInit(): void {
    
  }

  name: string = '';
  birthDate: string = '';
  showName: boolean = false;
  showBirthDate: boolean = false;
  age: number | null = null;

  // Метод для обработки имени
  submitName() {
    if (this.name) {
      this.showName = true;
    }
  }

  // Метод для обработки даты рождения
  submitBirthDate() {
    if (this.birthDate) {
      this.calculateAge();
      this.showBirthDate = true;
    }
  }

  // Метод для расчета возраста
  calculateAge() {
    const birth = new Date(this.birthDate);
    const today = new Date();
    this.age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      this.age--;
    }
  }
}
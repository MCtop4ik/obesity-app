import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhysicalParamsService {
  mass: number = 70;
  height: number = 175;
  sex: string = 'male';
  age: number = 30;
  activeLife: string = 'active';

  constructor() {}

  setParams(mass: number, height: number, sex: string, age: number, activeLife: string): void {
    this.mass = mass;
    this.height = height;
    this.sex = sex;
    this.age = age;
    this.activeLife = activeLife;
  }

  countBMR() {
    let bmr = 0;
    if (this.sex == 'male') {
      bmr = this.countBMRMale();
    }
    if (this.sex == 'female') {
      bmr = this.countBMRFemale();
    }
    return bmr;
  }

  private countBMRMale() {
    return 88.362 + 13.397 * this.mass + 4.799 * this.height - 5.677 * this.age;
  }

  private countBMRFemale() {
    return 447.593 + 9.247 * this.mass + 3.098 * this.height - 4.330 * this.age;
  }

  countDCI() {
    return this.countBMR() * this.getDCIcoefficient()
  }

  private getDCIcoefficient() {
    switch (this.activeLife) {
      case 'low':
        return 1.2
      case 'medium':
        return 1.55
      case 'high':
        return 1.725
      default:
        return 1.55
    }
  }
}

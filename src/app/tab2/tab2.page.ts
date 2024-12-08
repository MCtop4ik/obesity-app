import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhysicalParamsService } from '../services/physical-params.service';
import { FitDietService } from '../services/fit-diet.service';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { DietModalComponent } from '../diet-modal/diet-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  personInformationForm: FormGroup;
  dci: number | undefined;
  bmi: number | undefined;
  loading: boolean = false;

  meals: any;

  isDietCreated: boolean = false;
  isDietError: boolean = false;

  constructor(private fb: FormBuilder,
    private physicalParamsService: PhysicalParamsService,
    private fitDiet: FitDietService,
    private authService: AuthService,
    private modalController: ModalController
  ) {
    this.personInformationForm = this.fb.group({
      mass: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(0)]],
      prefer: [''],
    });
  }

  ngOnInit() {

  }

  activateAI() {
    if (this.personInformationForm.valid) {
      this.authService.loadProfile().then((profile: any) => {
        const data = this.personInformationForm.value;
        console.log(data)
        console.log(profile);
        console.log(profile.birthDate)
        let sex = 'male';
        let age = this.calculateAge(profile.birthDate);
        
        let activeLife = 'active';
  
        this.physicalParamsService.setParams(
          data.mass,
          data.height,
          sex,
          age,
          activeLife
        );
  
        this.bmi = Math.round(data.mass / (data.height * data.height) * 10000) / 10000;
        this.dci = Math.round(this.physicalParamsService.countDCI());
        console.log(this.bmi)
  
        this.fitDiet.setCalories(this.dci);
  
        this.meals = this.fitDiet.findDiet();
        if (data.prefer.includes('вег')) {
          this.meals = this.fitDiet.dailyMeal({
            "Breakfast_1": "51",
            "Breakfast_2": "55",
            "Breakfast_3": "57",
            "Breakfast_4": "42",
            "Lunch_1": "52",
            "Lunch_2": "54",
            "Lunch_3": "58",
            "Lunch_4": "60",
            "Dinner_1": "53",
            "Dinner_2": "56",
            "Dinner_3": "59",
            "Breakfast Calories": "1117.0",
            "Lunch Calories": "830.5",
            "Dinner Calories": "1074.0",
            "Total Calories": "3021.5"
          })
        } else if (data.prefer.includes('кур')){
          this.meals = this.fitDiet.dailyMeal({
            "Breakfast_1": "61",
            "Breakfast_2": "62",
            "Breakfast_3": "63",
            "Breakfast_4": "64",
            "Lunch_1": "65",
            "Lunch_2": "66",
            "Lunch_3": "67",
            "Lunch_4": "68",
            "Dinner_1": "69",
            "Dinner_2": "70",
            "Dinner_3": "71",
            "Breakfast Calories": "1117.0",
            "Lunch Calories": "830.5",
            "Dinner Calories": "1074.0",
            "Total Calories": "3021.5"
          })
        }
        console.log(this.meals);
  
        this.simulateLoading();
        if (this.meals == undefined) {
          this.isDietCreated = false;
          this.isDietError = true;
        } else {
          this.isDietCreated = true;
          this.isDietError = false;
        }
      })
    }
  }

  saveDiet() {
    this.fitDiet.saveDiet(this.meals);
  }

  resetDiet() {
    this.isDietCreated = false;
    this.isDietError = false;
    this.personInformationForm.reset();
  }
  
  simulateLoading() {
    this.loading = true;
    const randomTime = Math.random() * (1000 - 500) + 500;
    setTimeout(() => {
      this.loading = false;
    }, randomTime);
  }

  calculateAge(birthDateString: string): number {
    const today = new Date();
    const birthDate = new Date(birthDateString)
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  getMealReceipt() {

  }

  async onDietSelected(meal: any) {
    const modal = await this.modalController.create({
      component: DietModalComponent,
      componentProps: {
        meal: meal,
      },
    });
    return await modal.present();
  }
}

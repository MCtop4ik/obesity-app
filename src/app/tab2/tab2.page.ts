import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhysicalParamsService } from '../services/physical-params.service';
import { FitDietService } from '../services/fit-diet.service';

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
    private fitDiet: FitDietService
  ) {
    this.personInformationForm = this.fb.group({
      mass: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {

  }

  activateAI() {
    if (this.personInformationForm.valid) {
      const data = this.personInformationForm.value;
      let sex = 'male';
      let age = 16;
      let activeLife = 'active';

      this.physicalParamsService.setParams(
        data.mass,
        data.height,
        sex,
        age,
        activeLife
      );

      this.bmi = Math.round(this.physicalParamsService.countBMR());
      this.dci = Math.round(this.physicalParamsService.countDCI());

      this.fitDiet.setCalories(this.dci);

      this.meals = this.fitDiet.findDiet();
      console.log(this.meals);

      this.simulateLoading();
      if (this.meals == undefined) {
        this.isDietCreated = false;
        this.isDietError = true;
      } else {
        this.isDietCreated = true;
        this.isDietError = false;
      }
    }
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
}

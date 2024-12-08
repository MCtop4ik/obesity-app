import { Component, Input, OnInit } from '@angular/core';
import { FitDietService } from '../services/fit-diet.service';
import { StorageService } from '../services/storage.service';
import { PhysicalParamsService } from '../services/physical-params.service';

@Component({
  selector: 'app-fast-diet',
  templateUrl: './fast-diet.page.html',
  styleUrls: ['./fast-diet.page.scss'],
})
export class FastDietPage implements OnInit {
  gender: any = 'mle';
  age: any = 22;
  height: any = 180;
  weight: any = 70;
  bmi: number = 0;
  dci: number = 0;
  meals: any;
  loader = true;

  constructor(private fitDiet: FitDietService,
    private storageService: StorageService,
    private physicalParamsService: PhysicalParamsService,
  ) { }

  ngOnInit() {
    this.getDiets();
  }

  getDiets() {
    this.storageService.get('testPeriodData').then((data) => {
      let bodyParams = JSON.parse(data.value);
      console.log(bodyParams)
      let activeLife = 'active';
  
      this.physicalParamsService.setParams(
        +bodyParams.weight,
        +bodyParams.height,
        bodyParams.gender,
        +bodyParams.age,
        activeLife
      );
      this.bmi = Math.round(+bodyParams.weight / (+bodyParams.height * +bodyParams.height) * 10000) / 10000;
      this.dci = Math.round(this.physicalParamsService.countDCI());
      console.log(this.dci);
      console.log(this.bmi);

      this.simulateLoading();
    })
  }

  simulateLoading() {
    this.loader = true;
    const randomTime = Math.random() * (5000 - 2500) + 2500;
    setTimeout(() => {
      this.loader = false;
    }, randomTime);
  }

  breakfast = {
    main_meal: {
      title: 'Кукурузная каша с молоком',
      calories: '242.0',
      carbohydrates: '50.00',
      fats: '2.00',
      gramms: '200.0',
      image_src: '../../assets/nutrition_images/30.jpg',
      proteins: '6.00'
    },
    salad: {
      title: 'Салат с курицей и ананасами',
      calories: '330.0',
      carbohydrates: '30.00',
      fats: '10.00',
      gramms: '200.0',
      image_src: '../../assets/nutrition_images/20.jpeg',
      proteins: '30.00'
    },
    desert: {
      title: 'Яблочный пирог',
      calories: '200.0',
      carbohydrates: '30.00',
      fats: '8.00',
      gramms: '100.0',
      image_src: '../../assets/nutrition_images/42.jpeg',
      proteins: '2.00'
    },
    calories: {
      breakfast: '1117.0'
    }
  };

  lunch = {
    main_meal: {
      title: 'Овощной суп',
      calories: '175.0',
      carbohydrates: '25.00',
      fats: '5.00',
      gramms: '250.0',
      image_src: '../../assets/nutrition_images/11.jpeg',
      proteins: '7.50'
    },
    salad: {
      title: 'Салат с креветками и авокадо',
      calories: '406.0',
      carbohydrates: '10.00',
      fats: '30.00',
      gramms: '200.0',
      image_src: '../../assets/nutrition_images/19.jpeg',
      proteins: '24.00'
    },
    second_meal: {
      title: 'Овощное рагу',
      calories: '140.0',
      carbohydrates: '20.00',
      fats: '4.00',
      gramms: '200.0',
      image_src: '../../assets/nutrition_images/16.jpg',
      proteins: '6.00'
    },
    desert: {
      title: 'Фруктовый салат',
      calories: '109.5',
      carbohydrates: '22.50',
      fats: '1.50',
      gramms: '150.0',
      image_src: '../../assets/nutrition_images/50.jpg',
      proteins: '1.50'
    },
    calories: {
      lunch: '830.5'
    }
  };

  dinner = {
    main_meal: {
      title: 'Гречка с овощами',
      calories: '276.0',
      carbohydrates: '50.00',
      fats: '4.00',
      gramms: '200.0',
      image_src: '../../assets/nutrition_images/17.jpeg',
      proteins: '10.00'
    },
    salad: {
      title: 'Салат с курицей и ананасами',
      calories: '330.0',
      carbohydrates: '30.00',
      fats: '10.00',
      gramms: '200.0',
      image_src: '../../assets/nutrition_images/20.jpeg',
      proteins: '30.00'
    },
    desert: {
      title: 'Шоколадный торт',
      calories: '360.0',
      carbohydrates: '40.00',
      fats: '20.00',
      gramms: '100.0',
      image_src: '../../assets/nutrition_images/43.jpeg',
      proteins: '5.00'
    },
    calories: {
      dinner: '966.0'
    }
  };

  calories = {
    total: '2913.5'
  };
}
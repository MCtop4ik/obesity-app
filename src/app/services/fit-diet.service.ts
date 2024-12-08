import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FitDietService {
  calories: number = 0;
  meals: any;

  constructor(
    private csvService: CsvService, 
    private storageService: StorageService,
    private httpService: HttpService,
    private authService: AuthService
  ) { }

  findDiet() {
    let allCombinations = this.csvService.getDiets();
    console.log(allCombinations)
    let targetCalories = this.getRandomCalories(this.calories);
    console.log(targetCalories)
    let tolerance = 100;
    let descendCalories = 10;
    const filteredCombinations = allCombinations.filter(combo => {
      return +combo['Total Calories'] >= targetCalories - descendCalories - tolerance && +combo['Total Calories'] <= targetCalories - descendCalories + tolerance;
    }
    );
    console.log(filteredCombinations)
    return this.dailyMeal(filteredCombinations[0]);
  }

  getRandomCalories(baseCalories: number): number {
    const percentage = 0.05;
    const min = baseCalories * (1 - percentage);
    const max = baseCalories * (1 + percentage);
    return Math.random() * (max - min) + min;
  }

  dailyMeal(diet: any) {
    this.parseMeals();
    console.log(diet);
    if (diet == undefined) {
      return undefined;
    }
    return {
      "breakfast": {
        "main_meal": this.meals[diet["Breakfast_1"]],
        "second_meal": this.meals[diet["Breakfast_2"]],
        "salad": this.meals[diet["Breakfast_3"]],
        "desert": this.meals[diet["Breakfast_4"]]
      },
      "lunch": {
        "main_meal": this.meals[diet["Lunch_1"]],
        "second_meal": this.meals[diet["Lunch_2"]],
        "salad": this.meals[diet["Lunch_3"]],
        "desert": this.meals[diet["Lunch_4"]]
      },
      "dinner": {
        "main_meal": this.meals[diet["Dinner_1"]],
        "salad": this.meals[diet["Dinner_2"]],
        "desert": this.meals[diet["Dinner_3"]],
      },
      "calories": {
        "breakfast": diet["Breakfast Calories"],
        "lunch": diet["Lunch Calories"],
        "dinner": diet["Dinner Calories"],
        "total": diet["Total Calories"]
      }
    };
  }

  parseMeals() {
    let meals: any = {};
    for (let row of this.csvService.getMeals()) {
      meals[row['ID']] = {
        "title": row['Блюдо'],
        "image_src": '../../assets/nutrition_images/' + row['ID'] + '.' + row['Формат'],
        "gramms": row['Граммовка'],
        "proteins": row['Белки на порцию'],
        "fats": row['Жиры на порцию'],
        "carbohydrates": row['Углеводы на порцию'],
        "calories": row['Калории на порцию'],
      };
    }
    this.meals = meals;
  }

  setCalories(calories: number) {
    this.calories = calories;
  }

  saveDiet(diet: any) {
    const timestamp = new Date(Date.now()).toISOString();

    this.storageService.get('diets').then((json: any) => {
      this.authService.loadProfile().then((profile) => {
        let diets: any = JSON.parse(json.value);
        if (diets == null) {
          diets = []
        }
        diets.push({
          diet: diet,
          timestamp: timestamp,
          status: 'approving-stage'
        })
        this.httpService.applyDiet({
          userid: profile.userid,
          diet: diet,
          status: 'approving-stage'
        }).subscribe();
        this.storageService.set('diets', diets)
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';

@Injectable({
  providedIn: 'root'
})
export class FitDietService {
  calories: number = 0;
  meals: any;

  constructor(private csvService: CsvService) {}

  findDiet() {
    let allCombinations = this.csvService.getDiets();
    let targetCalories = this.calories;
    let tolerance = 10;
    let descendCalories = 100;
    const filteredCombinations = allCombinations.filter(combo => {
      return +combo['Total Calories'] >= targetCalories - descendCalories - tolerance && +combo['Total Calories'] <= targetCalories - descendCalories + tolerance;
    }
    );

    return this.dailyMeal(filteredCombinations[0]);
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

}

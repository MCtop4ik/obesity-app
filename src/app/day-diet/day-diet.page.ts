import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-day-diet',
  templateUrl: './day-diet.page.html',
  styleUrls: ['./day-diet.page.scss'],
})
export class DayDietPage {
  meals = [
    { title: 'Завтрак', photo: '', kbju: 'КБЖУ: 300 ккал, 10 г белков, 50 г углеводов, 5 г жиров', description: 'Овсянка с ягодами, чай зеленый' },
    { title: 'Обед', photo: '', kbju: 'КБЖУ: 450 ккал, 30 г белков, 40 г углеводов, 15 г жиров', description: 'Курица с овощами, салат из свеклы' },
    { title: 'Ужин', photo: '', kbju: 'КБЖУ: 400 ккал, 25 г белков, 35 г углеводов, 10 г жиров', description: 'Рыба с овощами, гречка' },
  ];

  constructor() {}

  async takePhoto(meal: any) {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    meal.photo = photo.webPath;
    meal.kbju = 'КБЖУ: 300 ккал, 10 г белков, 50 г углеводов, 5 г жиров'; // Пример КБЖУ
  }

  recalculateDiet() {
    // Проверяем, есть ли фотография для завтрака
    const breakfast = this.meals.find(meal => meal.title === 'Завтрак');
    if (breakfast && breakfast.photo) {
      // Добавляем калории и другие параметры от съеденного "чокопая"
      const chokopayCalories = 440; // Пример калорий от "чокопая"
      const chokopayProteins = 3.9; // Пример белков от "чокопая"
      const chokopayCarbs = 63.9; // Пример углеводов от "чокопая"
      const chokopayFats = 18.7; // Пример жиров от "чокопая"

      // Пересчитываем диету для обеда и ужина
      this.meals.forEach(meal => {
        if (meal.title === 'Обед') {
          meal.kbju = `КБЖУ: ${450 + chokopayCalories} ккал, ${30 + chokopayProteins} г белков, ${40 + chokopayCarbs} г углеводов, ${15 + chokopayFats} г жиров`;
          meal.description = 'Паста с томатным соусом, салат из огурцов и помидоров';
        } else if (meal.title === 'Ужин') {
          meal.kbju = `КБЖУ: ${400 + chokopayCalories} ккал, ${25 + chokopayProteins} г белков, ${35 + chokopayCarbs} г углеводов, ${10 + chokopayFats} г жиров`;
          meal.description = 'Творог с фруктами, кефир';
        } else if (meal.title === 'Завтрак') {
          meal.kbju = `КБЖУ: ${chokopayCalories} ккал, ${chokopayProteins + 2} г белков, ${chokopayCarbs - 14} г углеводов, ${chokopayFats + 4} г жиров`;
          meal.description = 'Печенье';
        }
      });
    } else {
      console.log('Фотография для завтрака не добавлена');
    }
  }
}
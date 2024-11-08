import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  meals: any[] = [];
  diets: any[] = [];

  constructor() {
    this.loadMealsCSV();
    this.loadDietsCSV();
  }

  loadMealsCSV() {
    const csvFilePath = './../../assets/csv/nutrition.csv';

    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (results) => {
        console.log('Parsed Results:', results);
        this.meals = results.data;
      },
      error: (error) => {
        console.error('Error while parsing CSV:', error);
      }
    });
  }

  loadDietsCSV() {
    const csvFilePath = './../../assets/csv/combined_meals.csv';

    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (results) => {
        console.log('Parsed Results:', results);
        this.diets = results.data;
      },
      error: (error) => {
        console.error('Error while parsing CSV:', error);
      }
    });
  }

  getMeals() {
    return this.meals;
  }

  getDiets() {
    return this.diets;
  }
}

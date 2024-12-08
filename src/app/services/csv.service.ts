import { Injectable, OnInit } from '@angular/core';
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

  async loadMealsCSV() {
    const csvFilePath = './../../assets/csv/nutrition.csv';

    try {
        const results: any = await this.parseCSV(csvFilePath);
        console.log('Parsed Results:', results);
        this.meals = results.data;
    } catch (error) {
        console.error('Error while parsing CSV:', error);
    }
}

parseCSV(filePath: any) {
    return new Promise((resolve, reject) => {
        Papa.parse(filePath, {
            download: true,
            header: true,
            complete: (results) => {
                resolve(results);
            },
            error: (error) => {
                reject(error);
            }
        });
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

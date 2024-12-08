import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit, OnDestroy {
  diets: any = [];
  private intervalId: any;
  private previousDietsHash: string = ''; // Для хранения хэша предыдущих данных

  constructor(private storageService: StorageService, private httpService: HttpService) {}

  ngOnInit() {
    this.startFetchingDiets();
  }

  ngOnDestroy() {
    this.stopFetchingDiets();
  }

  getAllDiets() {
    this.storageService.get('all_diets').then((data: any) => {
      const rawDiets = JSON.parse(data.value);
      const parsedDiets = rawDiets.map((d: any) => ({
        id: d.id,
        status: d.status,
        diet: JSON.parse(d.diet.replace(/=>/g, ':')),
      }));

      // Создание хэша для новых данных
      const newDietsHash = this.generateHash(JSON.stringify(parsedDiets));

      // Сравнение с предыдущими данными
      if (newDietsHash !== this.previousDietsHash) {
        this.diets = parsedDiets;
        this.previousDietsHash = newDietsHash; // Обновляем хэш
        console.log('Diets updated:', this.diets);
      } else {
        console.log('No changes in diets data.');
      }
    });
  }

  startFetchingDiets() {
    this.intervalId = setInterval(() => {
      this.getAllDiets();
    }, 3000);
  }

  stopFetchingDiets() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'approved':
        return 'approved';
      case 'disapproved':
        return 'disapproved';
      default:
        return 'approving-stage';
    }
  }

  getMeals(section: any): any[] {
    return Object.values(section);
  }

  approveDiet(diet: any): void {
    console.log('Approved:', diet);
    this.httpService.approveDiet(diet).subscribe();
  }

  disapproveDiet(diet: any): void {
    console.log('Disapproved:', diet);
    this.httpService.disapproveDiet(diet).subscribe();
  }

  // Утилита для создания хэша
  private generateHash(data: string): string {
    let hash = 0,
      i,
      chr;
    if (data.length === 0) return hash.toString();
    for (i = 0; i < data.length; i++) {
      chr = data.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Преобразование в 32-битное целое
    }
    return hash.toString();
  }
}
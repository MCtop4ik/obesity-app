import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.page.html',
  styleUrls: ['./calendar-modal.page.scss'],
})
export class CalendarModalPage {
  selectedDate: string | undefined;
  cards: any[] = [];

  constructor(private modalCtrl: ModalController, private localStorage: StorageService,
    private router: Router
  ) {}

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    console.log('Выбрана дата:', this.selectedDate);
    if (this.selectedDate == undefined) {
      alert('Дата не выбрана')
    } else {
      this.localStorage.set('selected-date', this.selectedDate).then(() => {
        this.router.navigate(['day-diet'])
      })
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }


  highlightedDates(date: any) {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    // Проверяем, является ли дата сегодняшней
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      return {
        textColor: 'var(--ion-color-warning-contrast)',
        backgroundColor: 'var(--ion-color-warning)',
      };
    }

    // Проверяем, является ли дата прошедшей
    if (selectedDate < currentDate) {
      return {
        textColor: 'var(--ion-color-success-contrast)',
        backgroundColor: 'var(--ion-color-success)',
      };
    }

    // Если дата не является ни сегодняшней, ни прошедшей, возвращаем undefined
    return undefined;
  }
}
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.page.html',
  styleUrls: ['./calendar-modal.page.scss'],
})
export class CalendarModalPage {
  selectedDate: string | undefined;

  constructor(private modalCtrl: ModalController) {}

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.modalCtrl.dismiss({ selectedDate: this.selectedDate });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
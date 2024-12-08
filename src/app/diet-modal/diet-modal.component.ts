import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-diet-modal',
  templateUrl: './diet-modal.component.html',
  styleUrls: ['./diet-modal.component.scss'],
})
export class DietModalComponent implements OnInit {
  @Input() meal: any;
  receipt: any;
  loader = false;

  constructor(private modalController: ModalController, private httpService: HttpService) {}
  ngOnInit(): void {
    console.log(this.meal);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  generateReceipt() {
    this.loader = true;
    this.httpService.generateReceipt(this.meal.title).subscribe((data: any) => {
      let receipt = (data['choices'][0]['message']['content']);
      this.receipt = receipt;
      this.loader = false;
    });
  }
}

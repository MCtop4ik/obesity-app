import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';
import { CalendarModalPage } from '../calendar-modal/calendar-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-diet-galery',
  templateUrl: './diet-galery.page.html',
  styleUrls: ['./diet-galery.page.scss'],
})
export class DietGaleryPage implements OnInit {
  sortOrder: 'asc' | 'desc' = 'desc';

  meals: any = [];
  selectedDate: any;

  constructor(
    // private storageService: StorageService,
    private httpService: HttpService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {
    this.sortMeals();
  }

  ngOnInit() {
    this.authService.loadProfile().then((profile: any) => {
      this.httpService.userDiets(profile.userid).subscribe((data: any) => {
        this.meals = []
        for (let diet of data) {
          this.meals.push({ 
            diet: JSON.parse(diet.diet.replace(/=>/g, ':')),
            status: diet.status
          });
        }
      });
    });
    // this.storageService.get('diets').then((meals: any) => {
    //   this.meals = JSON.parse(meals.value);    
    //   console.log(this.meals);
    // });
  }

  sortMeals() {
    this.meals.sort((a: any, b: any) => {
      const comparison = (new Date(a.timestamp)).getTime() - (new Date(b.timestamp)).getTime();
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  filterType: 'approved' | 'approving-stage' | 'disapproved' | 'all' = 'approved';

  get filteredMeals() {
    if (this.filterType == 'all') {
      return this.meals;
    }
    return this.meals.filter((meal: any) => meal.status === this.filterType);
  }

  async openCalendarModal() {
    const modal = await this.modalCtrl.create({
      component: CalendarModalPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.selectedDate) {
        this.selectedDate = data.data.selectedDate;
      }
    });

    return await modal.present();
  }
}

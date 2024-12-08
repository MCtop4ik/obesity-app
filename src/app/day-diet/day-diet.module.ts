import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DayDietPageRoutingModule } from './day-diet-routing.module';

import { DayDietPage } from './day-diet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DayDietPageRoutingModule
  ],
  declarations: [DayDietPage]
})
export class DayDietPageModule {}

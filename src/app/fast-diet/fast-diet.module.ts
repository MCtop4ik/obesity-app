import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FastDietPageRoutingModule } from './fast-diet-routing.module';

import { FastDietPage } from './fast-diet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FastDietPageRoutingModule
  ],
  declarations: [FastDietPage]
})
export class FastDietPageModule {}

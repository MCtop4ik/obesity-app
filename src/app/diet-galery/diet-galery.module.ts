import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietGaleryPageRoutingModule } from './diet-galery-routing.module';

import { DietGaleryPage } from './diet-galery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietGaleryPageRoutingModule
  ],
  declarations: [DietGaleryPage]
})
export class DietGaleryPageModule {}

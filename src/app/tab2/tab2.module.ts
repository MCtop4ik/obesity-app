import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { DietModalComponent } from '../diet-modal/diet-modal.component';
import { DietGaleryPageModule } from '../diet-galery/diet-galery.module';
import { DietModalPageModule } from '../diet-modal/diet-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ReactiveFormsModule,
    DietModalPageModule,
    DietGaleryPageModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}

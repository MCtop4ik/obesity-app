import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalPolicyPageRoutingModule } from './medical-policy-routing.module';

import { MedicalPolicyPage } from './medical-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalPolicyPageRoutingModule
  ],
  declarations: [MedicalPolicyPage]
})
export class MedicalPolicyPageModule {}

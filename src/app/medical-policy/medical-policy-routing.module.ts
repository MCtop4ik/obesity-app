import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalPolicyPage } from './medical-policy.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalPolicyPageRoutingModule {}

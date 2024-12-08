import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FastDietPage } from './fast-diet.page';

const routes: Routes = [
  {
    path: '',
    component: FastDietPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastDietPageRoutingModule {}

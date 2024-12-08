import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayDietPage } from './day-diet.page';

const routes: Routes = [
  {
    path: '',
    component: DayDietPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayDietPageRoutingModule {}

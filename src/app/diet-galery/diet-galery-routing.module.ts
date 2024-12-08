import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietGaleryPage } from './diet-galery.page';

const routes: Routes = [
  {
    path: '',
    component: DietGaleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietGaleryPageRoutingModule {}

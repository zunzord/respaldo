import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageProcessingPage } from './image-processing.page';

const routes: Routes = [
  {
    path: '',
    component: ImageProcessingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageProcessingPageRoutingModule {}

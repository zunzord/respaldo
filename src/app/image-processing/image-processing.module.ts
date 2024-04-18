import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageProcessingPageRoutingModule } from './image-processing-routing.module';

import { ImageProcessingPage } from './image-processing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageProcessingPageRoutingModule
  ],
  declarations: [ImageProcessingPage]
})
export class ImageProcessingPageModule {}

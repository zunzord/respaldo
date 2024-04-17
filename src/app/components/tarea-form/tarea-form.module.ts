import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TareaFormComponent } from './tarea-form.component';




@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule

  ],
  declarations: [TareaFormComponent],
  exports: [TareaFormComponent]

})
export class TareaFormModule { }

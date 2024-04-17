import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  tareaForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.tareaForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      prioridad: ['media', Validators.required], // Valor por defecto
      categoria: this.formBuilder.array([]), // Para múltiples selecciones
      recordatorio: [false],
      notas: ['']
    });
  }

  guardarTarea() {
    if (this.tareaForm.valid) {
      console.log('Tarea guardada', this.tareaForm.value);
      this.tareaForm.reset({
        prioridad: 'media', // Restablece el valor por defecto
        recordatorio: false // Restablece el valor por defecto
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}

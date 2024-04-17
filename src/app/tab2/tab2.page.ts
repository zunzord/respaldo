import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TareaFormComponent } from '../components/tarea-form/tarea-form.component'; // Ajusta la ruta según la ubicación de tu componente
import { TareasService } from '../services/tareas.service'; // Ajusta la ruta según la ubicación de tu servicio
import { MetasService } from '../services/metas.service';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  tareas: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private tareasService: TareasService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  async ngOnInit() {
    await this.cargarTareas();
  }

  async abrirFormularioTarea(tareaId?: string) {
    let tareaParaEditar = null;
    if (tareaId) {
      // Asumiendo que tareaId es un string y tienes un ID único para cada tarea
      tareaParaEditar = this.tareas.find(tarea => tarea.id === tareaId);
    }
    const modal = await this.modalCtrl.create({
      component: TareaFormComponent,
      componentProps: { tarea: tareaParaEditar }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      await this.cargarTareas();
    }
  }

  async cargarTareas() {
    // Modificación aquí para manejar la promesa
    this.tareas = await this.tareasService.obtenerTareas();
  }

  async presentActionSheet(tareaId: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          await this.tareasService.eliminarTarea(tareaId);
          await this.cargarTareas(); // Recarga las tareas para actualizar la lista
        }
      }, {
        text: 'Modificar',
        icon: 'create',
        handler: () => {
          this.abrirFormularioTarea(tareaId);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  async modificarTarea(tareaId: string) {
    await this.abrirFormularioTarea(tareaId); // Manejo asíncrono aquí también
  }
}



/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetasService } from '../services/metas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tareaForm!: FormGroup;
  mostrarCalendario: boolean = false;
  metas: any[] = [];

  constructor(private formBuilder: FormBuilder, private metasService: MetasService) {
    
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
  toggleCalendario() {
    this.mostrarCalendario = !this.mostrarCalendario;
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
}*/











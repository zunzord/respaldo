import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MetaFormComponent } from '../components/meta-form/meta-form.component';
import { MetasService } from '../services/metas.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  metas: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private metasService: MetasService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.cargarMetas();
  }

  async mostrarFormularioMeta() {
    const modal = await this.modalCtrl.create({
      component: MetaFormComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.registered) {
      await this.cargarMetas();
    }
  }

  async cargarMetas() {
    const usuarioId = await this.obtenerUsuarioId();
    if (usuarioId) {
      this.metas = await this.metasService.obtenerMetas(usuarioId);
    } else {
      console.error('No se pudo obtener el usuarioId');
    }
  }

  private async obtenerUsuarioId(): Promise<string> {
    const usuarioId = await this.storage.get('usuarioActual');
    return usuarioId;
  }
}




/*import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MetaFormComponent } from '../components/meta-form/meta-form.component';
import { MetasService } from '../services/metas.service';
import { Storage } from '@ionic/storage-angular'; // Importa Storage

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  metas: any[] = []; // Asegúrate de definir el tipo adecuado para tus metas

  constructor(
    private modalCtrl: ModalController,
    private metasService: MetasService, // Inyecta el servicio aquí
    private storage: Storage // Inyecta Storage para acceder al usuarioId
  ) {}

  async ngOnInit() {
    await this.cargarMetas();
  }

  async mostrarFormularioMeta() {
    const modal = await this.modalCtrl.create({
      component: MetaFormComponent,
    });
    await modal.present();

    // Espera hasta que el modal se cierre y luego refresca la lista de metas
    const { data } = await modal.onWillDismiss();
    if (data?.registered) { // Asegúrate de devolver 'registered: true' desde el formulario al guardar una meta
      await this.cargarMetas();
    }
  }

  async cargarMetas() {
    const usuarioId = await this.storage.get('usuarioActual'); // Asume que 'usuarioActual' es la clave donde guardas el ID del usuario
    if (usuarioId) {
      // Ahora `obtenerMetas` espera un `usuarioId` como argumento
      this.metas = await this.metasService.obtenerMetas(usuarioId);
    } else {
      console.error('No se pudo obtener el usuarioId');
      // Manejar adecuadamente, por ejemplo, redirigir al login
    }
  }
}*/



/*import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MetaFormComponent } from '../components/meta-form/meta-form.component';
import { MetasService } from '../services/metas.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  metas: any[] = []; // Asegúrate de definir el tipo adecuado para tus metas

  constructor(
    private modalCtrl: ModalController,
    private metasService: MetasService // Inyecta el servicio aquí
  ) {}

  ngOnInit() {
    this.cargarMetas();
  }

  async mostrarFormularioMeta() {
    const modal = await this.modalCtrl.create({
      component: MetaFormComponent,
    });
    await modal.present();

    // Espera hasta que el modal se cierre y luego refresca la lista de metas
    const { data } = await modal.onWillDismiss();
    if (data?.registered) { // Asegúrate de devolver 'registered: true' desde el formulario al guardar una meta
      this.cargarMetas();
    }
  }

  cargarMetas() {
    // Usa el servicio MetasService para obtener las metas y asignarlas a la propiedad `metas`
    this.metas = this.metasService.obtenerMetas();
  }
}*/




/*import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MetaFormComponent } from '../components/meta-form/meta-form.component'; // Asume que tienes un componente para el formulario de meta

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  metas: any[] = []; // Sustituir por tu tipo de datos real
  constructor(private modalCtrl: ModalController) {}
  ngOnInit() {
    this.cargarMetas();
  }

  async mostrarFormularioMeta() {
    const modal = await this.modalCtrl.create({
      component: MetaFormComponent,
    });
    await modal.present();

    // Refrescar metas después de cerrar el modal
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.cargarMetas();
    }
  }
  
  cargarMetas() {
    // Aquí implementarías la lógica para cargar las metas desde el almacenamiento
    // y calcular el porcentaje de completitud para cada una
  }

  /*cerrarFormularioMeta() {
    // Aquí actualizas la propiedad que controla la visibilidad del formulario
    // Por ejemplo, si usas una variable booleana para controlar la visibilidad:
    this.mostrarFormularioMeta = false;
  }

}*/



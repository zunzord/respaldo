import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  private async obtenerUsuarioId(): Promise<string> {
    // Asumiendo que 'usuarioActual' almacena el ID de usuario cifrado
    const usuarioIdCifrado = await this.storage.get('usuarioActual');
    // Descifra el ID del usuario aquí, si es necesario, antes de devolverlo
    const bytes = CryptoJS.AES.decrypt(usuarioIdCifrado, 'clave-secreta'); // 'clave-secreta' debe ser reemplazada por tu clave real
    const usuarioId = bytes.toString(CryptoJS.enc.Utf8);
    return usuarioId;
  }

  async agregarTarea(tarea: any) {
    const usuarioId = await this.obtenerUsuarioId();
    const tareas = await this.obtenerTareas() || [];
    tarea.id = Date.now().toString(); // Genera un ID único para la tarea
    tarea.usuarioId = usuarioId; // Asocia la tarea con el usuario actual
    tareas.push(tarea);
    await this.storage.set('tareas-' + usuarioId, JSON.stringify(tareas)); // Guarda las tareas con una clave específica del usuario
  }

  async obtenerTareas(): Promise<any[]> {
    const usuarioId = await this.obtenerUsuarioId();
    const tareasCifradas = await this.storage.get('tareas-' + usuarioId);
    if (tareasCifradas) {
      // Descifrar las tareas aquí, si es necesario
      return JSON.parse(tareasCifradas);
    }
    return [];
  }

  async actualizarTarea(tareaId: string, datosActualizados: any) {
    const usuarioId = await this.obtenerUsuarioId();
    const tareas = await this.obtenerTareas();
    const tareaIndex = tareas.findIndex(t => t.id === tareaId && t.usuarioId === usuarioId);
    if (tareaIndex !== -1) {
      tareas[tareaIndex] = { ...tareas[tareaIndex], ...datosActualizados };
      await this.storage.set('tareas-' + usuarioId, JSON.stringify(tareas));
    }
  }

  async eliminarTarea(tareaId: string) {
    const usuarioId = await this.obtenerUsuarioId();
    let tareas = await this.obtenerTareas();
    tareas = tareas.filter(t => t.id !== tareaId && t.usuarioId === usuarioId);
    await this.storage.set('tareas-' + usuarioId, JSON.stringify(tareas));
  }
}









/*import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CryptoJS from 'crypto-js'; // Asegúrate de tener instalado crypto-js

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  constructor(private storage: Storage) {
    this.storage.create(); // Asegura la creación del storage al iniciar la app
  }

  async agregarTarea(tarea: any) {
    const usuarioIdCifrado = await this.obtenerUsuarioIdCifrado();
    let tareasUsuario = await this.obtenerTareasPorUsuario(usuarioIdCifrado);

    const tareaConId = { ...tarea, id: Date.now().toString() }; // Asigna un ID único a cada tarea
    tareasUsuario.push(tareaConId);

    await this.storage.set(usuarioIdCifrado, JSON.stringify(tareasUsuario));
  }

  async obtenerTareas() {
    const usuarioIdCifrado = await this.obtenerUsuarioIdCifrado();
    return await this.obtenerTareasPorUsuario(usuarioIdCifrado);
  }

  async eliminarTarea(tareaId: string) {
    const usuarioIdCifrado = await this.obtenerUsuarioIdCifrado();
    let tareasUsuario = await this.obtenerTareasPorUsuario(usuarioIdCifrado);

    tareasUsuario = tareasUsuario.filter(tarea => tarea.id !== tareaId);
    await this.storage.set(usuarioIdCifrado, JSON.stringify(tareasUsuario));
  }

  async actualizarTarea(tareaId: string, datosActualizados: any) {
    const usuarioIdCifrado = await this.obtenerUsuarioIdCifrado();
    let tareasUsuario = await this.obtenerTareasPorUsuario(usuarioIdCifrado);

    const index = tareasUsuario.findIndex(tarea => tarea.id === tareaId);
    if (index !== -1) {
      tareasUsuario[index] = { ...tareasUsuario[index], ...datosActualizados };
      await this.storage.set(usuarioIdCifrado, JSON.stringify(tareasUsuario));
    }
  }

  private async obtenerUsuarioIdCifrado() {
    // Obtiene el ID de usuario cifrado almacenado en Ionic Storage
    return await this.storage.get('usuarioActual');
  }

  private async obtenerTareasPorUsuario(usuarioIdCifrado: string): Promise<any[]> {
    const tareasCifradas = await this.storage.get(usuarioIdCifrado);
    return tareasCifradas ? JSON.parse(tareasCifradas) : [];
  }
}*/



/*import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private tareas: any[] = [];

  constructor(private storage: Storage) {
    this.cargarTareas();
  }

  async agregarTarea(tarea: any) {
    const usuarioId = await this.obtenerUsuarioId();
    const tareaConUsuario = { ...tarea, usuarioId: usuarioId, id: Date.now().toString() };
    this.tareas.push(tareaConUsuario);
    await this.guardarTareas();
  }

  async obtenerTareas() {
    const usuarioId = await this.obtenerUsuarioId();
    return this.tareas.filter(tarea => tarea.usuarioId === usuarioId);
  }

  async eliminarTarea(tareaId: string) {
    const usuarioId = await this.obtenerUsuarioId();
    this.tareas = this.tareas.filter(tarea => tarea.id !== tareaId && tarea.usuarioId === usuarioId);
    await this.guardarTareas();
  }

  async actualizarTarea(tareaId: string, datosActualizados: any) {
    const usuarioId = await this.obtenerUsuarioId();
    const index = this.tareas.findIndex(tarea => tarea.id === tareaId && tarea.usuarioId === usuarioId);
    if (index !== -1) {
      this.tareas[index] = { ...this.tareas[index], ...datosActualizados };
      await this.guardarTareas();
    }
  }

  private async obtenerUsuarioId() {
    // Aquí debes implementar la lógica para obtener el identificador del usuario actual
    // Por ejemplo, recuperar y descifrar el usuarioId de Ionic Storage
    const usuarioId = await this.storage.get('usuarioId');
    return usuarioId; // Asegúrate de manejar el cifrado/descifrado según sea necesario
  }

  private async cargarTareas() {
    // Implementa la lógica para cargar tareas de Ionic Storage al iniciar el servicio
    const tareasGuardadas = await this.storage.get('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    }
  }

  private async guardarTareas() {
    // Guarda el arreglo de tareas en Ionic Storage
    await this.storage.set('tareas', JSON.stringify(this.tareas));
  }
}*/



/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private tareas: any[] = []; // Considera definir una interfaz para tus tareas si aún no lo has hecho

  constructor() { }

  agregarTarea(tarea: any) {
    const tareaConId = { ...tarea, id: Date.now().toString() };
    this.tareas.push(tareaConId);
  }

  obtenerTareas() {
    return this.tareas;
  }

  // Método para obtener tareas por ID de meta
  obtenerTareasPorMetaId(metaId: string) {
    return this.tareas.filter(tarea => tarea.metaId === metaId);
  }

  // Método para eliminar una tarea por su ID (si cada tarea tiene un ID único)
  eliminarTarea(tareaId: string) {
    this.tareas = this.tareas.filter(tarea => tarea.id !== tareaId);
  }

  // Método para actualizar una tarea
  actualizarTarea(tareaId: string, datosActualizados: any) {
    const index = this.tareas.findIndex(tarea => tarea.id === tareaId);
    if (index !== -1) {
      this.tareas[index] = { ...this.tareas[index], ...datosActualizados };
    }
  }
}*/

import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-image-processing',
  templateUrl: './image-processing.page.html',
  styleUrls: ['./image-processing.page.scss'],
})
export class ImageProcessingPage implements AfterViewInit {
  @ViewChild('imagenContainer') imagenContainer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  private brightness = 255;
  private p5Instance!: p5;
  private img: p5.Image | null = null;
  public showBrightnessControl: boolean = false;

  ngAfterViewInit() {
    this.initializeCanvas();
  }

  initializeCanvas() {
    this.p5Instance = new p5((sketch) => {
      sketch.setup = () => {
        const canvasWidth = document.documentElement.clientWidth;
        const canvasHeight = document.documentElement.clientHeight * 0.75;
        sketch.createCanvas(canvasWidth, canvasHeight);
        sketch.noLoop();
      };

      sketch.draw = () => {
        if (this.img) {
          sketch.clear();
          sketch.tint(255, this.brightness);
          this.adjustImageSize(sketch);
        }
      };
    }, this.imagenContainer.nativeElement);
  }

  adjustImageSize(sketch: any) {
    const imgAspect = this.img!.width / this.img!.height;
    let imgWidth, imgHeight;
    if (sketch.width / sketch.height > imgAspect) {
      imgHeight = sketch.height;
      imgWidth = imgHeight * imgAspect;
    } else {
      imgWidth = sketch.width;
      imgHeight = imgWidth / imgAspect;
    }
    sketch.image(this.img, (sketch.width - imgWidth) / 2, (sketch.height - imgHeight) / 2, imgWidth, imgHeight);
  }

  loadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.p5Instance.loadImage(e.target.result, (img) => {
          this.img = img;
          this.showBrightnessControl = true; // Muestra los controles de brillo
          this.p5Instance.redraw();
        });
      };
  
      reader.readAsDataURL(file);
    }
  }

  increaseBrightness() {
    this.brightness = Math.min(this.brightness + 20, 255);
    this.p5Instance.redraw();
  }
  
  decreaseBrightness() {
    this.brightness = Math.max(this.brightness - 20, 0);
    this.p5Instance.redraw();
  }
}





/*import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-image-processing',
  templateUrl: './image-processing.page.html',
  styleUrls: ['./image-processing.page.scss'],
})
export class ImageProcessingPage implements AfterViewInit {
  @ViewChild('imagenContainer') imagenContainer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  private brightness = 255; // Brillo inicial
  private p5Instance!: p5;
  private img: p5.Image | null = null;
  private startX: number | null = null;
  showBrightnessWheel: boolean = false;

  constructor() { }

  ngAfterViewInit() {
    this.initializeCanvas();
  }

  initializeCanvas() {
    this.p5Instance = new p5((sketch) => {
      sketch.setup = () => {
        const canvasWidth = document.documentElement.clientWidth;
        const canvasHeight = document.documentElement.clientHeight * 0.75;
        sketch.createCanvas(canvasWidth, canvasHeight);
        sketch.noLoop();
      };

      sketch.draw = () => {
        if (this.img) {
          sketch.clear();
          sketch.tint(255, this.brightness);
          let imgWidth, imgHeight;
          const imgAspect = this.img.width / this.img.height;
          if (sketch.width / sketch.height > imgAspect) {
            imgHeight = sketch.height;
            imgWidth = imgHeight * imgAspect;
          } else {
            imgWidth = sketch.width;
            imgHeight = imgWidth / imgAspect;
          }
          sketch.image(this.img, (sketch.width - imgWidth) / 2, (sketch.height - imgHeight) / 2, imgWidth, imgHeight);
        }
      };
    }, this.imagenContainer.nativeElement);
  }

  loadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.p5Instance.loadImage(e.target.result, (img) => {
          this.img = img;
          this.showBrightnessWheel = true; // Asegura que esto se establezca en true
          this.p5Instance.redraw(); // Redibuja la imagen con la nueva carga
        });
      };
  
      reader.readAsDataURL(file);
    }
  }



  increaseBrightness() {
    this.brightness += 20; // Incrementa el valor de brillo
    if (this.brightness > 255) this.brightness = 255;
    this.p5Instance.redraw(); // Redibuja con el nuevo valor de brillo
  }
  
  decreaseBrightness() {
    this.brightness -= 20; // Decrementa el valor de brillo
    if (this.brightness < 0) this.brightness = 0;
    this.p5Instance.redraw(); // Redibuja con el nuevo valor de brillo
  }
}*/

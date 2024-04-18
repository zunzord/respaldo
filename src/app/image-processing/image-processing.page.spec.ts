import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageProcessingPage } from './image-processing.page';

describe('ImageProcessingPage', () => {
  let component: ImageProcessingPage;
  let fixture: ComponentFixture<ImageProcessingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageProcessingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DietGaleryPage } from './diet-galery.page';

describe('DietGaleryPage', () => {
  let component: DietGaleryPage;
  let fixture: ComponentFixture<DietGaleryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DietGaleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

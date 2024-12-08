import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FastDietPage } from './fast-diet.page';

describe('FastDietPage', () => {
  let component: FastDietPage;
  let fixture: ComponentFixture<FastDietPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FastDietPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

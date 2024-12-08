import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayDietPage } from './day-diet.page';

describe('DayDietPage', () => {
  let component: DayDietPage;
  let fixture: ComponentFixture<DayDietPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DayDietPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

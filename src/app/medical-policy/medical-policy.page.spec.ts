import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalPolicyPage } from './medical-policy.page';

describe('MedicalPolicyPage', () => {
  let component: MedicalPolicyPage;
  let fixture: ComponentFixture<MedicalPolicyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-policy',
  templateUrl: './medical-policy.page.html',
  styleUrls: ['./medical-policy.page.scss'],
})
export class MedicalPolicyPage implements OnInit {
  policyholderName: string = 'Иванов Иван Иванович';
  policyNumber: string = '123-456-7890';
  issueDate: Date = new Date('2022-01-01');
  expirationDate: Date = new Date('2023-12-31');
  coverageType: string = 'Общее покрытие';
  coverageDetails: string = 'Медицинские услуги в поликлиниках и больницах.';
  contactNumber: string = '+7 (800) 555-35-35';
  email: string = 'support@healthcare.com';

  constructor() {}

  ngOnInit() {}
}
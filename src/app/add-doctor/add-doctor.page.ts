import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.page.html',
  styleUrls: ['./add-doctor.page.scss'],
})
export class AddDoctorPage implements OnInit {
  qrData: string;

  constructor() { 
    this.qrData = 'https://example.com/join-doctor';
  }

  ngOnInit() {
  }

}

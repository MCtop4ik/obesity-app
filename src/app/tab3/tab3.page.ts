import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  personInformationForm: FormGroup;
  age: number | null = null;
  doctorApproved: boolean = true;

  firstName: any = 'Senya';
  secondName: any = 'Zak';

  constructor(private fb: FormBuilder, private storageService: StorageService, private router: Router,
    private authService: AuthService,  private cdr: ChangeDetectorRef
  ) {
    this.personInformationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      fatherName: ['', []],
      dateOfBirth: ['', [Validators.required]],
      sex: ['male', [Validators.required, Validators.pattern(/^(male|female)$/)]],
    });
  }

  async ngOnInit() {
    await this.loadProfile()
    console.log('3232')
  }

  onBirthDayButtonClick() {
    if (this.personInformationForm.controls['dateOfBirth'].valid) {
      const dateOfBirth = new Date(this.personInformationForm.value.dateOfBirth);
      this.age = this.calculateAge(dateOfBirth);
    }
  }
  
  onSubmit() {
    if (this.personInformationForm.valid) {
    }
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  logout() {
    this.storageService.remove('auth-token');
    this.router.navigate(['login']);
  }

  async loadProfile() {
    let profileData: any = await this.authService.loadProfile();
    console.log(profileData);
    console.log(profileData['firstName'])
    this.firstName = profileData['firstName'];
    this.secondName = profileData['lastName'];
    this.cdr.detectChanges();
  }
}

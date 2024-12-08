import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
// import { HttpService } from '../../services/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
// import { StorageService } from 'src/app/services/storage.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  host: { class: 'login-page' }
})
export class LoginPage {
  selectedTab: string = 'login'; // Default tab is 'login'

  loading = false;
  isFailed = false;
  isInactiveUser = false;
  titleError = '';
  errorMessage = '';
  image: any;
  // private authData: any;

  formGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  registrationFormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required)
  })

  testFormGroup = new FormGroup({
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required)
  })

  constructor(
    // private authService: AuthService,
    private router: Router,
    private httpService: HttpService,
    // private http: HttpService,
    private storageService: StorageService,
  ) { }

  async login(): Promise<void> {
    this.loading = true;
    this.isFailed = false;
    this.isInactiveUser = false;
    this.httpService.login(this.formGroup.value).subscribe((data: any) => {
      if (data['token'] == undefined) {
        this.titleError = 'Error';
        return 
      }
      this.titleError = '';

      this.storageService.set('auth-token', data['token']).then(() => {
        this.router.navigate(['tabs', 'tab2']);
      });
    });
  }

  inactiveUser(): void {
    this.isFailed = true;
    this.loading = false;
    this.isInactiveUser = true;
  }

  register() {
    if (this.registrationFormGroup.valid) {
      console.log('Register:', this.registrationFormGroup.value);
      this.httpService.register(this.registrationFormGroup.value).subscribe(() => {});
    } else {
      this.isFailed = true;
      this.titleError = 'Please fill all fields correctly';
    }
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      this.image = `data:image/jpeg;base64,${image.base64String}`;
    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  countDiet() {
    if (this.testFormGroup.valid && this.image != null) {
      this.httpService.mivoloRecognise().subscribe((data: any) => {
        const age = data['age'];
        const gender = data['gender'];
        let formData = this.testFormGroup.value;
        const weight = formData['weight']
        const height = formData['height']
        this.storageService.set('testPeriodData', {
          age, gender, weight, height
        }).then(() => {
          this.router.navigate(['fast-diet'])
        })
      })
    }
  }
}
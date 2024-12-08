import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  firstName: string = '';
  lastName: string = '';
  birthDate: string = '';
  phoneNumber: string = '';
  avatarUrl: string = '';
  email: string = '';

  constructor(
    private localStorage: StorageService,
    private httpService: HttpService
  ) {
    // Initialize with some default values or load from storage/API
    this.loadProfile();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    const profileData = {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      phoneNumber: this.phoneNumber,
      avatarUrl: this.avatarUrl,
      email: this.email
    };

    this.httpService.changeUserInfo(profileData).subscribe();
    // Save profileData to storage or API
    console.log('Profile saved:', profileData);
  }

  async loadProfile() {
    // Load profile data from storage or API
    // Example: this.firstName = localStorage.getItem('firstName') || '';
    // For simplicity, we'll use some default values
    const token = (await this.localStorage.get('auth-token')).value;
    console.log(token)
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken);
    this.firstName = decodedToken.first_name;
    this.lastName = decodedToken.second_name;
    this.birthDate = decodedToken.date_of_birth;
    this.phoneNumber = decodedToken.phone;
    this.email = decodedToken.email;
    this.avatarUrl = "./../../assets/apple.png";
  }
}
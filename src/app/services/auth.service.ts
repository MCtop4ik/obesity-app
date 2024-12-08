import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { jwtDecode } from 'jwt-decode';
import { each } from 'chart.js/dist/helpers/helpers.core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private localStorage: StorageService
  ) { }

  async isAuthenticated() {
    const token = (await this.localStorage.get('auth-token')).value;
    return !!token;
  }

  async loadProfile() {
    const token = (await this.localStorage.get('auth-token')).value;
    console.log(token)
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken);
    const userid = decodedToken.user_id;
    const firstName = decodedToken.first_name;
    const lastName = decodedToken.second_name;
    const birthDate = decodedToken.date_of_birth;
    const phoneNumber = decodedToken.phone;
    const email = decodedToken.email;
    const user_role = decodedToken.user_role
    const avatarUrl = "./../../assets/apple.png";
    return {
      'userid': userid,
      'firstName': firstName,
      'lastName': lastName,
      'birthDate': birthDate,
      'phoneNumber': phoneNumber,
      'avatarUrl': avatarUrl,
      'email': email,
      'userRole': user_role
    }
  }
}

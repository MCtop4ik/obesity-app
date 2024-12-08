import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  user_role = 'patient'

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  ionViewDidEnter(): void {
    this.getUserRole();
  }
  
  getUserRole() {
    this.authService.loadProfile().then((profile) => {
      this.user_role = profile.userRole
    })
  }

}

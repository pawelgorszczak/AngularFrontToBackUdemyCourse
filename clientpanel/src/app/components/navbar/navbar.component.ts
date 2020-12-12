import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: string | null = '';
  showRegister: boolean = false;

  constructor(private settingsService: SettingsService, private router: Router, private authService: AuthService, private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {    
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else{
        this.isLoggedIn = false;
        this.loggedInUser = null;
      }
    })
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['/login'])
    this.flashMessagesService.show('You are now logged out', {cssClass: 'alert-success', timeout: 4000});
  }
}

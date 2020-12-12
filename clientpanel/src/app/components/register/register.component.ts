import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    // this.authService.getAuth().subscribe(auth => {
    //   if (auth) {
    //     this.router.navigate(['/']);
    //   }
    // })
  }

  onSubmit(): void {
    this.authService.register(this.email, this.password)
    .then(res => {
      this.flashMessagesService.show('You are now registered and logged in', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessagesService.show(err, {cssClass: 'alert-danger', timeout: 4000});
    });
  }
}

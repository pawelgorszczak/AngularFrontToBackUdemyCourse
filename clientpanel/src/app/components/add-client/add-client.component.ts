import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd : boolean = true;
  @ViewChild('clientForm') form?: NgForm;

  constructor(private flashMessagesService: FlashMessagesService, private clientService: ClientService, private router: Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit(){
    var value = this.form?.value;
    var valid = this.form?.valid;
   if(this.disableBalanceOnAdd) {
    value.balance = 0;    
   }

   if(!valid){
     this.flashMessagesService.show('Please fill out the form corectly', {cssClass: 'alert-danger', timeout: 4000})
   }
   else {
     this.clientService.newClient(value);
     this.flashMessagesService.show('New client added', {cssClass: 'alert-success', timeout: 4000})
     this.router.navigate(['/']);
   }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string = '';
  client?: Client;
  disableBalanceOnEdit : boolean = true;
  @ViewChild('clientForm') form?: NgForm;
  
  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute, private flashMessagesService: FlashMessagesService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

    // Get id from url
    this.id = this.route.snapshot.params['id'];

    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client) {
        this.client = client  
      }
    });
  }

  onSubmit(){
    var value = this.form?.value;
    var valid = this.form?.valid;
   if(this.disableBalanceOnEdit) {
    value.balance = 0;    
   }

   if(!valid){
     this.flashMessagesService.show('Please fill out the form corectly', {cssClass: 'alert-danger', timeout: 4000})
   }
   else {
     value.id = this.id;
     this.clientService.updateCliient(value);
     this.flashMessagesService.show('Client updated', {cssClass: 'alert-success', timeout: 4000});
     this.router.navigate([`/client/${this.id}`]);
   }
  }

}

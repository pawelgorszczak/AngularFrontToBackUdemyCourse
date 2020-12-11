import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  id: string = '';
  client?: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    // Get id from url
    this.id = this.route.snapshot.params['id'];

    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client) {
        if ((client.balance || 0) > 0) {
          this.hasBalance = true;
        }
        this.client = client  
      }
    });
  }

  onDelete(): void {
    if(confirm('Are you sure?')){
      this.clientService.deleteClient(this.client as Client);
      this.flashMessage.show('Client removed', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

  updateBalance(): void {
    this.clientService.updateCliient(this.client as Client);
    this.flashMessage.show('Balance updated', {cssClass: 'alert-success', timeout: 4000});
    this.showBalanceUpdateInput = false;
    this.hasBalance = (this.client?.balance || 0) > 0;
  }
}
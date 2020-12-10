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
  hasBalance: boolean = true;
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
    
  }
}
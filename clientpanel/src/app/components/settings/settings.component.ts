import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from 'src/app/models/Settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings?: Settings;
  constructor(private router: Router, private flashMessagesService: FlashMessagesService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings as Settings);
    this.flashMessagesService.show('Settings saved', {cssClass: 'alert-success', timeout: 4000});    
  }
}

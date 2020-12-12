import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {  
  private settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  }

  constructor() { 
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings') as string)
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings): void {
    this.settings = settings;
    localStorage.setItem('settings', JSON.stringify(settings))
  }
}

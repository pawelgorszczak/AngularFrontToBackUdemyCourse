import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logs:Log[];  

  constructor() { 
    this.logs = [
      {
        id: '1', text:'Generated componets', date: new Date('12/26/2017 12:54:23')
      },
      {
        id: '2', text:'Added Bootsrap', date: new Date('12/27/2017 13:54:23')
      },
      {
        id: '3', text:'Added logs component', date: new Date('12/28/2017 18:54:23')
      }
    ]
  }

  getLogs() : Log[]{
    return this.logs;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
    private logs:Log[];
  private logSource = new BehaviorSubject<Log>({id:'', text:'', date:''});
  selectedLog$ = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear$ = this.stateSource.asObservable();

  constructor() { 
    // this.logs = [
    //   {
    //     id: '1', text:'Generated componets', date: new Date('12/26/2017 12:54:23')
    //   },
    //   {
    //     id: '2', text:'Added Bootsrap', date: new Date('12/27/2017 13:54:23')
    //   },
    //   {
    //     id: '3', text:'Added logs component', date: new Date('12/28/2017 18:54:23')
    //   }
    // ]
    this.logs = [];
  }

  getLogs(): Observable<Log[]>{
    if(localStorage.getItem('logs') === null){
      this.logs = [];
    }
    else{
      this.logs = JSON.parse(localStorage.getItem('logs') as string);
    }
    return of(this.logs.sort((a, b) =>{
      return b.date - a.date;
    }));
  }

  setFormLog(log: Log){
    this.logSource.next(log);
  }

  addLog(log: Log): void {
    this.logs.unshift(log);

    // Since local storage is only storing a string we need to serialize it
    // Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(logToUpdate: Log): void {
    var temp = this.logs.find(log => log.id = logToUpdate.id);
    if (temp) {
      temp.text = logToUpdate.text;
      temp.date = logToUpdate.date;
    }
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(logToUpdate: Log): void {
    var indexToDelete = this.logs.findIndex(log => log.id = logToUpdate.id);
    this.logs.splice(indexToDelete, 1);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}

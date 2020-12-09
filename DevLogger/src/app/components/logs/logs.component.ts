import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/Log';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs: Log[] = [];
  selectedLog?: Log;
  loaded: boolean = false;
  
  
  constructor(private logService: LogService) {     
  }

  ngOnInit(): void {    
    this.logService.stateClear$.subscribe(clear => {
      if(clear){
        this.selectedLog = undefined;
      }
    })

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });    
  }

  onSelect(log: Log): void{
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log): void{
    if (confirm('Are you sure?')) {
      this.logService.deleteLog(log)      
    }
  }
}

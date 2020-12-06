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
  
  constructor(private logService: LogService) { }

  ngOnInit(): void {    
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
    });
  }

  onSelect(log: Log): void{
    this.logService.setFormLog(log);
  }
}

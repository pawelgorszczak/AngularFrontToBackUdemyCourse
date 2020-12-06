import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit {
  id: string = '';
  text: string= '';
  date: any = '';
  
  constructor(private logService: LogService) { }

  ngOnInit(): void {
    // Subscribe to the selectedLog Observable
    this.logService.selectedLog$.subscribe(log => {
      if (log && log.id) {
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }
}

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

  isNew: Boolean = true;
  
  constructor(private logService: LogService) { }

  ngOnInit(): void {
    // Subscribe to the selectedLog Observable
    this.logService.selectedLog$.subscribe(log => {
      if (log && log.id) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit(): void {
    // Check if new log
    if (this.isNew) {
      // Create a new log
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      // Add log
      this.logService.addLog(newLog);
    }
    else {
      // Create log to be updated
      const updateLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      // Update log
      this.logService.updateLog(updateLog);
    }
  }

  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

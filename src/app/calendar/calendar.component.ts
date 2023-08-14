import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { OnInit } from '@angular/core';

export interface CalendarDay {
  date: Date;
  events: string[];
  weekday: string; 
  inMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent  implements OnInit {

  private months = [
    "Januar", "Februar", "März", "April",
    "Mai", "Juni", "Juli", "August",
    "September", "Oktober", "November", "Dezember"
  ];

  constructor(dataService: DataService){}
  
  calendar: CalendarDay[][]=[];



  ngOnInit(): void {
      const CurrentMonth = this.getMonthName(new Date().getMonth());
      this.generateCalendar(CurrentMonth);
  }

  getMonthName(monthNumber: number): string {
    if (monthNumber >= 0 && monthNumber < this.months.length) {
      return this.months[monthNumber];
    }
    return "Ungültiger Monat";
  }

  generateCalendarDay(date: Date, events: string[], weekday: string, inMonth: boolean): CalendarDay{
    return {
      date,
      events,
      weekday,
      inMonth
    }}


  generateCalendar(month:string){
    return '';
  }


  nextMonth(){}

  prevMonth(){}

}

import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { OnInit } from '@angular/core';
import { Event } from '../event.interface';

export interface CalendarDay {
  date: Date;
  events: Event[];
  weekday: string;
  inMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  constructor(dataService: DataService) { }
  currentDate = new Date();
  calendar: CalendarDay[][] = [];



  ngOnInit(): void {
    const CurrentMonth = this.getMonthName(new Date());
    this.generateCalendar(CurrentMonth);
  }

  getMonthName(date: Date): string {
    const months = [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    const monthNumber = date.getMonth();

    if (monthNumber >= 0 && monthNumber < months.length) {
      return months[monthNumber];
    }

    return "Ungültiger Monat";
  }


  generateCalendarDay(date: Date, events: Event[], weekday: string, inMonth: boolean): CalendarDay {
    return {
      date,
      events,
      weekday,
      inMonth
    }
  }


  generateCalendar(month: string) {
    this.calendar = [];
  
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const daysInMonth = this.daysInMonth(this.currentDate);
  
    let dayCounter = 1;
  
    for (let i = 0; i < 6; i++) {
      let week: CalendarDay[] = [];
  
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay.getDay()) {
          const daysToAdd = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 0).getDate() - firstDay.getDay() + j + 1;
          const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, daysToAdd);
          week.push(this.generateCalendarDay(date, [], '', false));
        } else if (dayCounter > daysInMonth) {
          const daysToAdd = dayCounter - daysInMonth;
          const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, daysToAdd);
          week.push(this.generateCalendarDay(date, [], '', false));
          dayCounter++;
        } else {
          const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dayCounter);
          const events: Event[] = [];
          const weekday = this.daysOfWeek[j];
          const inMonth = true;
  
          week.push(this.generateCalendarDay(date, events, weekday, inMonth));
          dayCounter++;
        }
      }
  
      this.calendar.push(week);
      if (dayCounter > daysInMonth) {
        break;
      }
    }
  }
  

  isCurrentDay(date: Date): boolean {
    const today = new Date();
    return (
      date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
    );
  }
  


  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar(this.getMonthName(this.currentDate));
  }
  
  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar(this.getMonthName(this.currentDate));
  }

  firstDayInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  daysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }


  goToToday() {
    this.currentDate = new Date(); 
    this.generateCalendar(this.getMonthName(this.currentDate)); 
  }
}

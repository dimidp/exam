import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs';
import { Category } from '../category.interface';
import { EventCreateData } from '../eventCreateData.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-user-input',
  templateUrl: './event-user-input.component.html',
  styleUrls: ['./event-user-input.component.css']
})
export class EventUserInputComponent implements OnInit {
  eventForm: FormGroup;
  categories$: Observable<Category[]> = new Observable<Category[]>();

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    public categoryService: CategoryService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      location: [''],
      organizer: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['Busy', Validators.required],
      allday: [false],
      webpage: [''],
      categories: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onSubmit() {
    if (this.eventForm.valid) {
      if (this.eventForm.valid) {
        const isAllDay = this.eventForm.value.allday;
        const startDate = this.eventForm.value.startDate;
        const endDate = this.eventForm.value.endDate;

        const startDateTime = this.formatDateTime(startDate, this.eventForm.value.startTime, isAllDay);
        const endDateTime = this.formatDateTime(endDate, this.eventForm.value.endTime, isAllDay);

        const eventData: EventCreateData = {
          title: this.eventForm.value.title,
          location: this.eventForm.value.location,
          organizer: this.eventForm.value.organizer,
          start: startDateTime,
          end: endDateTime,
          status: this.eventForm.value.status,
          allday: isAllDay,
          webpage: this.eventForm.value.webpage,
          categories: this.eventForm.value.categories.map((categoryId: number) => ({ id: categoryId })),
          extra: null
        };



        this.dataService.createEvent(eventData).subscribe(
          (createdEvent: any) => {
            console.log('Event created:', createdEvent);
            this.dataService.eventsChanged.emit();
          },
          (error) => {
            console.error('Error creating event:', error);
          }
        )
      };
    } else {
      Object.keys(this.eventForm.controls).forEach(fieldName => {
        const control = this.eventForm.get(fieldName);
        if (control instanceof FormControl) {
          console.log(`Field: ${fieldName}, Errors:`, control.errors);
        }
      });
    }
  }
  private formatDateTime(date: Date, time: string, isAllDay: boolean): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (isAllDay) {
      return `${year}-${month}-${day}T00:00`;
    }

    const [rawHours, minutes, period] = time.split(/:| /);
    const hours = parseInt(rawHours) + (period === 'PM' ? 12 : 0);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}`;
  }
}

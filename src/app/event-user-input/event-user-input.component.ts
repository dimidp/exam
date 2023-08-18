import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Event } from '../event.interface'; // Import the Event interface
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs';
import { Category } from '../category.interface';
import { MatSelectModule } from '@angular/material/select';
import { EventCreateData } from '../eventCreateData.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-user-input',
  templateUrl: './event-user-input.component.html',
  styleUrls: ['./event-user-input.component.css']
})
export class EventUserInputComponent implements OnInit{
  eventForm: FormGroup;
  categories$: Observable<Category[]> = new Observable<Category[]>();

  constructor(private fb: FormBuilder, private dataService: DataService,public categoryService: CategoryService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      location: [''],
      organizer: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
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
    console.log("PENIS")
    if (this.eventForm.valid) {
      console.log("PENIS Prime")

      const eventData: EventCreateData = {
        title: this.eventForm.value.title,
        location: this.eventForm.value.location,
        organizer: this.eventForm.value.organizer,
        start: this.eventForm.value.start,
        end: this.eventForm.value.end,
        status: this.eventForm.value.status,
        allday: this.eventForm.value.allday,
        webpage: this.eventForm.value.webpage,
        imagedata: 'data:image/png;base64,ImageContent', // Provide your image data here
        categories: this.eventForm.value.categories.map((categoryId: number) => ({ id: categoryId })),
        extra: null
      };
  
      this.dataService.createEvent(eventData).subscribe(
        (createdEvent: Event) => {
          console.log('Event created:', createdEvent);
          this.dataService.eventsChanged.emit()
        },
        (error) => {
          console.error('Error creating event:', error);
          // You can handle the error, display an error message, etc.
        }
      );
    } else {
      // Durchlaufen Sie alle Formularfelder, um die Validierungsfehler anzuzeigen
      Object.keys(this.eventForm.controls).forEach(fieldName => {
        const control = this.eventForm.get(fieldName);
        if (control instanceof FormControl) {
          console.log(`Field: ${fieldName}, Errors:`, control.errors);
        }
      });
    }
  }
}

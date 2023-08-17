import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Event } from '../event.interface';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent {
  event$!: Observable<Event>;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {
    this.event$ = this.route.params.pipe(
      switchMap(params => this.dataService.getEventByID(+params['id']))
    );
  }

  updateEvent(event: Event) {
    this.dataService.updateEvent(event.id, event).subscribe(() => {
      // After successfully updating the event, navigate back to the list display
      this.router.navigate(['/']);
    });
  }
}

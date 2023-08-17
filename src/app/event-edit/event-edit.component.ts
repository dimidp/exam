import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Event } from '../event.interface';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent {
  event$!: Observable<Event>;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.event$ = this.route.params.pipe(
      switchMap(params => this.dataService.getEventByID(+params['id']))
    );
  }
}

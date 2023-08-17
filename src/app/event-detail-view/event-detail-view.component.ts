import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Event } from '../event.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail-view',
  templateUrl: './event-detail-view.component.html',
  styleUrls: ['./event-detail-view.component.css']
})
export class EventDetailViewComponent implements OnInit {
  event$: Observable<Event> | undefined;

  constructor(private router:Router, private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const eventId = Number(params.get('id'));
      this.loadEvent(eventId);
    });
  }
  goBack() {
    this.router.navigate(['/events']); 
  }

  loadEvent(eventId: number) {
    this.event$ = this.dataService.getEventByID(eventId);
  }
}

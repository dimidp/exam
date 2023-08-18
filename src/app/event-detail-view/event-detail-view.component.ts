import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ImageService } from '../image.service';
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
  selectedImageFile: File | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const eventId = Number(params.get('id'));
      this.loadEvent(eventId);
    });
  }

  goBack() {
    this.router.navigate(['/events']); 
  }

  onImageFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImageFile = event.target.files[0];
    }
  }

  async loadEvent(eventId: number) {
    this.event$ = this.dataService.getEventByID(eventId);
  }

  async uploadImage() {
    if (this.selectedImageFile) {
      const imageBase64 = await this.imageService.imageToBase64(this.selectedImageFile);
      this.route.paramMap.subscribe(params => {
        const eventId = Number(params.get('id'));
        this.imageService.addOrUpdateImageToEvent(eventId.toString(), imageBase64).subscribe(() => {
          this.loadEvent(eventId);
        });
      });
    }
  }
}

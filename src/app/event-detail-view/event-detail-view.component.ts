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
  ) { }

  /**
   * Lifecycle hook: Initializes the component and loads the event details.
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const eventId = Number(params.get('id'));
      this.loadEvent(eventId);
    });
  }

  /**
   * Navigates back to the events list page.
   */
  goBack() {
    this.router.navigate(['/events']);
  }

  /**
   * Handles the selection of an image file.
   * @param event The input event containing the selected image file.
   */
  onImageFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImageFile = event.target.files[0];
    }
  }

  /**
   * Loads the event details using the data service.
   * @param eventId The ID of the event to load.
   */
  async loadEvent(eventId: number) {
    this.event$ = this.dataService.getEventByID(eventId);
  }

  /**
   * Uploads the selected image file for the event.
   */
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

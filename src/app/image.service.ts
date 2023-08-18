import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  addOrUpdateImageToEvent(eventId: string, imageData: string) {
    const url = `${this.config.baseURL}/${this.config.user}/images/${eventId}`;
    const imagePayload = {
      imagedata: imageData
    };
    return this.http.post(url, imagePayload);
  }

  removeImageFromEvent(eventId: string) {
    const url = `${this.config.baseURL}/${this.config.user}/images/${eventId}`;
    return this.http.delete(url);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseURL = "http://dhbw.radicalsimplicity.com/calendar";
  user = "3412747";
}

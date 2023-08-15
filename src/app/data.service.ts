import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseURL="http://dhbw.radicalsimplicity.com/calendar/"
  private accountName="3412747"

  constructor(){}


  getAllEvents(){}

  getEventByID(ID: number){}

  editEvent(ID: number){}

  addevent(){}

  deleteEvent(ID: number){}

  addImage(ID: number){}

  removeImage(ID:number){}



}

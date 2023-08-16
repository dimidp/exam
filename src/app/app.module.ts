import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { EventUserInputComponent } from './event-user-input/event-user-input.component';
import { HttpClientModule } from '@angular/common/http';
import { ListDisplayComponent } from './list-display/list-display.component'; 
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventUserInputComponent,
    ListDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

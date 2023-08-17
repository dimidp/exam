import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { EventUserInputComponent } from './event-user-input/event-user-input.component';
import { HttpClientModule } from '@angular/common/http';
import { ListDisplayComponent } from './list-display/list-display.component'; 
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CategoryService } from './category.service';
import { DataService } from './data.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EventEditComponent } from './event-edit/event-edit.component';
import { FormsModule } from '@angular/forms';
import { CategoryUserInputComponent } from './category-user-input/category-user-input.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategoriesDisplayComponent } from './categories-display/categories-display.component';
import { EventDetailViewComponent } from './event-detail-view/event-detail-view.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventUserInputComponent,
    ListDisplayComponent,
    EventEditComponent,
    CategoryUserInputComponent,
    HeaderComponent,
    HomeComponent,
    CategoriesDisplayComponent,
    EventDetailViewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxMaterialTimepickerModule,
    FormsModule
  ],
  providers: [CategoryService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

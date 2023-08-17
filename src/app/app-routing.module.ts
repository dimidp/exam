import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventEditComponent } from './event-edit/event-edit.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategoriesDisplayComponent } from './categories-display/categories-display.component';
import { ListDisplayComponent } from './list-display/list-display.component';
import { EventDetailViewComponent } from './event-detail-view/event-detail-view.component';

const routes: Routes = [
  { path: 'event/:id/edit', component: EventEditComponent },
  { path: '', component: HomeComponent },
  { path: 'events', component: ListDisplayComponent },
  { path: 'categories', component: CategoriesDisplayComponent },
  { path: 'event/:id/view', component: EventDetailViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

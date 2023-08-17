import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventEditComponent } from './event-edit/event-edit.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  { path: 'event/:id/edit', component: EventEditComponent },
  { path: '', component: HomeComponent }, // Home route
  { path: 'event/:id/edit', component: EventEditComponent },
  { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

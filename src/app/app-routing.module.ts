import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventEditComponent } from './event-edit/event-edit.component';

const routes: Routes = [
  { path: 'event/:id/edit', component: EventEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

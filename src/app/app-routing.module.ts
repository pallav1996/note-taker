import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteInputComponent } from './note-input/note-input.component';
import { NoteCarouselComponent } from './note-carousel/note-carousel.component';
import { AllNotesComponent } from './all-notes/all-notes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'all',
    component: AllNotesComponent
  },
  {
    path: 'list',
    component: NoteCarouselComponent
  },
  { 
    path: 'note-editor',
    component: NoteInputComponent
  },
  {
    path: 'note-editor/:id',
    component: NoteInputComponent
  },
  {
    path: 'note-editor/copy/:id',
    component: NoteInputComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

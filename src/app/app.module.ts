import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteInputComponent } from './note-input/note-input.component';
import { NoteCarouselComponent } from './note-carousel/note-carousel.component';
import { AllNotesComponent } from './all-notes/all-notes.component';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
    NoteInputComponent,
    NoteCarouselComponent,
    AllNotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

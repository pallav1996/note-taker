import { Component, OnInit } from '@angular/core';
import { note } from '../note';
//import { notes } from '../mock_notes';

import { NoteService } from '../note.service';
import { NoteColorService } from '../note-color.service';

@Component({
  selector: 'app-note-carousel',
  templateUrl: './note-carousel.component.html',
  styleUrls: ['./note-carousel.component.css']
})
export class NoteCarouselComponent implements OnInit {

  component_notes: note[]
  note_list: note[];
  constructor(private noteservice: NoteService, private notecolor: NoteColorService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void{
    this.noteservice.getNotes().subscribe(service_notes => this.component_notes = service_notes);
    this.noteservice.getNotes().subscribe(service_notes => this.note_list = service_notes.slice(0, 5));
  }

  getBackgroundColor(color_code: string)
  {
    return this.notecolor.getBackgroundColor(color_code);
  }

  getTextColor(color_code: string){

    return this.notecolor.getTextColor(color_code);
   }

  event_func(event: string): void{
    console.log(`${event} in carousel`); }

  delete_note(selectedNote: note){
    // this.note_list = this.note_list.filter(note => selectedNote != note);
    this.component_notes = this.component_notes.filter(note => selectedNote != note);
    this.note_list = this.component_notes.slice(0, 4);
    this.noteservice.deleteNote(selectedNote).subscribe();
  }

};

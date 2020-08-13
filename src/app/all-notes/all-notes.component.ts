import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service'
import { note } from '../note';
//import { notes } from '../mock_notes';

import { NoteColorService } from '../note-color.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { title } from 'process';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
})
export class AllNotesComponent implements OnInit {

  results_length = true;
  search_results: note[];
  component_notes: note[]; 
  constructor(private noteservice: NoteService, private notecolor: NoteColorService) { }
  
  filter(query: string)
  {
    this.results_length = true;
    if(!query.trim())
      {this.search_results = this.component_notes;}
    
    
    const content_array = this.component_notes.filter(note => note.content.toLowerCase().includes(query.toLowerCase()));
    const title_array = this.component_notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()));

    this.search_results = Array.from(new Set([...content_array, ...title_array]));
    //this.search_results = this.component_notes.filter(note => note.content.toLowerCase().includes(query.toLowerCase()));
    if(this.search_results.length === 0)
      this.results_length = false;
  }

  getNotes(): void{
      this.noteservice.getNotes().subscribe(service_notes => 
        {this.component_notes = service_notes;
        this.search_results = service_notes; });
  }

  delete_note(selectedNote: note){
    
  //   this.component_notes$ = this.component_notes$.pipe(
  //     map(observable_notes => {
  //     // Here goes some condition, apply it to your use case, the condition only will return when condition matches
  //     return observable_notes.filter(notes => notes != selectedNote);
  // }),)
    this.component_notes = this.component_notes.filter(note => selectedNote != note);
    this.search_results = this.component_notes;
    this.noteservice.deleteNote(selectedNote).subscribe();
  }

  getBackgroundColor(color_code: string){
    return this.notecolor.getBackgroundColor(color_code);
  }
  
  getTextColor(color_code: string){

   return this.notecolor.getTextColor(color_code);
  }

  copyText(note_title: string, note_content: string): void{
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = note_title + '\n\n' + note_content;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  ngOnInit(): void {
    this.getNotes();
  }

}

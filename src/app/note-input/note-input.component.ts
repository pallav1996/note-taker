import { Component, OnInit } from '@angular/core';
import { note } from '../note';
import { NoteService } from '../note.service';
import { NoteColorService } from '../note-color.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-note-input',
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.css']
})
export class NoteInputComponent implements OnInit {

  constructor(private noteservice: NoteService, 
              private notecolor: NoteColorService,
              private activeRoute: ActivatedRoute,
              private location:Location) {  }

 
  //note_length: number;
  notes: note[]
  model: note = {
    id: undefined,
    title: "",
    content: "",
    color: "E91E63"
  };
  newNoteID: number;
   
  ngOnInit(): void {
    this.getNotes();  //for getting notes list
    
        if(this.activeRoute.snapshot.paramMap.get('id'))
        {
        const id = +this.activeRoute.snapshot.paramMap.get('id');
        this.getNote(id);
        }
      //} 
  }

  getNotes(): void{
    this.noteservice.getNotes().subscribe(service_notes => this.notes = service_notes);
  }

  getNote(id: number){
    this.noteservice.getNote(id).subscribe(serviceNote => this.model = serviceNote);
  }

  getBackgroundColor(color_code: string)
  {
    if(!color_code)
      return "#FFFFFF";
    return this.notecolor.getBackgroundColor(color_code);
  }

  getTextColor(color_code: string)
  {
    return this.notecolor.getTextColor(color_code);
   }
  

  addNote()
  {
    if(!this.model.color)
      this.model.color = "FFFFFF";

    if(this.activeRoute.snapshot.routeConfig.path.search("copy") === -1 && this.activeRoute.snapshot.paramMap.get('id'))
      {
        console.log(`Editing request sent for note id: ${this.model.id}`);
        this.noteservice.updateNote(this.model).subscribe();  //for editing notes action
        this.goBack();
      }

    else {
      this.newNoteID = this.notes.length > 0 ? Math.max(...this.notes.map(note => note.id)) + 1 : 1;
      console.log(`new note id: ${this.newNoteID}`);
      this.noteservice.addNote(this.model, this.newNoteID).subscribe();
      this.goBack();
    }  //for duplicate and adding notes
  }

  goBack(): void {
    this.location.back();
  }

  submitted = false;
  onSubmit() { this.submitted = true; }
  get diagnostic() { return JSON.stringify(this.model); }
}

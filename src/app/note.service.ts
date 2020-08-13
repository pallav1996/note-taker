import { Injectable } from '@angular/core';
import { note } from './note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, ObservedValuesFromArray } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesURL = 'api/notes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  getNotes(): Observable<note[]>
  {
    return this.http.get<note[]>(this.notesURL);
  }

  getNote(id: number): Observable<note>{
    const URL = `${this.notesURL}/${id}`;
    return this.http.get<note>(URL, this.httpOptions);
  }

  updateNote(selectedNote: note): Observable<any>{
    const id = selectedNote.id;
    const url = `${this.notesURL}/${id}`;
    return this.http.put(url, selectedNote, this.httpOptions);
  }

  deleteNote(selectedNote: note): Observable<note>{
    const id = selectedNote.id;
    const url = `${this.notesURL}/${id}`;
    console.log(`note id: ${id} is being removed`);
    return this.http.delete<note>(url, this.httpOptions);
  }
  
  addNote(note: note, noteID): Observable<note>{

      note.id = noteID;
      return this.http.post<note>(this.notesURL, note, this.httpOptions).
    pipe(
      tap(_ => console.log(`adding note with id ${note.id}`)),
      catchError(error => {
        console.log(error);
        return new Observable<note>() })
    );
  }

  searchNote(query: string): Observable<note[]>{
    if(!query.trim())
      return of([]);  //give empty contents if search query is empty

    return this.http.get<note[]>(`${this.notesURL}/?content=${query}`, this.httpOptions);
  }

    
}

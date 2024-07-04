import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../enviroments/enviroment';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private backUrl = Enviroment.backUrl + "/note";

  constructor(private httpClient: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${this.backUrl}`);
  }

  getAuthorNotes(token:string, id:string): Observable<Note[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Note[]>(`${this.backUrl}/authorsnotes/${id}`, { headers });
  }

  getRandomNotes(token:string, id: string): Observable<Note[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Note[]>(`${this.backUrl}/random/${id}`, { headers });
  }

  getPublicNotes(token:string, id: string): Observable<Note[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Note[]>(`${this.backUrl}/public/${id}`, { headers });
  }

  getByPriorityNotes(token:string, id: string): Observable<Note[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Note[]>(`${this.backUrl}/priority/1/author/${id}`, { headers });
  }

  createNote(token:string, note: Note) : Observable<Note[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<Note[]>(`${this.backUrl}/create`, note, { headers });
  }

  editNoteById(id: string, updatedNote: Note): Observable<Note> {
    return this.httpClient.put<Note>(`${this.backUrl}/${id}`, updatedNote);
  }

  deleteNoteById(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.backUrl}/${id}`);
  }

  getOneNote(id: string): Observable<Note> {
    return this.httpClient.get<Note>(`${this.backUrl}/${id}`);
  }

  postNote(note:Note): Observable<any>{
    return this.httpClient.post<any>(`${this.backUrl}`, note);
  }
}

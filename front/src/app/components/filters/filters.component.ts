import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  selected = "1"

  myNotes: Note[] = []; 
  randomNotes: Note[] = [];
  publicNotes: Note[] = [];
  myPriorityNotes: Note[] = [];

  constructor(private noteService: NoteService, private authService: AuthService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll()
  {
    const token = this.authService.getToken();
    const id = this.authService.getId();
    if (token && id) {
      this.noteService.getAuthorNotes(token, id).subscribe(data => {
        this.myNotes = data; 
      });
      this.noteService.getRandomNotes(token, id).subscribe(data => {
        this.randomNotes = data;
      }, err => {
        console.log(err);
      })
      this.noteService.getPublicNotes(token, id).subscribe(data => {
        this.publicNotes = data;
      }, err => {
        console.log(err);
      })
      this.noteService.getByPriorityNotes(token, id).subscribe(data => {
        this.myPriorityNotes = data;
      }, err => {
        console.log(err);
      })
    }
  }

  select(x:string)
  {
    this.selected = x
  }

  handleNotify(message: boolean) {
    if(message)
      {
        this.getAll();
      }
  }
}

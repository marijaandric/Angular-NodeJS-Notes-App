import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent {
  selectedNoteType: string = 'for_me'; 
  err:string =''

  constructor(private noteService :NoteService, private authService: AuthService, private router: Router){}

  note : Note = {
    _id:undefined,
    title: '',
    endDate: new Date(),
    date: new Date(),
    author: this.authService.getId(),
    note: '',
    type: 1,
    priority:1,
    public:this.selectedNoteType === "for_me" ? false : true
  }

  addNote()
  {
    const token = this.authService.getToken();
    if(token)
    {
      console.log(this.note);
      this.noteService.createNote(token, this.note).subscribe(data => {
        this.router.navigate(['/']);

      }, err => {
        this.err="Error, please try again."
      })
    }
    
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';


@Component({
  selector: 'app-stickynotes',
  templateUrl: './stickynotes.component.html',
  styleUrls: ['./stickynotes.component.scss']
})
export class StickynotesComponent {
  @Input() color: number | undefined;
  @Input() title: string | undefined;
  @Input() note: string | undefined;
  @Input() id: string | undefined;
  @Input() wholeNote: Note | undefined;
  @Output() isDeleted = new EventEmitter<boolean>();
  isEditing: boolean = false;
  editedNote: string | undefined;
  editedTitle: string | undefined;
  svgPath: string | undefined;
  constructor(private renderer: Renderer2, private elementRef : ElementRef, private noteService: NoteService, private authService: AuthService) { }

  ngOnInit()
  {
    this.svgPath = "../../../assets/icons/"+this.wholeNote?.type+".svg";
    const cardElement = this.elementRef.nativeElement.querySelector('#notes');
    if(this.color == 1)
    {
      this.renderer.setStyle(cardElement, 'background-color', '#E9D2A7');
      if(this.wholeNote?.priority === 1 && this.wholeNote.author === this.authService.getId())
      {
        this.renderer.setStyle(cardElement, 'background-color', '#cfa14c');
      }
    }
    else if(this.color == 2)
    {
      this.renderer.setStyle(cardElement, 'background-color', '#C0E9A7');
      if(this.wholeNote?.priority === 1 && this.wholeNote.author === this.authService.getId())
        {
          this.renderer.setStyle(cardElement, 'background-color', '#83cf55');
        }
    }
    else if(this.color == 3)
    {
      this.renderer.setStyle(cardElement, 'background-color', '#A7DFE9');
      if(this.wholeNote?.priority === 1 && this.wholeNote.author === this.authService.getId())
        {
          this.renderer.setStyle(cardElement, 'background-color', '#64b6c4');
        }
    }
    else if(this.color == 4)
    {
      this.renderer.setStyle(cardElement, 'background-color', '#B3A7E9');
      if(this.wholeNote?.priority === 1 && this.wholeNote.author === this.authService.getId())
        {
          this.renderer.setStyle(cardElement, 'background-color', '#7460cc');
        }
    }
    else{
      this.renderer.setStyle(cardElement, 'background-color', '#E9A7E0');
      if(this.wholeNote?.priority === 1 && this.wholeNote.author === this.authService.getId())
        {
          this.renderer.setStyle(cardElement, 'background-color', '#913a85');
        }
    }
  }

  delete()
  {
    if(this.id)
    {
      this.noteService.deleteNoteById(this.id).subscribe(data => {
        this.isDeleted.emit(true);
      })
    }
  }

  edit()
  {
    if(this.editedNote && this.editedTitle && this.wholeNote)
    {
      const updatedNote: Note = {
        ...this.wholeNote,  
        _id: this.id,
        note: this.editedNote,
        title: this.editedTitle
      };
      if(this.id && this.wholeNote)
        {
          this.noteService.editNoteById(this.id, updatedNote).subscribe(data => {
            this.isEditing = false;
            this.isDeleted.emit(true);
          })
        }
    }
  }

  checkUser()
  {
    return this.wholeNote?.author === this.authService.getId()
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editedNote = undefined;
      this.editedTitle = undefined;
    } else {
      this.editedNote = this.note;
      this.editedTitle = this.title
    }
  }
}

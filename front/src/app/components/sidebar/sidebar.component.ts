import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private authService:AuthService, private router: Router){}

  logout()
  {
    this.authService.deleteToken();
    this.router.navigate(["/login"])
  }

  modal()
  {
    
  }
}

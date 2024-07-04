import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService:AuthService,private router: Router){}
  formData : User = {
    username:"",
    password:""
  }

  onSubmit()
  {
    this.authService.login(this.formData).subscribe(response => {
      this.authService.saveTokenAndIdToStorage(response.token)
      this.router.navigate(['/home']);
    }, error => {
      console.error(error);
      alert("Error. Please check all fields.")
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/userRegister.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService:AuthService, private router: Router){}
  formData : UserRegister = {
    name:"",
    username:"",
    password:""
  }

  onSubmit()
  {
    if (!this.formData.name || !this.formData.username || !this.formData.password) {
      alert("All fields are required.");
      return;
    }

    if (this.formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    
    this.authService.register(this.formData).subscribe(response => {
      if(response.token == "UsernamePostoji")
      {
        alert("Username already exists.")
      }
      else{
        this.authService.saveTokenAndIdToStorage(response.token);
        this.router.navigate(['/home']);
      }
    }, error => {
      console.error(error);
      alert("Error. Please fill all fields.")
    });
  }
}

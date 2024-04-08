import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private router: Router, private userService: UserService) { } // Inject Router

  makeLoginRequest() {
    this.userService.login(this.username, this.password);
    this.router.navigate(['/game']); // Navigate to 'game'
    console.log('Login request made');
  }

  makeRegisterRequest() {
    this.userService.register(this.username, this.password);
  }
}

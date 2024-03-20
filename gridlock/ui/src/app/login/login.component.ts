import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {} // Inject Router

  makeLoginRequest() {
    this.router.navigate(['/game']); // Navigate to 'game'
    console.log('Login request made');
  }
}

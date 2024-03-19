import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {} // Inject Router

  goToDashboard() {
    this.router.navigate(['/dashboard']); // Navigate to 'dashboard'
  }
}

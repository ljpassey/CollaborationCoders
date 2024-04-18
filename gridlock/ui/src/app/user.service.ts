import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  helloWorld() {
    this.http.get('http://localhost:3000').subscribe((response) => {
      console.log('response :>> ', response);
    });
  }

  register(username: string, password: string) {
    this.http
      .post('http://localhost:3000/register', { username, password })
      .subscribe((response) => {
        console.log('response :>> ', response);
      });
  }

  login(username: string, password: string) {
    this.http
      .post('http://localhost:3000/login', { username, password })
      .subscribe((response: any) => {
        console.log('response :>> ', response);
        if (response.success) {
          localStorage.setItem('token', response.token);
          // Redirect to the home page
          // Inject Router
          // Add Router to the constructor
          // Navigate to the home page
          this.router.navigate(['/game']);
        }
      });
  }

  logout() {}
}

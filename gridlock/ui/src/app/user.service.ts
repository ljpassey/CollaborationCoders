import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  hostGame(gameboard: JSON, currentPlayer: string) {
    this.http
      .post('http://localhost:3000/game', {
        gameboard,
        currentPlayer,
      })
      .subscribe((response: any) => {
        console.log('response :>> ', response);
      });
  }

  register(username: string, password: string) {
    this.http
      .post('http://localhost:3000/register', { username, password })
      .subscribe((response: any) => {
        console.log('response :>> ', response);
        if (response.success) {
          this.login(username, password);
        }
      });
  }

  login(username: string, password: string) {
    this.http
      .post('http://localhost:3000/login', { username, password })
      .subscribe((response: any) => {
        console.log('response :>> ', response);
        if (response.success) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/game']);
        }
      });
  }

  logout() {}
}

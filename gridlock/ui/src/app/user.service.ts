import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  helloWorld() {
    this.http.get('http://localhost:3000').subscribe((response) => {
      console.log('response :>> ', response);
    });
  }

  // TODO - implement
  register() {}
  login(username: string, password: string) {
    this.http.post('http://localhost:3000/login', {username, password}).subscribe((response) => {
      console.log('response :>> ', response);
    });
  }
  logout() {}
}

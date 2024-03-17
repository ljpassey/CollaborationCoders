import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  helloWorld() {
    this.http.get('http://localhost:3000').subscribe((response) => {
      console.log('response :>> ', response);
    })
  }

  // TODO - implement
  register() { }
  login() { }
  logout() { }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../pages/models/user';

var apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<User[]>(`${apiUrl}/api/users`);
  }

  getById(id: number){
    return this.http.get(`${apiUrl}/api/user/${id}`);
  }

  register(user: User){
    return this.http.post(`${apiUrl}/api/user/register`, user);
  }

  update(user: User){
    return this.http.put(`${apiUrl}/api/user/${user.id}`, user);
  }

  delete(id: number){
    return this.http.delete(`${apiUrl}/api/user/${id}`);
  }
}

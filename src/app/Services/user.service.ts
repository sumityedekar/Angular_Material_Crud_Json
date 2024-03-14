import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:3000/users";
  constructor(private http:HttpClient) { }

  addUser(data:any){
    return this.http.post(this.url, data);
  }

  updateUser(id:number, data:any){
    return this.http.put(this.url+`/${id}`, data);
  }

  getUser(){
    return this.http.get(this.url);
  }

  deleteUser(id:number){
    return this.http.delete(this.url+`/${id}`);
  }
}

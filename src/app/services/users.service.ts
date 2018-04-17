import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { User } from "./../user";
import { Ticket } from "./../Ticket";
import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/Rx";

@Injectable()
export class UsersService {
  //url = 'http://localhost:3000/users';
  url = "http://localhost:18747/api/TShopSkiItemsApis";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    //return this.http.get(this.url + '?_sort=id&_order=desc');
    return this.http.get<User[]>(this.url + "?_sort=ProductName&_order=desc");
  }

  getUserById(ApplicationID: string, ProductID: number): Observable<Ticket[]> {
    const _url = `${this.url}/${ApplicationID}/${ProductID}`;
    return this.http.get<Ticket[]>(_url);
  }
}

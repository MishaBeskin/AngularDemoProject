import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private model = 'users';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(this.getUrl());
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  getDataByFilter(value) {
    const users = this.http.get(this.getUrl());
    return users.pipe(filter((user) => user === value));
  }
}

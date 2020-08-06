import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


const BASE_URL = 'http://localhost:3000';

@Injectable()
export class ActionsService {
  constructor(private http: HttpClient) {}

  single() {
    return this.http.get(`${BASE_URL}/action`);
  }

  all() {
    return this.http.get(`${BASE_URL}/actions`);
  }
}


import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ENDPOINT_URI } from '../constants';

import 'rxjs/add/operator/map';

@Injectable()
export class ActionsService {
  constructor(private http: Http) {}

  single() {
    return this.http.get(`${ENDPOINT_URI}/action`)
      .map(res => res.json());
  }

  all() {
    return this.http.get(`${ENDPOINT_URI}/actions`)
      .map(res => res.json());
  }
}


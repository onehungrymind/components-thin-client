import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ENDPOINT_URI } from '../constants';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {
  model = '/projects';

  constructor(private http: Http) {}

  get url() {
    return `${ENDPOINT_URI}${this.model}`;
  }

  all() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  create(project) {
    return this.http.post(this.url, project);
  }

  update(project) {
    return this.http.put(`${this.url}/${project.id}`, project);
  }

  delete(id) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

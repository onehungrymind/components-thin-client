import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';

const BASE_URL = 'http://localhost:5000';

export class SocketService {
  private socket;
  private subjects = {};

  constructor() {
    this.socket = io(BASE_URL);
    this.socket.on('update', data => this.next(data));
  }

  select(key) {
    this.subjects[key] = new Subject();
    return this.subjects[key].asObservable();
  }

  next(data) {
    for (const key in this.subjects) {
      if (this.subjects.hasOwnProperty(key)) {
        this.subjects[key].next(data[key]);
      }
    }
  }

  dispatch(action) {
    this.socket.emit('dispatch', action);
  }
}

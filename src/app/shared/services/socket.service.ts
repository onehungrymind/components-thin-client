import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

const BASE_URL = 'http://localhost:5000';

export class SocketService {
  private socket;

  dispatch(action) {
    this.socket.emit('dispatch', action);
  }

  connect() {
    return new Observable(observer => {
      this.socket = io(BASE_URL);
      this.socket.on('update', data => observer.next(data));

      return () => {
        this.socket.disconnect();
      };
    });
  }
}

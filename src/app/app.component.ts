import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from './shared/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    { path: '/home', icon: 'home', label: 'Home'},
    { path: '/clients', icon: 'face', label: 'Clients'},
    { path: '/projects', icon: 'work', label: 'Projects'}
  ];

  constructor(private store: Store<reducers.AppState>) { }

  undo() {
    this.store.dispatch({type: 'UNDO'});
  }

  redo() {
    this.store.dispatch({type: 'REDO'});
  }
}

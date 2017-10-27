import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from './shared/reducers';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/skip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    {path: '/home', icon: 'home', label: 'Home'},
    {path: '/clients', icon: 'face', label: 'Clients'},
    {path: '/projects', icon: 'work', label: 'Projects'}
  ];

  actions = [
    {type: '[Client] Select', payload: {id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
    {type: '[Client] Select', payload: {id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
    {type: '[Client] Select', payload: {id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
    {type: '[Client] Select', payload: {id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
    {type: '[Client] Select', payload: {id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
    {type: '[Client] Select', payload: {id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
  ];

  index = 0;
  timerInterval = 500;
  action = '{ "type": "[Client] Select", "payload": { "id": "1", "firstName": "John", "lastName": "Doe", "company": "Acme, Inc"}}';
  rawActions = `[
    { "type": "[Client] Select", "payload": { "id": "1", "firstName": "John", "lastName": "Doe", 	"company": "Acme, Inc"}},
    { "type": "[Client] Select", "payload": { "id": "2", "firstName": "Jane", "lastName": "Smith", 	"company": "Super, Inc"}},
    { "type": "[Client] Select", "payload": { "id": "1", "firstName": "John", "lastName": "Doe", 	"company": "Acme, Inc"}},
    { "type": "[Client] Select", "payload": { "id": "2", "firstName": "Jane", "lastName": "Smith", 	"company": "Super, Inc"}},
    { "type": "[Client] Select", "payload": { "id": "1", "firstName": "John", "lastName": "Doe", 	"company": "Acme, Inc"}},
    { "type": "[Client] Select", "payload": { "id": "2", "firstName": "Jane", "lastName": "Smith", 	"company": "Super, Inc"}}
  ]`;
  remoteActions: AngularFirestoreCollection<any>;

  constructor(private store: Store<reducers.AppState>, private afs: AngularFirestore) {
    this.remoteActions = afs.collection('actions');

    // REMOTE DISPATCH
    this.remoteActions.valueChanges()
      .skip(1)
      .subscribe((actions: any) => {
        this.store.dispatch(actions[0]);
      });

    /* REMOTE PLAYBACK
    this.remoteActions.valueChanges()
      .subscribe((actions: any) => {
        this.actions = actions;
        this.cycle();
      });
      */
  }

  dispatchRemote(action) {
    this.remoteActions.add(JSON.parse(action));
  }

  undo() {
    this.store.dispatch({type: 'UNDO'});
  }

  redo() {
    this.store.dispatch({type: 'REDO'});
  }

  step() {
    this.store.dispatch(this.actions[this.index]);

    this.index = this.index < this.actions.length - 1 ? this.index + 1 : 0;
  }

  cycle() {
    const result = Observable
      .from(this.actions)
      .zip(Observable.interval(this.timerInterval), (a, b) => a)
    ;

    result.subscribe(action => this.store.dispatch(action));
  }

  dispatch(action) {
    this.store.dispatch(JSON.parse(action));
  }

  dispatchCycle(rawActions) {
    const actions = JSON.parse(rawActions);
    const result = Observable
      .from(actions)
      .zip(Observable.interval(this.timerInterval), (a, b) => a)
    ;

    result.subscribe((action: any) => this.store.dispatch(action));
  }
}

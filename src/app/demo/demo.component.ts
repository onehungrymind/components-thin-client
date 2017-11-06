import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ActionsService, Store } from '../shared/services/';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  @ViewChild('stepEditor') stepEditor;
  @ViewChild('cycleEditor') cycleEditor;
  @ViewChild('remoteEditor') remoteEditor;

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
  action = '';
  rawActions = '';
  remoteActions: AngularFirestoreCollection<any>;

  constructor(
    private actionsService: ActionsService,
    private store: Store,
    private afs: AngularFirestore
  ) {
    this.remoteActions = afs.collection('actions');
  }

  ngOnInit() {
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

    this.initEditor(this.stepEditor);
    this.initEditor(this.cycleEditor);
    this.initEditor(this.remoteEditor);
  }

  initEditor(editor) {
    editor.setTheme('monokai');

    editor.setMode('json');

    editor.getEditor().setOptions({
      showLineNumbers: false,
      showGutter: false,
      tabSize: 2
    });
  }

  // STEP O1: Manual step
  step() {
    this.index = this.index < this.actions.length - 1 ? this.index + 1 : 0;
    this.store.dispatch(this.actions[this.index]);

  }

  // STEP O2: Manual cycle
  cycle() {
    const that = this;
    const result = Observable
      .from(this.actions)
      .zip(Observable.interval(this.timerInterval), (a, b) => {
        // THIS IS NAUGHTY!
        this.index = b;
        // THIS IS AWESOME!
        return a;
      })
    ;

    result.subscribe(action => this.store.dispatch(action));
  }

  // STEP O3: Dynamic step
  fetchSingle() {
    this.actionsService
      .single()
      .subscribe(action => this.action = JSON.stringify(action, null , '\t'));
  }

  dispatch(action) {
    this.store.dispatch(JSON.parse(action));
  }

  // STEP O4: Dynamic cycle
  fetchAll() {
    this.actionsService
      .all()
      .subscribe(actions => this.rawActions = JSON.stringify(actions, null , '\t'));
  }

  dispatchCycle(rawActions) {
    const actions = JSON.parse(rawActions);
    const result = Observable
      .from(actions)
      .zip(Observable.interval(this.timerInterval), (a, b) => a)
    ;

    result.subscribe((action: any) => this.store.dispatch(action));
  }

  // STEP 05: Remote step
  dispatchRemote(action) {
    this.remoteActions.add(JSON.parse(action));
  }

  // HISTORY
  undo() {
    this.store.dispatch({type: 'UNDO'});
  }

  redo() {
    this.store.dispatch({type: 'REDO'});
  }
}

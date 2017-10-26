import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client } from '../shared/models/client.model';
import * as reducers from '../shared/reducers';
import * as ClientActions from '../shared/actions/client.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients$: Observable<Client[]>;
  currentClient$: Observable<Client>;

  constructor(private store: Store<reducers.AppState>) {
    this.clients$ = store.select(reducers.getClients);
    this.currentClient$ = store.select(reducers.getSelectedClient);
  }

  ngOnInit() {
    this.store.dispatch(new ClientActions.LoadAction());

    this.resetCurrentClient();
  }

  /* THIS IS A TEST
  index = 0;
  test() {
    const actions = [
      { type: '[Client] Select', payload: { id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
      { type: '[Client] Select', payload: { id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
      { type: '[Client] Select', payload: { id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
      { type: '[Client] Select', payload: { id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
      { type: '[Client] Select', payload: { id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
      { type: '[Client] Select', payload: { id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
    ];

    this.store.dispatch(actions[this.index]);

    this.index = this.index < actions.length - 1 ? this.index + 1 : 0;
  }
  */

  resetCurrentClient() {
    const newClient: Client = { id: null, firstName: '', lastName: '', company: '' };
    this.store.dispatch(new ClientActions.SelectAction(newClient));
  }

  setCurrentClient(client) {
    this.store.dispatch(new ClientActions.SelectAction(client));
  }

  cancel() {
    this.resetCurrentClient();
  }

  saveClient(client) {
    if (!client.id) {
      this.createClient(client);
    } else {
      this.updateClient(client);
    }
  }

  createClient(client) {
    this.store.dispatch(new ClientActions.CreateAction(client));
    this.resetCurrentClient();
  }

  updateClient(client) {
    this.store.dispatch(new ClientActions.UpdateAction(client));
    this.resetCurrentClient();
  }

  deleteClient(client) {
    this.store.dispatch(new ClientActions.DeleteAction(client.id));
    this.resetCurrentClient();
  }
}

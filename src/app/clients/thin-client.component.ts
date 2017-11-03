import { Component, OnInit } from '@angular/core';
import { SocketService } from '../shared/services/socket.service';
import { Client } from '../shared/models/client.model';
import * as ClientActions from '../shared/actions/client.actions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-thin-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ThinClientComponent implements OnInit {
  clients$: Observable<Client[]>;
  currentClient$: Observable<Client>;

  // WE HAVE CHANGED THIS...
  constructor(private store: SocketService) { }

  ngOnInit() {
    // ... AND THIS!
    this.store.connect()
      .subscribe((state: any) => {
        this.clients$ = of(state.clients);
        this.currentClient$ = of(state.selectedClient);
      });

    this.resetCurrentClient();
  }

  resetCurrentClient() {
    const newClient: Client = {id: null, firstName: '', lastName: '', company: ''};
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
    this.store.dispatch(new ClientActions.DeleteAction(client));
    this.resetCurrentClient();
  }
}

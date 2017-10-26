import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import * as ClientActions from '../actions/client.actions';
export type Action = ClientActions.All;

import { ClientsService } from '../services/clients.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientEffects {
  @Effect() load$ = this.actions$
    .ofType(ClientActions.LOAD)
    .switchMap(() => this.clientsService.all())
    .map(clients => new ClientActions.LoadActionSuccess(clients))
  ;

  @Effect() create$ = this.actions$
    .ofType(ClientActions.CREATE)
    .map((action: Action) => action.payload)
    .switchMap(client => {
      return this.clientsService.create(client)
        .catch(() => Observable.of(ClientActions.CREATE_FAILED));
    })
    .map(result => new ClientActions.LoadAction())
  ;

  @Effect() update$ = this.actions$
    .ofType(ClientActions.UPDATE)
    .map((action: Action) => action.payload)
    .switchMap(client => this.clientsService.update(client))
    .map(result => new ClientActions.LoadAction())
  ;

  @Effect() delete$ = this.actions$
    .ofType(ClientActions.DELETE)
    .map((action: Action) => action.payload)
    .switchMap(clientId => this.clientsService.delete(clientId))
    .map(result => new ClientActions.LoadAction())
  ;

  constructor(
    private clientsService: ClientsService,
    private actions$: Actions
  ) { }
}

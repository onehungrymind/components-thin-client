import { createSelector } from '@ngrx/store';
import { Client } from '../models/client.model';

import * as ClientActions from '../actions/client.actions';
export type Action = ClientActions.All;

export interface State {
  ids: string[];
  entities: { [id: string]: Client};
  selectedClientId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedClientId: null
};

export const makeClientKeys = (clients: Client[]) => clients.map(client => client.id);

export const makeClientEntities = (clients: Client[]) => clients.reduce((entities: { [id: string]: Client }, client: Client) => {
  return Object.assign(entities, {
    [client.id]: client
  });
}, {});

export const transformClients = (state = initialState, action: Action): State => {
  const clients = action.payload;

  return {
    ids: makeClientKeys(clients),
    entities: makeClientEntities(clients),
    selectedClientId: state.selectedClientId
  };
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ClientActions.LOAD_SUCCESS:
      return transformClients(state, action);
    case ClientActions.SELECT:
      return {
        ids: state.ids,
        entities: state.entities,
        selectedClientId: action.payload.id
      };
    case ClientActions.CLEAR:
      return {
        ids: state.ids,
        entities: state.entities,
        selectedClientId: null
      };
    default: {
      return state;
    }
  }
}

// -------------------------------------------------------------------
// Selectors
// -------------------------------------------------------------------
export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedClientId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

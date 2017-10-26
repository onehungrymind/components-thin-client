import { ActionReducer, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as clients from './clients.reducer';
import * as projects from './projects.reducer';
import { environment } from '../../../environments/environment';

export interface AppState {
  clients: clients.State;
  projects: projects.State;
}

export const reducers = {
  clients: clients.reducer,
  projects: projects.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}


export function undoable(reducer: ActionReducer<any>): ActionReducer<any> {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, { type: ''}),
    future: []
  };

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [ present, ...future ]
        };
      case 'REDO':
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [ ...past, present ],
          present: next,
          future: newFuture
        };
      default:
        console.log('default', action);
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action);
        console.log(newPresent);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [ ...past, present ],
          present: newPresent,
          future: []
        };
    }
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [logger, storeFreeze, undoable]
  : [];

// -------------------------------------------------------------------
// Clients Selectors
// -------------------------------------------------------------------
export const getClientsState = (state: AppState) => state.clients;
export const getClientIds = createSelector(getClientsState, clients.getIds);
export const getClientEntities = createSelector(getClientsState, clients.getEntities);
export const getSelectedClient = createSelector(getClientsState, clients.getSelected);
export const getClients = createSelector(getClientEntities, getClientIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

// -------------------------------------------------------------------
// Projects Selectors
// -------------------------------------------------------------------
export const getProjectsState = (state: AppState) => state.projects;
export const getProjectIds = createSelector(getProjectsState, projects.getIds);
export const getProjectEntities = createSelector(getProjectsState, projects.getEntities);
export const getSelectedProject = createSelector(getProjectsState, projects.getSelected);
export const getProjects = createSelector(getProjectEntities, getProjectIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

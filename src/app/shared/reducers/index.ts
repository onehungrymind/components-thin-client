import { createSelector } from '@ngrx/store';

import * as clients from './clients.reducer';
import * as projects from './projects.reducer';

export interface AppState {
  clients: clients.State;
  projects: projects.State;
}

export const reducers = {
  clients: clients.reducer,
  projects: projects.reducer
};

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

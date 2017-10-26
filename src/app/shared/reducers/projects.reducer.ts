import { createSelector } from '@ngrx/store';
import { Project } from '../models/project.model';

import * as ProjectActions from '../actions/project.actions';
export type Action = ProjectActions.All;


export interface State {
  ids: string[];
  entities: { [id: string]: Project};
  selectedProjectId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedProjectId: null
};

export const makeProjectKeys = (clients: Project[]) => clients.map(client => client.id);

export const makeProjectEntities = (clients: Project[]) => clients.reduce((entities: { [id: string]: Project }, client: Project) => {
  return Object.assign(entities, {
    [client.id]: client
  });
}, {});

export const transformProjects = (state = initialState, action: Action): State => {
  const clients = action.payload;

  return {
    ids: makeProjectKeys(clients),
    entities: makeProjectEntities(clients),
    selectedProjectId: state.selectedProjectId
  };
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ProjectActions.LOAD_SUCCESS:
      return transformProjects(state, action);
    case ProjectActions.SELECT:
      return {
        ids: state.ids,
        entities: state.entities,
        selectedProjectId: action.payload.id
      };
    case ProjectActions.CLEAR:
      return {
        ids: state.ids,
        entities: state.entities,
        selectedProjectId: null
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

export const getSelectedId = (state: State) => state.selectedProjectId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

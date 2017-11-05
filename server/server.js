'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuidv4 = require('uuid/v4');

// ACTIONS
const CLIENT_LOAD    = '[Client] Load';
const CLIENT_CREATE  = '[Client] Create';
const CLIENT_UPDATE  = '[Client] Update';
const CLIENT_DELETE  = '[Client] Delete';
const CLIENT_SELECT  = '[Client] Select';
const CLIENT_CLEAR   = '[Client] Clear';
const PROJECT_LOAD    = '[Project] Load';
const PROJECT_CREATE  = '[Project] Create';
const PROJECT_UPDATE  = '[Project] Update';
const PROJECT_DELETE  = '[Project] Delete';
const PROJECT_SELECT  = '[Project] Select';
const PROJECT_CLEAR   = '[Project] Clear';

// STORE
const clients = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Acme, Inc'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    company: 'Super, Inc'
  }
];

const newClient = { id: null, firstName: '', lastName: '', company: '' };

const projects = [
  {
    id: '1',
    name: 'First Project',
    description: 'Cash cow!',
    client_id: '1'
  },
  {
    id: '2',
    name: 'Second Project',
    description: 'Gravy train!',
    client_id: '2'
  }
];

const newProject = { id: null, name: '', description: '' };

const initialState = {
  clients,
  currentClient: newClient,
  projects,
  currentProject: newProject
};

const initialHistoryState = {
  past: [],
  present: {},
  future: []
};

class Store {
  constructor(reducer, initialHistoryState ) {
    this.reducer = reducer;
    this.state = initialHistoryState;
  }

  getState() {
    return this.state.present;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
  }
}

// REDUCER
const selectClient = (state, payload) => {
  return {
    clients: state.clients,
    currentClient: payload
  };
};

const clearClient = (state, payload) => {
  return {
    clients: state.clients,
    currentClient: newClient
  };
};

const createClient = (state, payload) => {
  const newClient = Object.assign({}, payload, {id: uuidv4()});
  return {
    clients: [...state.clients, newClient],
    currentClient: state.currentClient
  };
};

const updateClient = (state, payload) => {
  return {
    clients: state.clients.map(client => {
      return client.id === payload.id ? Object.assign({}, client, payload) : client;
    }),
    currentClient: state.currentClient
  };
};

const deleteClient = (state, payload) => {
  return {
    clients: state.clients.filter(client => client.id !== payload.id),
    currentClient: state.currentClient
  };
};

const selectProject = (state, payload) => {
  return {
    projects: state.projects,
    currentProject: payload
  };
};

const clearProject = (state, payload) => {
  return {
    projects: state.projects,
    currentProject: newProject
  };
};

const createProject = (state, payload) => {
  const newProject = Object.assign({}, payload, {id: uuidv4()});
  return {
    projects: [...state.projects, newProject],
    currentProject: state.currentProject
  };
};

const updateProject = (state, payload) => {
  return {
    projects: state.projects.map(project => {
      return project.id === payload.id ? Object.assign({}, project, payload) : project;
    }),
    currentProject: state.currentProject
  };
};

const deleteProject = (state, payload) => {
  return {
    projects: state.projects.filter(project => project.id !== payload.id),
    currentProject: state.currentProject
  };
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case CLIENT_LOAD:
      return state;
    case CLIENT_SELECT:
      return selectClient(state, payload);
    case CLIENT_CREATE:
      return createClient(state, payload);
    case CLIENT_UPDATE:
      return updateClient(state, payload);
    case CLIENT_DELETE:
      return deleteClient(state, payload);
    case CLIENT_CLEAR:
      return clearClient(state, payload);
    case PROJECT_LOAD:
      return state;
    case PROJECT_SELECT:
      return selectProject(state, payload);
    case PROJECT_CREATE:
      return createProject(state, payload);
    case PROJECT_UPDATE:
      return updateProject(state, payload);
    case PROJECT_DELETE:
      return deleteProject(state, payload);
    case PROJECT_CLEAR:
      return clearProject(state, payload);
    default:
      return state;
  }
};

const undoable = function(reducer, initialState) {
  // Call the reducer with empty action to populate the initial state
  const initialHistoryState = {
    past: [],
    present: reducer(initialState, { type: ''}),
    future: []
  };

  // Return a reducer that handles undo and redo
  return function (state = initialHistoryState, action) {
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
};

// SOCKET
io.on('connection', (socket) => {
  console.log('user connected');

  const store = new Store(undoable(reducer, initialState));

  socket.on('dispatch', action => {
    store.dispatch(action);
    io.emit('update', store.getState());
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(5000, () => {
  console.log('started on port 5000');
});

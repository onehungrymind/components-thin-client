'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

// ACTIONS
const LOAD    = '[Client] Load';
const CREATE  = '[Client] Create';
const UPDATE  = '[Client] Update';
const DELETE  = '[Client] Delete';
const SELECT  = '[Client] Select';
const CLEAR   = '[Client] Clear';

// STORE
const clients = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    company: 'Acme, Inc'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    company: 'Super, Inc'
  }
];

const newClient = { id: null, firstName: '', lastName: '', company: '' };

const initialState = {
  clients,
  selectedClient: newClient
};

class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
  }
}

// REDUCER
const selectClient = (state, payload) => {
  return {
    clients: state.clients,
    selectedClient: payload
  };
};

const clearClient = (state, payload) => {
  return {
    clients: state.clients,
    selectedClient: newClient
  };
};

const createClient = (state, payload) => {
  return {
    clients: [...state.clients, payload],
    selectedClient: state.selectedClient
  };
};

const updateClient = (state, payload) => {
  return {
    clients: state.clients.map(client => {
      return client.id === payload.id ? Object.assign({}, client, payload) : client;
    }),
    selectedClient: state.selectedClient
  };
};

const deleteClient = (state, payload) => {
  return {
    clients: state.clients.filter(client => client.id !== payload.id),
    selectedClient: state.selectedClient
  };
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOAD:
      return state;
    case SELECT:
      return selectClient(state, payload);
    case CREATE:
      return createClient(state, payload);
    case UPDATE:
      return updateClient(state, payload);
    case DELETE:
      return deleteClient(state, payload);
    case CLEAR:
      return clearClient(state, payload);
    default:
      return state;
  }
};

// SOCKET
io.on('connection', (socket) => {
  console.log('user connected');

  const store = new Store(reducer, initialState);

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

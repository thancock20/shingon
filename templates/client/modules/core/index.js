import actions from './actions';
import routes from './routes.jsx';
import methodStubs from './configs/method_stubs';
import initialState from './configs/initial_state';
import initializeState from '/lib/initialize_state';

export default {
  routes,
  actions,
  load(context) {
    methodStubs(context);
    initializeState(context, initialState);
  }
};

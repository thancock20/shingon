import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from './components/main_layout.jsx';
import Home from './components/home.jsx';

export default function (injectDeps, {Meteor}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  Meteor.startup(() => {
    ReactDOM.render(
      (<Router
        history={browserHistory}
        onUpdate={() => {window.scrollTo(0, 0);}}>
        <Route
          path="/"
          component={MainLayoutCtx}>
          <IndexRoute component={Home} />
        </Route>
      </Router>),
      document.querySelector('#reactRoot')
    );
  });
}

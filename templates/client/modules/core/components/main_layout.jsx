import React from 'react';
import Helmet from 'react-helmet';

import styles from '/client/styles/index.js';
import Load from '/lib/load_jss';
Load(styles, 'global');

const Layout = ({content = () => null }) => (
  <div>
    <Helmet
      defaultTitle="<%= appName %>"
      titleTemplate="<%= appName %> | %s"
      meta={[
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ]}
    />
    <div>
      {content()}
    </div>
  </div>
);

export default Layout;

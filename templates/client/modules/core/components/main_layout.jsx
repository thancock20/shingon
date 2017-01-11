import React from 'react';
import Helmet from 'react-helmet';

const Layout = ({children}) => (
  <div>
    <Helmet
      defaultTitle="<%= appName %>"
      titleTemplate="<%= appName %> | %s"
      meta={[
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ]}
    />
    <div>
      {children}
    </div>
  </div>
);

export default Layout;

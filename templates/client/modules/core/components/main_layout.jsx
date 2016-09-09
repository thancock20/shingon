import React from 'react';
import Helmet from 'react-helmet';

import styles from '../../../styles/index.js';
import load from '../../../../lib/style_loader';
load(styles);

const Layout = ({content = () => null }) => (
  <div>
    <Helmet
      defaultTitle="<%= appName %>"
      titleTemplate="<%= appName %> - %s"
    />
    <div>
      {content()}
    </div>
  </div>
);

export default Layout;

import { configure, setAddon, addDecorator } from '@kadira/storybook';
import { setStubbingMode } from 'react-komposer';

setStubbingMode(true);

import styles from '/client/styles/index';
import Load from '/lib/load_jss';
Load(styles, 'global');

function loadStories() {
  // require as many as stories you need.
  require('../client/modules/core/components/.stories/index.js');
}

configure(loadStories, module);

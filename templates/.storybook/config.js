import { configure, setAddon, addDecorator } from '@kadira/storybook';
import { setStubbingMode } from 'react-komposer';

setStubbingMode(true);

function loadStories() {
  // require as many as stories you need.
  require('../client/modules/core/components/.stories/index.js');
}

configure(loadStories, module);

import objectMerge from 'object-merge';
import normalize from './normalize';
import global from './global.js';

export default objectMerge(
  normalize,
  global
);

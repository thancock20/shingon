import { _generate } from './utils';

export function generateModel(name, options, config) {
  _generate('collection', null, name, {model: true}, config);
}

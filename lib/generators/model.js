import { generate } from '../../dist/commands';
import { _generateTest } from './utils';

export function generateModel(name, options, config) {
  generate('collection', name, {model: true});
  generate('method', name, {model: true});
  generate('publication', name, {model: true});

  _generateTest('model', null, name, config);
}

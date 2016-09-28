import { generate, destroy } from '../../dist/commands';
import { _generateTest, removeFile, getTestOutputPath } from './utils';

export function generateModel(name, options, config) {
  generate('collection', name, {model: true});
  generate('method', name, {model: true});
  generate('publication', name, {model: true});

  _generateTest('model', null, name, config);
}

export function destroyModel(name) {
  destroy('collection', name);
  destroy('method', name);
  destroy('publication', name);

  removeFile(getTestOutputPath('model', name));
}

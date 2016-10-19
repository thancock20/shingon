import { generate, destroy } from '../../dist/commands';
import { _generateTest, removeFile, getTestOutputPath } from './utils';

export function generateModel(name, options, config) {
  options.model = true;
  generate('collection', name, options);
  generate('method', name, options);
  generate('publication', name, options);

  _generateTest('model', null, name, config);
}

export function destroyModel(name) {
  destroy('collection', name);
  destroy('method', name);
  destroy('publication', name);

  removeFile(getTestOutputPath('model', name));
}

import { generate } from '../../dist/commands';

export function generateModel(name, options, config) {
  generate('collection', name, {model: true});
  generate('method', name, {model: true});
}

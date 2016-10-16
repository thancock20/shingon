import {generateAction} from '../generators/action';
import {generateComponent} from '../generators/component';
import {generateContainer} from '../generators/container';
import {generateCollection} from '../generators/collection';
import {generateMethod} from '../generators/method';
import {generatePublication} from '../generators/publication';
import {generateModel} from '../generators/model';
import {generateMethodStub} from '../generators/method_stub';
import {generateModule} from '../generators/module';
import {generateSkeleton} from '../generators/skeleton';

/**
 * Get a generator given an entity type. Returns undefined if there is no
 * generator for the type.
 *
 * @param type {String} - type of entity to generate
 * @return generator {Function} - generator for that entity
 */
export function getGenerator(type) {
  const generatorMap = {
    action: generateAction,
    component: generateComponent,
    container: generateContainer,
    collection: generateCollection,
    method: generateMethod,
    publication: generatePublication,
    model: generateModel,
    'method-stub': generateMethodStub,
    module: generateModule,
    skeleton: generateSkeleton
  };

  return generatorMap[type];
}

function validateName(name) {
  let entityName;
  if (/.*:.*/.test(name)) {
    const split = name.split(':');
    if (split.length !== 2) {
      return false;
    }
    entityName = split[1];
  } else {
    entityName = name;
  }

  if (entityName.indexOf('.') > -1) {
    return false;
  }

  return true;
}

export default function generate(type, name, options = {}) {
  let generator = getGenerator(type);
  let config = {tabSize: 2};

  if (!generator) {
    console.log(`Could not find a generator for ${type}`);
    console.log('Run `shingon generate --help` for more options.');
    return;
  }

  if (!validateName(name)) {
    console.log(`${name} is an invalid name`);
    console.log('Name of the file cannot contain any dots.');
    return;
  }

  generator(name, options, config);
}

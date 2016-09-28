import {destroyAction} from '../generators/action';
import {destroyComponent} from '../generators/component';
import {destroyContainer} from '../generators/container';
import {destroyCollection} from '../generators/collection';
import {destroyMethod} from '../generators/method';
import {destroyPublication} from '../generators/publication';
import {destroyModel} from '../generators/model';
import {destroyModule} from '../generators/module';
import _ from 'lodash';

export default function destroy(type, name) {
  if(_.isEmpty(name)) {
    console.log('Please specify a name for the ${type} to destroy:');
    console.log('shingon destroy ${type} <name>');
    return;
  }
  let destroyFn = getDestroyFn(type);
  if (! destroyFn) {
    console.log(`Invalid type ${type}`);
    console.log('Run `shingon destroy --help` for more options.');
    return;
  }

  destroyFn(name);
}

function getDestroyFn(type) {
  const destroyFnMap = {
    action: destroyAction,
    component: destroyComponent,
    container: destroyContainer,
    collection: destroyCollection,
    method: destroyMethod,
    publication: destroyPublication,
    model: destroyModel,
    module: destroyModule
  };

  return destroyFnMap[type];
}

import {
  _generate, ensureModuleNameProvided, ensureModuleExists,
  removeFile, getOutputPath, updateIndexFile
} from './utils';

export function generateMethodStub(name, options, config) {
  let [moduleName, entityName] = name.split(':');

  ensureModuleNameProvided(name);
  ensureModuleExists(moduleName);

  _generate('method-stub', moduleName, entityName, options, config);
}

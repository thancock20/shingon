import _ from 'lodash';
import {
  _generate, ensureModuleNameProvided, ensureModuleExists,
  removeFile, getOutputPath, updateIndexFile, removeFromIndexFile
} from './utils';

export function generateMethodStub(name, options, config) {
  let [moduleName, entityName] = name.split(':');

  ensureModuleNameProvided(name);
  ensureModuleExists(moduleName);

  _generate('method-stub', moduleName, entityName, options, config);
  updateIndexFile({
    indexFilePath: `./client/modules/${moduleName}/configs/method_stubs/index.js`,
    exportBeginning: 'export default function (context) {',
    insertImport: `import ${entityName} from './${_.snakeCase(entityName)}';`,
    insertExport: `  ${entityName}(context);`
  });
}

export function destroyMethodStub(name) {
  let [moduleName, entityName] = name.split(':');

  ensureModuleNameProvided(name);
  ensureModuleExists(moduleName);

  removeFile(getOutputPath('method-stub', entityName, moduleName));

  removeFromIndexFile(`./client/modules/${moduleName}/configs/method_stubs/index.js`, entityName);
}

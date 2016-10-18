import { generate } from '../../dist/commands';
import { ensureModuleNameProvided, ensureModuleExists } from './utils';
import inquirer from 'inquirer';

export function generateTree(name, options, config) {
  let [moduleName, entityName] = name.split(':');
  const useClass = options.useClass;

  ensureModuleNameProvided(name);
  ensureModuleExists(moduleName);

  function prompt(componentsArray) {
    if (componentsArray.length === 0) return;

    const output = [];

    const componentNameFull = componentsArray.shift();
    const [componentName, classSwitch] = componentNameFull.split('/');

    const questions = [
      {
        type: 'input',
        name: 'child',
        message: `Child of '${componentName}' (ENTER for none):`
      }
    ];

    function ask() {
      inquirer.prompt(questions).then(function (answers) {
        if (answers.child !== '') {
          output.push(answers.child);
          ask();
        } else {
          options.useClass = useClass || classSwitch === 'c';
          if (output.length !== 0) {
            options.children = output.map((child) => child.split('/')[0]);
          } else {
            options.children = null;
          }
          generate('component', `${moduleName}:${componentName}`, options);
          const newComponentsArray = output.concat(componentsArray);
          prompt(newComponentsArray);
        }
      });
    }

    ask();
  }

  prompt([entityName]);
}

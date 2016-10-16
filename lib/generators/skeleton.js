import { generate } from '../../dist/commands';
import { ensureModuleNameProvided, ensureModuleExists } from './utils';
import inquirer from 'inquirer';

function prompt(moduleName, componentsArray) {
  if (componentsArray.length === 0) return;

  const output = [];

  const componentName = componentsArray.pop();

  const questions = [
    {
      type: 'input',
      name: 'child',
      message: `Child of ${componentName}`
    }
  ];

  function ask() {
    inquirer.prompt(questions).then(function (answers) {
      if (answers.child !== '') {
        output.push(answers.child);
        ask();
      } else {
        if (output.length !== 0) {
          generate('component', `${moduleName}:${componentName}`, {children: output});
        } else {
          generate('component', `${moduleName}:${componentName}`);
        }
        const newComponentsArray = componentsArray.concat(output.reverse());
        prompt(moduleName, newComponentsArray);
      }
    });
  }

  ask();
}

export function generateSkeleton(name, options, config) {
  let [moduleName, entityName] = name.split(':');

  ensureModuleNameProvided(name);
  ensureModuleExists(moduleName);

  prompt(moduleName, [entityName]);
}

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

    const componentName = componentsArray.shift();
    const classPrompt = useClass ? '' : ` or '/c' to use class for '${componentName}'`;

    const questions = [
      {
        type: 'input',
        name: 'child',
        message: `Child of '${componentName}' (ENTER for none${classPrompt}):`
      }
    ];

    function ask() {
      inquirer.prompt(questions).then(function (answers) {
        if (answers.child !== '' && answers.child !== '/c') {
          output.push(answers.child);
          ask();
        } else {
          options.useClass = (useClass || answers.child === '/c') ? true : false;
          options.children = output.length !== 0 ? output : null;
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

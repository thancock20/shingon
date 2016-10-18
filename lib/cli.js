import program from 'commander';
import pkg from '../package.json';
import {create, generate, destroy} from './commands';

program
  .version(pkg.version);

program
  .command('create [appPath]')
  .alias('c')
  .option('-v, --verbose', 'show output of scripts in the console')
  .description('create a new application')
  .action(function (appPath, options) {
    create(appPath, options);
  });

program
  .command('generate [type] [name]')
  .alias('g')
  .option('-c, --use-class', 'extend React.Component class when generating components')
  .option('-s, --schema [value]', 'specify a schema solution to use for Mongo collections')
  .description('generate an entity with the name provided')
  .action(function (type, name, options) {
    generate(type, name, options);
  })
  .on('--help', function () {
    console.log('  Choose from the following generator types:');
    console.log('');
    console.log('  action, component, container, collection, method, publication, model, method-stub, module, tree');
    console.log('');
    console.log('  You need to provide module name for action, component, container, method-stub, and tree');
    console.log("  Format your 'name' argument in the form of moduleName:entityName");
    console.log('');
    console.log('  e.g. `shingon generate action core:post`');
  });

program
  .command('destroy [type] [name]')
  .alias('d')
  .option('-c, --with-component', 'destroy component as well when destroying containers')
  .description('delete files generated for the given type and name')
  .action(function (type, name, options) {
    destroy(type, name, options);
  });

program.parse(process.argv);

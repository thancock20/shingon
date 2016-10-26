import fs from 'fs';
import path from 'path';
import {execSync} from 'child_process';
import {checkFileExists, createDir, getFileContent, createFile, getLineBreak} from '../utils';
import {logger} from '../logger';
import shelljs from 'shelljs/shell';

export default function create(appPath, options) {
  if (checkFileExists(`${shelljs.pwd()}/.meteor`)) {
    console.log('You are already in a Meteor project');
    return;
  }
  if (!appPath) {
    console.log('Please supply the path of project');
    console.log('Run `shingon create --help` for more options.');
    return;
  }
  const lineBreak = getLineBreak();
  let appName = path.basename(appPath).replace(/\..*$/, '');

  createDir(`${appPath}`);

  if (process.env.NODE_ENV !== 'test') {
    logger.invoke('init');
    shelljs.set('-e');
    let currentPath = shelljs.pwd();
    shelljs.exec(`meteor create ${appPath}`, {silent: !options.verbose});
    shelljs.cd(appPath);
    shelljs.rm('-rf', ['client', 'server']);
    `kadira:flow-router${lineBreak}`.toEnd('.meteor/packages');
    `jagi:astronomy@2.0.0${lineBreak}`.toEnd('.meteor/packages');
    `reywood:publish-composite${lineBreak}`.toEnd('.meteor/packages');
    shelljs.exec(`meteor remove autopublish`, {silent: !options.verbose});
    shelljs.exec(`meteor remove insecure`, {silent: !options.verbose});
    shelljs.cd(currentPath);
  }

  createFile(`${__dirname}/../../templates/client/configs/context.js`,
           `${appPath}/client/configs/context.js`);
  createFile(`${__dirname}/../../templates/client/main.js`,
           `${appPath}/client/main.js`);
  createFile(`${__dirname}/../../templates/client/modules/core/index.js`,
           `${appPath}/client/modules/core/index.js`);
  createFile(`${__dirname}/../../templates/client/modules/core/routes.jsx`,
           `${appPath}/client/modules/core/routes.jsx`);
  createDir(`${appPath}/client/modules/core/containers`);
  createFile(`${__dirname}/../../templates/client/modules/core/configs/method_stubs/index.js`,
           `${appPath}/client/modules/core/configs/method_stubs/index.js`);
  createFile(`${__dirname}/../../templates/client/modules/core/configs/initial_state.js`,
           `${appPath}/client/modules/core/configs/initial_state.js`);
  createDir(`${appPath}/client/modules/core/libs`);
  createFile(`${__dirname}/../../templates/client/modules/core/actions/index.js`,
           `${appPath}/client/modules/core/actions/index.js`);
  createFile(`${__dirname}/../../templates/client/modules/core/components/main_layout.jsx`,
           `${appPath}/client/modules/core/components/main_layout.jsx`, {appName: appName});
  createFile(`${__dirname}/../../templates/client/modules/core/components/home.jsx`,
           `${appPath}/client/modules/core/components/home.jsx`);

  createFile(`${__dirname}/../../templates/lib/collections/index.js`,
           `${appPath}/lib/collections/index.js`);
  createFile(`${__dirname}/../../templates/lib/default_methods.js`,
           `${appPath}/lib/default_methods.js`);
  createFile(`${__dirname}/../../templates/lib/get_unpublished_fields.js`,
           `${appPath}/lib/get_unpublished_fields.js`);
  createFile(`${__dirname}/../../templates/lib/initialize_state.js`,
           `${appPath}/lib/initialize_state.js`);
  createDir(`${appPath}/server/configs`);
  createFile(`${__dirname}/../../templates/server/main.js`,
           `${appPath}/server/main.js`);
  createFile(`${__dirname}/../../templates/server/methods/index.js`,
           `${appPath}/server/methods/index.js`);
  createFile(`${__dirname}/../../templates/server/publications/index.js`,
           `${appPath}/server/publications/index.js`);
  createDir(`${appPath}/tests/gagarin`);
  createFile(`${__dirname}/../../templates/package.tt`,
          `${appPath}/package.json`, {appName: appName});
  createFile(`${__dirname}/../../templates/gitignore.tt`,
          `${appPath}/.gitignore`);
  createFile(`${__dirname}/../../templates/eslintrc.tt`,
          `${appPath}/.eslintrc`);
  createFile(`${__dirname}/../../templates/babelrc.tt`,
          `${appPath}/.babelrc`);
  createFile(`${__dirname}/../../templates/.scripts/mocha_boot.tt`,
          `${appPath}/.scripts/mocha_boot.js`);

  createDir(`${appPath}/.storybook`);
  createFile(`${__dirname}/../../templates/.storybook/config.js`,
    `${appPath}/.storybook/config.js`);
  createFile(`${__dirname}/../../templates/.storybook/addons.js`,
    `${appPath}/.storybook/addons.js`);


  createDir(`${appPath}/client/modules/core/components/.stories`);
  createFile(`${__dirname}/../../templates/client/modules/core/components/.stories/index.js`,
    `${appPath}/client/modules/core/components/.stories/index.js`);
  // Generate test directories
  createDir(`${appPath}/client/modules/core/containers/tests`);
  createDir(`${appPath}/client/modules/core/actions/tests`);
  createDir(`${appPath}/client/modules/core/components/tests`);

  if (process.env.NODE_ENV !== 'test') {
    logger.invoke('after_init');
    shelljs.set('-e');
    let currentPath = shelljs.pwd();
    shelljs.cd(appPath);
    shelljs.exec('npm install', {silent: !options.verbose});
    shelljs.cd(currentPath);
  }

  console.log('');
  console.log(`Created a new app using Mantra spec. v0.2.0 at ${appPath}`);
  console.log('');
  console.log('To run your app:');
  console.log(`  cd ${appPath}`);
  console.log(`  meteor`);
  console.log('');
  console.log('For the full Mantra specifications, see: https://kadirahq.github.io/mantra');
}

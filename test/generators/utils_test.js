import {expect} from 'chai';
import path from 'path';
import fse from 'fs-extra';
import _ from 'lodash';

import * as utils from '../../lib/generators/utils';

describe("removeWholeLine", function() {
  it("removes the whole line on which the given string appears", function() {
    let line = '{\n  User,\n  Posts,\n  Comments}';
    let result = utils.removeWholeLine(line, 'User');
    expect(result).to.equal('{\n  Posts,\n  Comments}');
  });

  it("removes the whole line on which the given regex matches", function() {
    let line = '{\n  User,\n  Posts,\n  Comments}';
    let result = utils.removeWholeLine(line, /[a-zA-Z]{5}/g);
    expect(result).to.equal('{\n  User,\n  Comments}');
  });
});

describe("removeFromIndexFile", function() {
  let dummyPath = path.resolve(__dirname, '../../tmp/removeFromIndexFile.js');

  afterEach(function() {
    // Cleanup
    fse.removeSync(dummyPath);
  });

  it("removes import/export lines - capitalizeVarName", function() {
    // Setup
    fse.outputFileSync(dummyPath, `
import Comments from './comments';
import Users from './users';
import Posts from './posts';

export {
  Commnets,
  Users,
  Posts
};
`
    );

    utils.removeFromIndexFile(dummyPath, 'users', {capitalizeVarName: true});
    let result = fse.readFileSync(dummyPath, {encoding: 'utf-8'});
    expect(result).to.equal(`
import Comments from './comments';
import Posts from './posts';

export {
  Commnets,
  Posts
};
`
    );
  });

  it("removes import/export lines", function() {
    // Setup
    fse.outputFileSync(dummyPath, `
import comments from './comments';
import users from './users';

export default function () {
  comments();
  users();
}
`
    );

    utils.removeFromIndexFile(dummyPath, 'users', {capitalizeVarName: false});
    let result = fse.readFileSync(dummyPath, {encoding: 'utf-8'});
    expect(result).to.equal(`
import comments from './comments';

export default function () {
  comments();
}
`
    );
  });
});

describe("getOutputPath", function() {
  it("returns a correct output path for collection", function() {
    let result = utils.getOutputPath('collection', 'users');
    expect(result).to.equal('./lib/collections/users.js');
  });

  it("returns a correct output path for method", function() {
    let result = utils.getOutputPath('method', 'users');
    expect(result).to.equal('./server/methods/users.js');
  });

  it("returns a correct output path for publication", function() {
    let result = utils.getOutputPath('publication', 'users');
    expect(result).to.equal('./server/publications/users.js');
  });

  it("returns a correct output path for action", function() {
    let result = utils.getOutputPath('action', 'users', 'core');
    expect(result).to.equal('./client/modules/core/actions/users.js');
  });

  it("returns a correct output path for container", function() {
    let result = utils.getOutputPath('container', 'user_list', 'core');
    expect(result).to.equal('./client/modules/core/containers/user_list.js');
  });

  it("returns a correct output path for component", function() {
    let result = utils.getOutputPath('component', 'user_list', 'core');
    expect(result).to.equal('./client/modules/core/components/user_list.jsx');
  });

  it("returns a correct output path for a storybook", function() {
    let result = utils.getOutputPath('storybook', 'user_list', 'core');
    expect(result).to.equal('./client/modules/core/components/.stories/user_list.js');
  });
});

describe("getTemplateVaraibles", function() {
  describe("for components", function() {
    let expected = {
      componentName: 'UserList',
      moduleName: 'core',
      childrenImports: null,
      childrenComponents: null
    };

    it("gets template variables - variation 1", function() {
      let result = utils.getTemplateVaraibles('component', 'core', 'userList');
      console.log(result);
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 2", function() {
      let result = utils.getTemplateVaraibles('component', 'core', 'user_list');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 3", function() {
      let result = utils.getTemplateVaraibles('component', 'core', 'UserList');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });
  });

  describe("for storybook", function() {
    let expected = {
      moduleName: "core",
      componentName: 'UserList',
      componentFileName: 'user_list'
    };

    it("gets template variables - variation 1", function() {
      let result = utils.getTemplateVaraibles('storybook', 'core', 'userList');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 2", function() {
      let result = utils.getTemplateVaraibles('storybook', 'core', 'user_list');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 3", function() {
      let result = utils.getTemplateVaraibles('storybook', 'core', 'UserList');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });
  });

  describe("for containers", function() {
    let expected = {
      componentName: 'UserList',
      componentFileName: 'user_list',
      moduleName: 'core'
    };

    it("gets template variables - variation 1", function() {
      let result = utils.getTemplateVaraibles('container', 'core', 'userList');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 2", function() {
      let result = utils.getTemplateVaraibles('container', 'core', 'user_list');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 3", function() {
      let result = utils.getTemplateVaraibles('container', 'core', 'UserList');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });
  });

  describe("for collections", function() {
    let expected = {
      collectionName: 'PullRequests',
      collectionFileName: 'pull_requests',
    };

    it("gets template variables - variation 1", function() {
      let result = utils.getTemplateVaraibles('collection', null, 'pullRequests');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 2", function() {
      let result = utils.getTemplateVaraibles('collection', null, 'pull_requests');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 3", function() {
      let result = utils.getTemplateVaraibles('collection', null, 'PullRequests');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets templates variables with collection2 option", function() {
      let result = utils.getTemplateVaraibles('collection', null, 'PullRequests', {schema: 'collection2'});
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets templates variables with astronomy option", function() {
      let result = utils.getTemplateVaraibles('collection', null, 'PullRequests', {schema: 'astronomy'});
      let matched = _.isEqual(result, {
        collectionName: 'PullRequests',
        collectionFileName: 'pull_requests',
        className: 'PullRequest'
      });
      expect(matched).to.equal(true);
    });
  });

  describe("for methods", function() {
    let expected = {
      collectionName: 'PullRequests',
      methodFileName: 'pull_requests'
    };

    it("gets template variables - variation 1", function() {
      let result = utils.getTemplateVaraibles('method', null, 'pullRequests');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 2", function() {
      let result = utils.getTemplateVaraibles('method', null, 'pull_requests');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 3", function() {
      let result = utils.getTemplateVaraibles('method', null, 'PullRequests');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });
  });

  describe("for publications", function() {
    let expected = {
      collectionName: 'PullRequests',
      publicationFileName: 'pull_requests'
    };

    it("gets template variables - variation 1", function() {
      let result = utils.getTemplateVaraibles('publication', null, 'pullRequests');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 2", function() {
      let result = utils.getTemplateVaraibles('publication', null, 'pull_requests');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("gets template variables - variation 3", function() {
      let result = utils.getTemplateVaraibles('publication', null, 'PullRequests');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });
  });
});

describe("checkForModuleName", function() {
  it("returns true if module name is provided", function() {
    let result = utils.checkForModuleName('core:user_list');
    expect(result).to.equal(true);
  });

  it("returns false if module name is provided", function() {
    let result = utils.checkForModuleName('user_list');
    expect(result).to.equal(false);
  });
});

describe("getTestTemplateVaraibles", function() {
  describe("for components", function() {
    let expected = {
      componentName: 'HeaderMenu',
      componentFileName: 'header_menu',
      moduleName: 'user_management'
    };

    it("getes templates varaibles - variation 1", function() {
      let result = utils.getTestTemplateVaraibles('component', 'user_management', 'headerMenu');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("getes templates varaibles - variation 2", function() {
      let result = utils.getTestTemplateVaraibles('component', 'userManagement', 'headerMenu');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("getes templates varaibles - variation 3", function() {
      let result = utils.getTestTemplateVaraibles('component', 'UserManagement', 'header_menu');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });
  });

  describe("for actions", function() {
    let expected = {
      actionFileName: 'flagged_comments',
      moduleName: 'core'
    };

    it("getes templates varaibles - variation 1", function() {
      let result = utils.getTestTemplateVaraibles('action', 'core', 'flagged_comments');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("getes templates varaibles - variation 2", function() {
      let result = utils.getTestTemplateVaraibles('action', 'core', 'flaggedComments');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });
  });

  describe("for containers", function() {
    let expected = {
      containerFileName: 'comment_lists',
      moduleName: 'core'
    };

    it("getes templates varaibles - variation 1", function() {
      let result = utils.getTestTemplateVaraibles('container', 'core', 'comment_lists');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });

    it("getes templates varaibles - variation 2", function() {
      let result = utils.getTestTemplateVaraibles('container', 'core', 'comment_lists');
      let matched = _.isEqual(result, expected);
      expect(matched).to.equal(true);
    });
  });
});

describe("getTemplatePath", function() {
  it("gets template path for collection - collection2", function() {
    let result = utils.getTemplatePath('collection', {schema: 'collection2'});
    expect(result).to.match(/generic_collection2.tt/);
  });
});

describe("compileTemplate", function() {
  it("applies tabSize", function() {
    let content = `function() {
  if (true) {
    console.log('hello world');
  }
}
`;
    let result = utils.compileTemplate(content, {}, {tabSize: 4});
    expect(result).to.equal(`function() {
    if (true) {
        console.log('hello world');
    }
}
`);
  });
});

describe("readTemplateContent", function() {
  it("returns the default content if no config is provided", function() {
    let options = {};
    let configs = {};
    let defaultTemplatePath = path.resolve(__dirname, '../../templates/client/modules/core/actions/generic.tt');

    let result = utils.readTemplateContent('action', options, configs);
    let expected = fse.readFileSync(defaultTemplatePath);

    expect(result.equals(expected)).to.equal(true);
  });

  it("returns the custom content if config is provided", function() {
    let options = {};
    let customContent = 'hello world';
    let configs = {templates: [{name: 'action', text: customContent}]};
    let result = utils.readTemplateContent('action', options, configs);

    expect(result).to.equal(customContent);
  });
});

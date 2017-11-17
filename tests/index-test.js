const describe = QUnit.module;
const it = QUnit.test;

const fs = require('fs');
const co = require('co');
const execa = require('execa');
const createTempDir = require('broccoli-test-helper').createTempDir;
const rootWorkingDirectory = process.cwd();

const DEFAULT_ESLINT_CONFIG = `
{
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "extends": "eslint:recommended"
}
`;

describe('qunit-eslint', function(hooks) {
  let input;

  hooks.beforeEach(co.wrap(function* (assert) {
    input = yield createTempDir();

    process.chdir(input.path());

    fs.symlinkSync(`${rootWorkingDirectory}/node_modules`, `${input.path()}/node_modules`);
    fs.symlinkSync(`${rootWorkingDirectory}`, `${input.path()}/node_modules/qunit-eslint`);
  }));

  hooks.afterEach(co.wrap(function* () {
    process.chdir(rootWorkingDirectory);

    yield input.dispose();

    // remove symlink to project root
    fs.unlinkSync(`${rootWorkingDirectory}/node_modules/qunit-eslint`);
  }));

  it('should run linting', function(assert) {
    input.write({
      ".eslintrc": DEFAULT_ESLINT_CONFIG,
      "lib": {
        "index.js": `function foo() {};`
      },
      "tests": {
        "lint-test.js": `const lint = require('qunit-eslint');\n lint(['lib/**/*.js']);`
      }
    });

    return execa('qunit', [`tests/lint-test.js`])
      .then(null, (result) => {
        assert.pushResult({
          result: result.stdout.includes('no-extra-semi'),
          actual: result.stdout
        });
      });
  });
});

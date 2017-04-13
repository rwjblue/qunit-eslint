'use strict';

const path = require('path');
const walkSync = require('walk-sync');
const CLIEngine = require('eslint').CLIEngine;

module.exports = function lint(paths) {
  let eslintCLI = new CLIEngine({});
  let baseDir = process.cwd(); // TODO: make this configuratable

  let files = walkSync(baseDir, {
    globs: paths,
    directories: false,
  });

  QUnit.module('eslint');

  files.forEach((filePath) => {
    QUnit.test(`should have no errors in ${filePath}`, function(assert) {
      let report = eslintCLI.executeOnFiles([filePath]);
      let formatter = eslintCLI.getFormatter();

      assert.pushResult({
        result: report.errorCount === 0,
        message: formatter(report.results)
      });
    });
  });
};

# qunit-eslint

An easy way to run ESLint against your project within your normal QUnit tests.

Inspired by [mocha-eslint](https://github.com/BadgeLabs/mocha-eslint).

## Installation

```js
yarn add --dev qunit-eslint
```

Or:

```js
npm install --save-dev qunit-eslint
```

You must already have `qunitjs` installed into your project.

## Usage

After `qunit-eslint` is installed, you can use it by creating a single test file that looks like:

```js
const lint = require('qunit-eslint');

lint(['lib/**/*.js', 'tests/**/*.js']);
```

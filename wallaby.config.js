module.exports = wallaby => ({
  files: [
    'src/**/*',
    'test/**/*',
    '!test/**/*.test.js'
  ],

  tests: [
    'test/**/*.test.js'
  ],

  env: {
    type: 'node',
    runner: 'node',
    params: {
      env: 'CANVAS_API_KEY=123'
    }
  },

  testFramework: 'ava',

  setup: () => require('babel-polyfill'),

  compilers: {
    '**/*.js': wallaby.compilers.babel()
  }
});

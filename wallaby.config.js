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
      env: 'CANVAS_API_KEY=Bearer 9285~dnG0s6xTbZGvTMWT0WSsaGZtlGJrh9iLvMJCZhaqMPA4BVgEHzR9iCYS5JITwyJa'
    }
  },

  testFramework: 'ava',

  setup: () => require('babel-polyfill'),

  compilers: {
    '**/*.js': wallaby.compilers.babel()
  }
});

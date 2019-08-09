// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  seleniumAddress: 'http://hub.browserstack.com/wd/hub',
  allScriptsTimeout: 30000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    project: 'ionic-showcase',
    browserName: '',
    device: 'Google Pixel',
    app: process.env.BROWSERSTACK_APP,
    autoWebview: true,
    'browserstack.user': process.env.BROWSERSTACK_USER,
    'browserstack.key': process.env.BROWSERSTACK_KEY,
    'browserstack.debug': true,
    'browserstack.networkLogs': true,
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};

const env = require('./src/infrastructure/config/environment')
const jestScript =
  env.USING_DOCKER === 'true' ? "sh docker-test-staged.sh" : "npm run test:staged"

module.exports = {
  "*.js": [
    jestScript,
    "./node_modules/.bin/eslint --fix",
    "git add"
  ]
}
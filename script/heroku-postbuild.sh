#!/usr/bin/env bash

set -e

#
# Inspect variables to analyze the current deployment environment
#

# If DYNO is not empty and NODE_HOME contains the substring "heroku/", then we
# can assume we are running on Heroku
if [[ ! -z "${DYNO}" && "${NODE_HOME}" =~ .*"heroku/".* ]]; then
  IS_HEROKU=true
fi

# If DATABASE_URL is not empty and NODE_ENV is "production", then we are deploying the backend
if [[ ! -z "${DATABASE_URL}" && "${NODE_ENV}" == "production" ]]; then
  IS_BACKEND=true
fi


# Fail hard if we are not running on Heroku
if [[ "${IS_HEROKU}" != "true" ]]l; then
  echo "❌ ERROR! Cannot run this script outside of Heroku." >&2
  exit 1
fi

# Otherwise, run the relevant `npm run deploy:*` command
if [[ "${IS_BACKEND}" == "true" ]]; then
  # Run the build/deploy operations
  npm run deploy:be

  # Retrieve the value of `scripts.be-start` from the package.json file
  STARTUP_SCRIPT=$(npm pkg get scripts.be-start)
else
  # Run the build/deploy operations
  npm run deploy:fe

  # Retrieve the value of `scripts.fe-start` from the package.json file
  STARTUP_SCRIPT=$(npm pkg get scripts.fe-start)
fi

# Remove trailing quote
STARTUP_SCRIPT="${STARTUP_SCRIPT%\"}"
# Remove leading quote
STARTUP_SCRIPT="${STARTUP_SCRIPT#\"}"
# Overwrite the value of `scripts.start` in the package.json file
npm set-script start "${STARTUP_SCRIPT}"

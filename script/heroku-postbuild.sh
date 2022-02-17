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
  # Retrieve the value of `scripts.be-start` from the package.json file
  BACKEND_STARTUP=$(npm pkg get scripts.be-start)
  # Remove trailing quote
  BACKEND_STARTUP="${BACKEND_STARTUP%\"}"
  # Remove leading quote
  BACKEND_STARTUP="${BACKEND_STARTUP#\"}"
  # Overwrite the value of `scripts.start` in the package.json file
  npm set-script start "${BACKEND_STARTUP}"

  # Run the build/deploy operations
  npm run deploy:be
else
  # Retrieve the value of `scripts.fe-start` from the package.json file
  FRONTEND_STARTUP=$(npm pkg get scripts.fe-start)
  # Remove trailing quote
  FRONTEND_STARTUP="${FRONTEND_STARTUP%\"}"
  # Remove leading quote
  FRONTEND_STARTUP="${FRONTEND_STARTUP#\"}"
  # Overwrite the value of `scripts.start` in the package.json file
  npm set-script start "${FRONTEND_STARTUP}"

  # Run the build/deploy operations
  npm run deploy:fe
fi

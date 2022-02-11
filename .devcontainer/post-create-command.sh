#!/usr/bin/env bash

set -e

# Install all dependencies
npm install

# Setup the database
npm run db:create
npm run db:migrate
npm run db:seed

# TODO?
# Clone the frontend repo

#SCRIPT_DIR="$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)"
#WORKSPACES_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
#REPO_NAME="amplify-front-end"
#REPO_OWNER="ProgramEquity"

#cd "${WORKSPACES_DIR}"
#if [ ! -d "$REPO_NAME" ]; then
#  git clone "https://github.com/$REPO_OWNER/$REPO_NAME"
#else
#  echo "Already cloned '$REPO_OWNER/$REPO_NAME' into '$REPO_NAME' directory"
#fi

# TODO?
# Start the server
#npm start

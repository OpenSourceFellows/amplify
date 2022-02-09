#!/usr/bin/env bash

set -e

# Copy our welcome message
if [ -f "./.devcontainer/welcome-message.txt" ]; then
  cp --force ./.devcontainer/welcome-message.txt /usr/local/etc/vscode-dev-containers/first-run-notice.txt
fi

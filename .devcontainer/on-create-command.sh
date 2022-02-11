#!/usr/bin/env bash

set -e

# Copy our welcome message
if [ -f "./.devcontainer/first-run-notice.txt" ]; then
  sudo cp --force ./.devcontainer/first-run-notice.txt /usr/local/etc/vscode-dev-containers/first-run-notice.txt
fi

#!/usr/bin/env bash

set -e

# Copy our welcome message
if [ -f "./.devcontainer/welcome-message.txt" ]; then
  cat ./.devcontainer/welcome-message.txt
fi

#!/bin/sh

# This script is the entrypoint for the Docker container

# Create the /workdir directory
mkdir -p /workdir

# Run cspell on all files in the current directory and its subdirectories
# The output is redirected to spellcheck-results.txt
cspell . > /workdir/spellcheck-results.txt

# Run the Node.js script named index.js
# node index.js
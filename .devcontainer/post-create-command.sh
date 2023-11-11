#!/usr/bin/env bash

set -e

# Install all dependencies
npm install

# Setup the database
npm run db:create
npm run db:migrate
npm run db:seed

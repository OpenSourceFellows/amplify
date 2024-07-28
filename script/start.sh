#! /bin/bash

docker compose -f .docker/docker-compose.yml up -d

echo "Entering container..."

docker exec -it amplify_app /bin/sh

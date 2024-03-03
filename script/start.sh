#! /bin/bash

docker-compose -f .docker/docker-compose.yml up -d

echo "Entering container..."

docker exec -it docker_amplify_1 /bin/sh

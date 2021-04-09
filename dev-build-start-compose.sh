#!/bin/bash
if [[ $# -lt 1 ]] ; then
    printf '\nUsage: ./dev-build-start-compose.sh <1 or more dev service separated by spaces>\n'
    printf '\te.g. ./dev-build-start-compose.sh frontend \n\n'
    exit 1
else
    compose_command="docker-compose -f docker-compose.yml"
    for override_files in "$@"
    do
      if [ -f ./compose-overrides/$override_files-override.yml ]; then
        compose_command="$compose_command -f ./compose-overrides/$override_files-override.yml"
      fi
    done
fi

docker pull marcnuri/port-forward

# Build the containers from the original docker compose file
# docker compose overrides do not let us remove the build command
# from docker-compose file
docker-compose build

echo $compose_command

$compose_command up --remove-orphans -d

docker-compose logs -f

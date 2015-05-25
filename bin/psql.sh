#!/bin/bash
# access postgres shell

DOCKER_CONFIG=${DOCKER_CONFIG:-docker-compose-db.yml}
docker-compose -f $DOCKER_CONFIG run --rm psql psql -h db -U django django
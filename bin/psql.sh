#!/bin/bash
# access postgres shell

DOCKER_CONFIG=${DOCKER_CONFIG:-docker-compose-db.yml}
docker-compose -f $DOCKER_CONFIG run psql
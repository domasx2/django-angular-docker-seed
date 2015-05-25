#!/bin/bash
#start developemnt server on :8000

DOCKER_CONFIG=${DOCKER_CONFIG:-docker-compose.yml}
docker-compose -f $DOCKER_CONFIG build

if  [ $(docker-compose -f $DOCKER_CONFIG ps | grep "dbdata" | wc -l) == 0 ]; then
    echo "initializing db"
    docker-compose -f $DOCKER_CONFIG run --rm db postgres --version
fi

docker-compose -f $DOCKER_CONFIG run --rm django migrate
docker-compose -f $DOCKER_CONFIG up
#!/bin/bash
#run django admin command

for i in $*;
do
    params=" $params $d$i"
done

DOCKER_CONFIG=${DOCKER_CONFIG:-docker-compose-prod.yml}
docker-compose -f $DOCKER_CONFIG run django $params
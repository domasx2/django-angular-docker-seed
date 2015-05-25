#!/bin/bash
#builds frontend to frontend/dist

DOCKER_CONFIG=${DOCKER_CONFIG:-docker-compose.yml}
docker-compose -f $DOCKER_CONFIG run --rm frontend gulp build-prod
docker-compose -f $DOCKER_CONFIG run --rm django python manage.py collectstatic --noinput
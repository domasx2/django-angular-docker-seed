#!/bin/bash
# stops production server, rebuilds images, builds frontend, runs migrations, starts production server on :80

DOCKER_CONFIG=${DOCKER_CONFIG:-docker-compose-prod.yml}

docker-compose -f $DOCKER_CONFIG stop
./bin/db_backup.sh _pre_deploy
docker-compose build frontend
docker-compose run frontend gulp build-prod

#cinitialize database container if it's missing
if  [ $(docker-compose -f $DOCKER_CONFIG ps | grep "dbprod" | wc -l) == 0 ]; then
    echo "initializing db"
    docker-compose -f $DOCKER_CONFIG run dbprod postgres --version
fi

docker-compose -f $DOCKER_CONFIG build
docker-compose -f $DOCKER_CONFIG run djangoprod python manage.py migrate --noinput
docker-compose -f $DOCKER_CONFIG run djangoprod python manage.py collectstatic --noinput
docker-compose -f $DOCKER_CONFIG up -d
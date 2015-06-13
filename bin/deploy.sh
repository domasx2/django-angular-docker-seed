#!/bin/bash
# stops production server, rebuilds images, builds frontend, runs migrations, starts production server on :80

DOCKER_CONFIG=${DOCKER_CONFIG:-docker-compose-prod.yml}

./bin/stop_production.sh
./bin/db_backup.sh _pre_deploy
docker-compose build frontend
docker-compose run --rm frontend gulp build-prod

#cinitialize database container if it's missing
if  [ $(docker-compose -f $DOCKER_CONFIG ps | grep "db" | wc -l) == 0 ]; then
    echo "initializing db"
    docker-compose -f $DOCKER_CONFIG run --rm db postgres --version
fi

docker-compose -f $DOCKER_CONFIG build
docker-compose -f $DOCKER_CONFIG run --rm djangoprod python manage.py migrate --noinput
docker-compose -f $DOCKER_CONFIG run --rm djangoprod python manage.py collectstatic --noinput
./bin/start_production.sh
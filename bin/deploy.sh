#!/bin/bash
# stops production server, rebuilds images, builds frontend, runs migrations, starts production server on :80

export DOCKER_CONFIG=${DOCKER_CONFIG:-docker-compose-prod.yml}

./bin/stop_production.sh
./bin/init_db.sh
./bin/db_backup.sh _pre_deploy
docker-compose build frontend
docker-compose run --rm frontend gulp build-prod
docker-compose -f $DOCKER_CONFIG build
docker-compose -f $DOCKER_CONFIG run --rm djangoprod python manage.py migrate --noinput
docker-compose -f $DOCKER_CONFIG run --rm djangoprod python manage.py collectstatic --noinput
./bin/start_production.sh
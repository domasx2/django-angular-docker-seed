DOCKER_CONFIG=docker-compose-prod.yml

git pull
docker-compose -f docker-compose-prod.yml stop
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
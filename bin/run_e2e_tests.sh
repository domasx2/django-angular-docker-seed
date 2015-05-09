#!/bin/bash
#this will start test server, start tests then stop test server

DOCKER_CONFIG=${DOCKER_CONFIG:-docker-compose-e2e-test.yml}
PTOR_CONFIG=${PTOR_CONFIG:-e2e-tests/protractor.conf.js}
TEST_SERVER_URL=${TEST_SERVER_URL:-http://localhost:8001}

if [ $(docker-compose -f $DOCKER_CONFIG ps | grep "djangoe2e" | grep "Up" | wc -l) != 0 ]; then
    echo "stopping running containers"
    docker-compose -f $DOCKER_CONFIG stop
fi

if  [ $(docker-compose -f $DOCKER_CONFIG ps | grep "dbdatae2e" | wc -l) == 0 ]; then
    echo "initializing db"
    docker-compose -f $DOCKER_CONFIG run dbe2e postgres --version
fi

if  ! [ -d e2e-tests/node_modules ]; then
    echo "installing e2e test deps"
    cd e2e-tests
    npm install 
    cd ..
fi

#start testserver in background
echo "starting test server"
docker-compose -f $DOCKER_CONFIG up -d

#wait until django starts
while true; do
    echo "waiting for django to start..."
    if  [ $(curl -s -o /dev/null -w "%{http_code}" $TEST_SERVER_URL) == 200 ]; then
        break
    else
        sleep 1
    fi
done

echo "starting e2e tests"
#run tests
./e2e-tests/node_modules/protractor/bin/protractor $PTOR_CONFIG

#kill django
echo "stopping test server"
docker-compose -f $DOCKER_CONFIG stop
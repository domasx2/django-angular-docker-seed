[![Dependency Status](https://www.versioneye.com/user/projects/551d7c9c971f7847ca000010/badge.svg?style=flat)](https://www.versioneye.com/user/projects/551d7c9c971f7847ca000010)
[![Dependency Status](https://www.versioneye.com/user/projects/551d7ca6971f78433900000e/badge.svg?style=flat)](https://www.versioneye.com/user/projects/551d7ca6971f78433900000e)

Django + Angular seed project w. Docker
=====================================================
This is a seed repo intended to bootstrap django + angular project development. It uses docker for dev environment and contains a small sample application.

Requirements
=============
Docker 1.6
Docker-compose 1.2

Stack
=============
* Python 3.4
* PostgreSQL
* Django
* Jade template engine
* Stylus css preprocessor
* AngularJS frontend framework
* Bootstrap3  css framework
* Gulp based frontend build system


Installation
=============

Docker dev environent requires latest docker, see https://docs.docker.com/installation/

#### Mac
1. Install boot2docker and Docker Compose
```
brew install boot2docker docker-compose
```
2. Initialize and start up boot2docker
```
boot2docker init
```
```
boot2docker start
```
3. Configure your Docker host to point to your boot2docker image.
```
$(boot2docker shellinit)
```
You’ll need to run this for every terminal session that invokes the docker or docker-compose command – better export this line into your `.zshrc` or `.bashrc`.

Build and run
=============

```sh
#build images
docker-compose build

#initialize database
docker-compose run db postgres --version

#run initial schema & data migrations
docker-compose run django migrate

#start containers
docker-compose up
```

App should be up on [http://localhost:8000](http://localhost:8000/)

Build frontend
==============
For dev:
```sh
docker-compose run frontend gulp build
```
For production (sources are uglified):
```sh
docker-compose run frontend gulp build-prod
```

Frontend is built to frontend/dist

Manage frontend dependencies
===============

Install new bower package:

```sh
docker-compose run frontend bower install [package] --save --allow-root
```

Install new node package:

Add it to frontend/pacakge.json and run `docker-compose build frontend`
Running npm install from docker does not work currently

Project layout
===============

```sh
#the important stuff: 

frontend/src/app         # angular application
frontend/src/stylesheets # stylus stylesheets
frontend/bower.json      # frontend dependency bower config
backend/apps             # custom backend django apps
backend/conf             # django config files
requirements.txt         # python dependencies
e2e-tests/specs          # e2e tests
```


Django management commands
==================

```sh
# run any dango management command:

docker-compose run django [command]

# schema & data migrations
docker-compose run django syncdb

# create a super user
docker-compose run django createsuperuser

# create migrations
docker-compose run django makemigrations [app name]
```

Unit tests
=================
See [https://docs.djangoproject.com/en/1.7/topics/testing/overview/](https://docs.djangoproject.com/en/1.7/topics/testing/overview/)
Sample app includes sample tests at backend/apps/sampleapp/tests.py

### run

```sh
docker-compose run django test --noinput
```

End to end tests
=================

Angular's default e2e test framework [protractor](https://github.com/angular/protractor) is used in conjunction with django test server.  
Test specs are located at e2e-tests/specs/  
Django e2e test config at backend/conf/settings_e2e.py  

To setup & run e2e tests, run:  
```
./run-e2e-tests.sh
```

Or if you want to do it manually:

```sh
#install test dependencies
cd e2e-tests
npm install
cd ..

#set up docker services
docker-compose -f docker-compose-e2e-test.yml build
docker-compose -f docker-compose-e2e-test.yml run dbe2e postgres --version

#start test server
docker-compose -f docker-compose-e2e-test.yml up

#run protractor tests
./e2e-tests/node_modules/protractor/bin/protractor e2e-tests/protractor.conf.js 
```
Todo:
=============
document usage on windows  
document database management workflow (shell, backup/restore)  

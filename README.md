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
* Gunicorn app server
* Nginx web server


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

#### Windows
[http://www.ubuntu.com/download/desktop/](http://www.ubuntu.com/download/desktop/)

Run development server
=============

```sh
# build images
# init database
# start django dev server & frontend builder
./bin/develop.sh
```

App should be up on [http://localhost:8000](http://localhost:8000/), running django development server.  You're good to go!

Run production server
==============

```sh
# stop containers,
# create database backup
# build docker images,
# build frontend,
# collect django static files,
# run migrations,
# start development stack
./bin/deploy.sh

#stop production server
./bin/stop_production.sh

#start production server
./bin/start_production.sh
```
App should be up on [http://localhost](http://localhost/)  
  
TODO:  
add log rotation  

Run django management commands
==============
```
# create migrations
./bin/django_admin.sh makemigrations sampleapp 

#apply migrations
./bin/django_admin.sh migrate 

#access django shell
./bin/django_admin.sh shell 

#create new admin user
./bin/django_admin.sh createsuperuser 
# etc
```

Build frontend
==============
In case you want to build forntend separately, to host it on cdn or whatevs:   
```
./bin/build_frontend.sh
```
This will build frontend & collect static files to frontend/dist  

Database
===============
```sh
# access postgress shell
./bin/psql.sh

# create a backup to backups/
./bin/db_backup.sh

# restore from backup
./bin/db_restore.sh [filename that exists in backups/]
```

Project layout
===============

```sh
#the important stuff: 

bin/                     # various scripts to deploy, run, manage app
frontend/src/app         # angular application
frontend/src/stylesheets # stylus stylesheets
frontend/bower.json      # frontend dependency bower config
backend/apps             # custom backend django apps
backend/conf             # django config files
requirements.txt         # python dependencies
e2e-tests/specs          # e2e tests
logs/                    # nginx, gunicorn, app logs for production
conf/gunicorn.conf.py         # gunicorn config for production
conf/nginx.conf               # nginx config for production
backups/                      # database backups 
```


Unit tests
=================
See [https://docs.djangoproject.com/en/1.ū/topics/testing/overview/](https://docs.djangoproject.com/en/1.7/topics/testing/overview/)  
Sample app includes sample tests at backend/apps/sampleapp/tests.py

```sh
# run django unit tests
./bin/run_unit_tests.sh
```

End to end tests
=================

Angular's default e2e test framework [protractor](https://github.com/angular/protractor) is used in conjunction with django test server.  
Test specs are located at e2e-tests/specs/  
Django e2e test config at backend/conf/settings_e2e.py  

Requires java, node > 10.0 and chrome browser  

To setup & run e2e tests, run:  
```
./bin/run_e2e_tests.sh
```


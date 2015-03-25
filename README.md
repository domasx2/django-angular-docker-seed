Django + Angular seed project w. docker dev environment
=====================================================

Stack:
* Python 3.4
* PostgreSQL
* Django web framework
* Jade templates
* Stylus css preprocessor
* AngularJS frontend framework
* Bootstrap3  css framework


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

#run initial schema & data migrations
docker-compose run django syncdb

#start containers
docker-compose up
```

App should be up on [http://localhost:8000](http://localhost:8000/)


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

Todo:
=============
unit, e2e testing setup
document usage on windows
document database management workflow (shell, backup/restore)  

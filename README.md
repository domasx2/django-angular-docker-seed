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


Docker dev environent requires latest docker, see https://docs.docker.com/installation/

Build and run
=============

```sh
#build images
docker-compose build

#run initial data migrations
docker-compose run django syncdb

#start containers
docker-compose up
```

App should be up on http://localhost:80000/


Todo:
=============
unit, e2e testing setup
django rest framework with sample usage in sample app
jshint frontend source

document usage on windows & mac
document project layout
document django management workflow (dbshell, syncdb, loaddata, etc)
document database management workflow (shell, backup/restore)

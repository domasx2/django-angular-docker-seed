Django + Angular seed project w. docker dev environment
=====================================================

Stack:
* PostgreSQL RDBMS
* Django web framework
* Jade templates
* Stylus css preprocessor
* AngularJS js framework
* Bootstrap  css framework


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

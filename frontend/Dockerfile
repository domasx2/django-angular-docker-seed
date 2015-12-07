FROM node

VOLUME ["/dist"]
VOLUME ["/src"]

ADD package.json .
ADD bower.json .
ADD .bowerrc .

RUN npm install gulp-cli bower -g -q && npm install -q && bower --allow-root install -p

RUN rm /package.json && rm /bower.json

CMD ["gulp", "develop"]
FROM node

VOLUME ["/dist"]
VOLUME ["/src"]

ADD package.json .
ADD bower.json .
ADD .bowerrc .

RUN npm install grunt-cli bower -g && npm install && bower --allow-root install -p

RUN rm /package.json && rm /bower.json

CMD ["grunt", "develop"]
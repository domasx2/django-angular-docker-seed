FROM node

VOLUME ["/dist"]
VOLUME ["/src"]

ADD package.json .
ADD bower.json .
ADD Gruntfile.js .
RUN npm install grunt-cli bower -g && npm install && bower --allow-root install
CMD ["grunt", "develop"]
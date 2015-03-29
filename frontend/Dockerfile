FROM node

VOLUME ["/dist"]
VOLUME ["/src"]

ADD package.json .
ADD bower.json .
RUN npm install grunt-cli bower -g && npm install && bower --allow-root install -p
ADD Gruntfile.js .
ENTRYPOINT ["grunt"]
CMD ["develop"]
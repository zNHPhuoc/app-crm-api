FROM mongo:6.0

COPY mongod.conf /etc/mongod.conf
COPY mongo-init.js /docker-entrypoint-initdb.d/
COPY mongodb-keyfile /etc/mongodb-keyfile

RUN chmod 400 /etc/mongodb-keyfile && \
    chown mongodb:mongodb /etc/mongodb-keyfile

CMD ["mongod", "--config", "/etc/mongod.conf"]

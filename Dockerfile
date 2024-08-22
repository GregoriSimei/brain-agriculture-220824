FROM node:22-slim

RUN apt update && apt install -y openssl procps
RUN apt install -y git
RUN npm install -g @adonisjs/cli@4.0.13

WORKDIR /home/node/app

USER node

CMD tail -f /dev/null

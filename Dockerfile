FROM node:22-slim

RUN apt update && apt install -y openssl procps
RUN apt install -y git

WORKDIR /home/node/app

USER node

CMD npm install && npm run migrations && npm run dev

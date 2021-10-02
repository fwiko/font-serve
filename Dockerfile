FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package-lock.json /usr/src/app
RUN npm install

COPY . /usr/src/app
EXPOSE 3099

CMD ["node", "src/index.js"]
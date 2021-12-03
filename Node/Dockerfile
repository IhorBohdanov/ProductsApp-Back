FROM node:latest

COPY . /dist

RUN cd /dist && npm install && npm run build

WORKDIR ./dist

CMD ["npm", "start"]

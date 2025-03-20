FROM node:23-alpine3.20
WORKDIR /home/node/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
ENTRYPOINT [ "node", "." ]
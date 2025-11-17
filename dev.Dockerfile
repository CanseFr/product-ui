FROM node:alpine as dev

WORKDIR /front

COPY . /front

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM node:latest

WORKDIR /usr/src/app/frontend

ADD . .

RUN apt-get update && apt-get install -y nodejs yarn
RUN yarn
EXPOSE 3000

CMD ["yarn", "start"]
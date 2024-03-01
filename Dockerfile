FROM node:latest as builder
ENV REACT_APP_BACKEND_URL=http://suaurl.com/api
WORKDIR /fonts
ADD . .

RUN apt-get update && apt-get install -y nodejs yarn
RUN yarn
RUN yarn build

RUN tar -czvf ./build.tar.gz -C /fonts/build/ .


FROM nginx:latest as server
WORKDIR /app
RUN mkdir build/

COPY --from=builder /fonts/build.tar.gz /app/build/build.tar.gz
RUN mkdir -p /var/www/html/
RUN tar -xzvf /app/build/build.tar.gz -C /var/www/html/

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
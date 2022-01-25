# dockerfile
# stage 1
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm ci --loglevel verbose
RUN npm run build

RUN npm install --global http-server
EXPOSE 5000
CMD http-server build -p 5000 --proxy http://localhost:5000?
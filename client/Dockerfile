# dockerfile
# stage 1
FROM node:16.17.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm ci --loglevel verbose
RUN npm run build
ENV REACT_APP_GRAPHQL_PATH=/v1/graphql
RUN npm install --global http-server
EXPOSE 5002
CMD http-server build -p 5002 --proxy http://localhost:5002?
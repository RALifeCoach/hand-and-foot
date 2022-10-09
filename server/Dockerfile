# dockerfile

FROM node:16.17.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm ci --loglevel verbose
RUN npm run build
CMD [ "node", "./dist/index.js" ]

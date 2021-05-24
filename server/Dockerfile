# dockerfile

FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm ci --loglevel verbose
RUN npm run build
EXPOSE 3010
CMD [ "node", "./dist/index.js" ]

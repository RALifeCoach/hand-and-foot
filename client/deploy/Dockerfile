FROM node:12-alpine AS compile
LABEL maintainer="oliphant.christopher@gmail.com"

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./

RUN npm install --no-optional

COPY ../public /app/public

COPY ../src /app/src

RUN GENERATE_SOURCEMAP=false NODE_ENV=production npm run build --production

#-------------------------------------------------------------#

FROM nginx:alpine AS frontend

COPY deploy/container_scripts/nginx-container.conf /etc/nginx/conf.d/default.conf

COPY --from=compile /app/build /app/static

RUN chgrp nginx /app/static \
    && chmod -R g+w /app/static

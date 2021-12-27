FROM  mysql:5.7

# All subsequent commands will now be run from inside this folder
RUN mkdir -p /database
WORKDIR /server
# Copy all the code in the local directory into the container’s working directory
COPY . .
ENV MYSQL_ROOT_PASSWORD=SEptember30!

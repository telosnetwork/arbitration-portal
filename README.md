# arbitration-portal
React Front-End and Node Server for eosio.arb DApp

## Run Mongo with Docker in a single Docker command
`docker run --rm --name mongo_container -d -p 127.0.0.1:27017:27017 mongo:4.0`

Access Docker Container & Mongo Shell
`docker exec -it mongo_container`
`mongo`

## Run Postgres with Docker in a single Docker command
`docker run --rm -d --name postgres_container -v dbdata:/var/lib/postgresql/data -p 5432:5432 postgres:11`

## Run Postgres using Docker Compose
`mkdir /tmp/project_name && cd /tmp/project_name`

Create `docker_compose.yml`
```
version: "3"
services:
  db:
    image: "postgres:11"
    container_name: "postgres_container"
    ports:
      - "5432:5432"
    volumes:
      - dbdata:/var/lib/postgresql/data
volumes:
  dbdata
```
`docker-compose up -d`

Check if Instance is running
`docker logs -f postgres_container`

Run psql
`docker exec -it postgres_container psql -U postgres`
CTRL+D to exit

Create a Database
`docker exec -it postgres_container psql -U postgres -c "create database test_database"`

## Setup for Demux Backend
`CREATE DATABASE appdb;`
`CREATE USER appuser WITH PASSWORD 'appwd';`
`GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;`

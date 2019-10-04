#!/usr/bin/env bash

###############################################################################
## Run Migrations Script
###############################################################################
started_at=$(date +"%s")

web=$(docker-compose ps | grep boilerplate-api-dev | awk '{print $1}')

# Create TypORM migration.
echo "-----> Running application migrations <-----"
docker exec -it "$web" yarn run typeorm:run
echo ""

ended_at=$(date +"%s")

minutes=$((((ended_at - started_at) / 60)))
seconds=$((((ended_at - started_at) % 60)))

echo "-----> Done in ${minutes}m${seconds}s <-----"

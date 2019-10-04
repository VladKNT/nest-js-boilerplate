#!/usr/bin/env bash

###############################################################################
## Generate Migration Script
###############################################################################
started_at=$(date +"%s")

web=$(docker-compose ps | grep boilerplate-api-dev | awk '{print $1}')

# Generate TypORM migration.
echo "-----> Generating migration "${1}" <-----"
docker exec -it "$web" yarn run typeorm:migrate "${1}"
echo ""

ended_at=$(date +"%s")

minutes=$((((ended_at - started_at) / 60)))
seconds=$((((ended_at - started_at) % 60)))

echo "-----> Done in ${minutes}m${seconds}s <-----"

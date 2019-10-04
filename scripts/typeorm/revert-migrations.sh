#!/usr/bin/env bash

###############################################################################
## Revert Migrations Script
###############################################################################
started_at=$(date +"%s")

web=$(docker-compose ps | grep boilerplate-api-dev | awk '{print $1}')

# Create TypORM migration.
echo "-----> Reverting application migrations <-----"
docker exec -it "$web" yarn run typeorm:revert
echo ""

ended_at=$(date +"%s")

minutes=$((((ended_at - started_at) / 60)))
seconds=$((((ended_at - started_at) % 60)))

echo "-----> Done in ${minutes}m${seconds}s <-----"

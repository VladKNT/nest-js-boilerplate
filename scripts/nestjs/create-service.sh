#!/usr/bin/env bash

###############################################################################
## Create Service Script
###############################################################################
started_at=$(date +"%s")

web=$(docker-compose ps | grep boilerplate-api-dev | awk '{print $1}')

# Create nest.js service.
echo "-----> Creating service "${1}" <-----"
docker exec -it "$web" nest g controller "${1}"
echo ""

ended_at=$(date +"%s")

minutes=$((((ended_at - started_at) / 60)))
seconds=$((((ended_at - started_at) % 60)))

echo "-----> Done in ${minutes}m${seconds}s <-----"

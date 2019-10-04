#!/usr/bin/env bash

###############################################################################
## Create Module Script
###############################################################################
started_at=$(date +"%s")

web=$(docker-compose ps | grep boilerplate-api-dev | awk '{print $1}')

# Create nest.js module.
echo "-----> Creating module "${1}" <-----"
docker exec -it "$web" nest g module "${1}"
echo ""

ended_at=$(date +"%s")

minutes=$((((ended_at - started_at) / 60)))
seconds=$((((ended_at - started_at) % 60)))

echo "-----> Done in ${minutes}m${seconds}s <-----"

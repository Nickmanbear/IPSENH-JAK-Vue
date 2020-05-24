#!/bin/bash
docker build -t swarm.cherement.nl:5000/frontend-prod .
docker push swarm.cherement.nl:5000/frontend-prod
ssh -t -i ./id_rsa travis-ci@swarm.cherement.nl "~/builds/frontend-prod/rebuild-docker.sh"

#!/bin/bash
vue-cli-service build --mode staging
docker build -t swarm.cherement.nl:5000/frontend-test .
docker push swarm.cherement.nl:5000/frontend-test
ssh -t -i ./id_rsa travis-ci@swarm.cherement.nl "~/builds/frontend-test/rebuild-docker.sh"

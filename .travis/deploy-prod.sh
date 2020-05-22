#!/bin/bash
openssl aes-256-cbc -K $encrypted_81707c91e4f6_key -iv $encrypted_81707c91e4f6_iv -in .env-prod.enc -out .env -d
docker build -t swarm.cherement.nl:5000/frontend-prod .
docker push swarm.cherement.nl:5000/frontend-prod
ssh -t -i ./id_rsa travis-ci@swarm.cherement.nl "~/builds/frontend-prod/rebuild-docker.sh"

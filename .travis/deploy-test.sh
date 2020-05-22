#!/bin/bash
openssl aes-256-cbc -K $encrypted_1fa30fea3e9a_key -iv $encrypted_1fa30fea3e9a_iv -in ../.env-test.enc -out ../.env -d
docker build -t swarm.cherement.nl:5000/frontend-test .
docker push swarm.cherement.nl:5000/frontend-test
ssh -t -i ./id_rsa travis-ci@swarm.cherement.nl "~/builds/frontend-test/rebuild-docker.sh"

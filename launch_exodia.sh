#!/bin/bash

cd ./server/src

node app.js &

cd ../../src

npm run serve
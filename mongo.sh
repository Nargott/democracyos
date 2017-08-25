#!/bin/sh

nvm use v6.5.0
docker run -p 27017:27017 --name mongodb mongo &
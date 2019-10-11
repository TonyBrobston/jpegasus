#!/bin/sh

yarn build
yarn link
git clone https://github.com/TonyBrobston/jpegasus-demo.git
cd jpegasus-demo
yarn link jpegasus
yarn
yarn start & wait-on http://localhost:5000
cd ../
yarn cypress run
kill $(lsof -t -i:5000) & wait
yarn unlink

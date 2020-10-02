#!/bin/sh

PORT=3000

installCypress() {
  cypress install
}

buildJpegasusAndMakeJpegasusAvailableAsLink() {
  yarn build
  yarn link
}

cloneJpegasusDemoAndLinkJpegasus() {
  git clone https://github.com/TonyBrobston/jpegasus-demo.git
  cd jpegasus-demo
  git pull
  git reset --hard origin/master
  yarn link jpegasus
  yarn
  yarn start -l $(echo $PORT) & wait-on http://localhost:$(echo $PORT)
  cd ../
}

runCypressAndSetupTeardown() {
  yarn cypress run --env PORT=$(echo $PORT)
  EXIT_CODE=$(echo $?)
  kill $(lsof -t -i:$(echo $PORT)) & wait \
    && yarn unlink \
    && exit $EXIT_CODE
}

openCypressAndSetupTeardown() {
  yarn cypress open --env PORT=$(echo $PORT) \
    && kill $(lsof -t -i:$(echo $PORT)) & wait \
    && yarn unlink
}

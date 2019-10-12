#!/bin/sh

buildJpegasusAndMakeJpegasusAvailableAsLink() {
  yarn build
  yarn link
}

cloneJpegasusDemoAndLinkJpegasus() {
  git clone https://github.com/TonyBrobston/jpegasus-demo.git
  cd jpegasus-demo
  yarn link jpegasus
  yarn
  yarn start & wait-on http://localhost:5000
  cd ../
}

runCypressAndTeardown() {
  yarn cypress run
  EXIT_CODE=$(echo $?)
  kill $(lsof -t -i:5000) & wait \
    && yarn unlink \
    && exit $EXIT_CODE
}

openCypressAndTeardown() {
  yarn cypress open \
    && kill $(lsof -t -i:5000) & wait \
    && yarn unlink
}

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

runCypress() {
  yarn cypress run --env PORT=$(echo $PORT) --headless --browser $1
}

runCypressAndSetupTeardown() {
  runCypress chrome
  chromeExitCode=$(echo $?)
  echo "Chrome exit code: ${chromeExitCode}"

  runCypress firefox
  firefoxExitCode=$(echo $?)
  echo "Firefox exit code: ${firefoxExitCode}"

  runCypress edge
  edgeExitCode=$(echo $?)
  echo "Edge exit code: ${edgeExitCode}"

  runCypress electron
  electronExitCode=$(echo $?)
  echo "Edge exit code: ${electronExitCode}"

  exitCodes="${chromeExitCode}${firefoxExitCode}${edgeExitCode}${electronExitCode}"
  exitCode=$(grep -q "1" <<< "$exitCodes" && echo 1 || echo 0)
  echo "Exit code: ${exitCode}"

  kill $(lsof -t -i:$(echo $PORT)) & wait \
    && yarn unlink \
    && exit $exitCode
}

openCypressAndSetupTeardown() {
  yarn cypress open --env PORT=$(echo $PORT) \
    && kill $(lsof -t -i:$(echo $PORT)) & wait \
    && yarn unlink
}

#!/bin/sh

setup_git() {
  git config --global user.email "anthonybrobston@gmail.com"
  git config --global user.name "TonyBrobston"
  git config --global push.default matching

  git config credential.helper "store --file=.git/credentials"

  echo "https://${GITHUB_API_KEY}:@github.com" > .git/credentials
}

make_version() {
  git checkout -- .

  git status

  npm version patch -m "chore: release version %s [skip ci]"
}

upload_files() {
  git push origin HEAD:$TRAVIS_BRANCH

  git push --tags
}

setup_git
make_version
upload_files
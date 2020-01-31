#!/bin/sh

setup_git_config() {
  git config --global user.name "Automated Deployment"

  git config credential.helper "store --file=.git/credentials"

  echo "https://${GITHUB_API_KEY}:@github.com" > .git/credentials
}

build_lib() {
  yarn build
}

create_npm_version_and_publish() {
  echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc

  npm --no-git-tag-version version $TRAVIS_TAG
  npm publish

  rm .npmrc
}

push_version_update_to_git() {
  git add package.json
  git commit -m "Bumping package.json version number to $TRAVIS_TAG"
  git push origin HEAD:master
}

setup_git_config
build_lib
create_npm_version_and_publish
push_version_update_to_git

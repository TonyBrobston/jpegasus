<p align="center">
  <img width="250" height="250" src="https://raw.githubusercontent.com/TonyBrobston/jpegasus-demo/master/src/img/jpegasus-logo.png"></img>
</p>

# jpegasus
A client-side JavaScript tool that takes in a `File` of type `.jpeg`, `.png`, or `.gif` and returns a compressed `File` of type `.jpeg`. It's as easy as taking out the trash! 🗑

[![npm version](https://badge.fury.io/js/jpegasus.svg)](https://badge.fury.io/js/jpegasus)
[![Build Status](https://travis-ci.com/TonyBrobston/jpegasus.svg?branch=master)](https://travis-ci.org/TonyBrobston/jpegasus)
[![codecov](https://codecov.io/gh/TonyBrobston/jpegasus/branch/master/graph/badge.svg)](https://codecov.io/gh/tonybrobston/jpegasus)
[![Dependencies](https://david-dm.org/tonybrobston/jpegasus/status.svg)](https://david-dm.org/tonybrobston/jpegasus)
[![Dev Dependencies](https://david-dm.org/tonybrobston/jpegasus/dev-status.svg)](https://david-dm.org/tonybrobston/jpegasus?type=dev)
[![Peer Dependencies](https://david-dm.org/tonybrobston/jpegasus/peer-status.svg)](https://david-dm.org/tonybrobston/jpegasus?type=peer)
[![Maintainability](https://api.codeclimate.com/v1/badges/ffcbe17657aabd16ed79/maintainability)](https://codeclimate.com/github/TonyBrobston/jpegasus/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/tonybrobston/jpegasus/badge.svg)](https://snyk.io/test/github/tonybrobston/jpegasus)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg)](#contributors)

## Implementation example
* [Live demo](https://tonybrobston.github.io/jpegasus-demo)
* [Concise repository](https://github.com/TonyBrobston/jpegasus-demo)

## Code example

```js
const jpegasus = require('jpegasus');

function processFile {
    return jpegasus.compress(file, {
        maxHeight: 1000,
        maxWidth: 1000,
        quality: 0.65
    });
}

module.exports = {
    processFile
};
```

## Documentation
**[compress](../modules/_index_.md#const-compress)**(`file`: File, `inputOptions`: [InputOptions](../interfaces/_types_inputoptions_.inputoptions.md)): *Promise‹File | Blob›*

## Feedback
Do you have an idea for making jpegasus better? Add your idea under the issues tab, we'd love to hear about it!

## Contributors
Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/4724577?v=4" width="100px;" alt="Tony Brobston"/><br /><sub><b>Tony Brobston</b></sub>](https://github.com/TonyBrobston)<br />[💻](https://github.com/TonyBrobston/jpegasus/commits?author=TonyBrobston "Code") | [<img src="https://avatars1.githubusercontent.com/u/13721600?v=4" width="100px;" alt="KANG"/><br /><sub><b>KANG</b></sub>](https://github.com/mkangjazz)<br />[🎨](#design-mkangjazz "Design") [💻](https://github.com/TonyBrobston/jpegasus/commits?author=mkangjazz "Code") | [<img src="https://avatars1.githubusercontent.com/u/8313853?v=4" width="100px;" alt="lounsbrough"/><br /><sub><b>lounsbrough</b></sub>](https://github.com/lounsbrough)<br />[💻](https://github.com/TonyBrobston/jpegasus/commits?author=lounsbrough "Code") | [<img src="https://avatars3.githubusercontent.com/u/6607650?v=4" width="100px;" alt="Tate Button"/><br /><sub><b>Tate Button</b></sub>](https://github.com/buttontate)<br />[🤔](#ideas-buttontate "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

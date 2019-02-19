# jpegasus
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
A client-side JavaScript tool that takes in a `File` of type `.jpeg`, `.png`, or `.gif` and returns a compressed `Blob` of type `.jpeg`. It's as easy as taking out the trash! 🗑

[![npm version](https://badge.fury.io/js/jpegasus.svg)](https://badge.fury.io/js/jpegasus)
[![Build Status](https://travis-ci.com/TonyBrobston/jpegasus.svg?branch=master)](https://travis-ci.org/TonyBrobston/jpegasus)
[![codecov](https://codecov.io/gh/TonyBrobston/jpegasus/branch/master/graph/badge.svg)](https://codecov.io/gh/tonybrobston/jpegasus)
[![Dependencies](https://david-dm.org/tonybrobston/jpegasus/status.svg)](https://david-dm.org/tonybrobston/jpegasus)
[![Dev Dependencies](https://david-dm.org/tonybrobston/jpegasus/dev-status.svg)](https://david-dm.org/tonybrobston/jpegasus?type=dev)
[![Peer Dependencies](https://david-dm.org/tonybrobston/jpegasus/peer-status.svg)](https://david-dm.org/tonybrobston/jpegasus?type=peer)
[![Maintainability](https://api.codeclimate.com/v1/badges/ffcbe17657aabd16ed79/maintainability)](https://codeclimate.com/github/TonyBrobston/jpegasus/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/tonybrobston/jpegasus/badge.svg)](https://snyk.io/test/github/tonybrobston/jpegasus)

### Demo
* [Live Demo](https://tonybrobston.github.io/jpegasus-demo)
* [Concise Example Repository](https://github.com/TonyBrobston/jpegasus-demo)

### Code example

```
const jpegasus = require('Jpegasus');

const processFile = (file) => {
    return jpegasus.compress(file, {
        maxHeight: 1000,
        maxWidth: 1000,
        quality: 0.65
    });
};

module.exports = {
    processFile
};
```

### Parameters
* First parameter: JavaScript `File`
* Second parameter: Object of `options`
  * `allowCrossOriginResourceSharing`: a boolean that determines if CORS should be allowed, defaults to `false`.
  * `maxHeight`: the max height in pixels of the compressed output File, defaults to `16250`.
  * `maxWidth`: the max width in pixels of the compressed output File, defaults to `16250`.
  * `quality`: degrades quality of File, values is between `0.01` and `1.00`, defaults to `0.50`.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/8313853?v=4" width="100px;" alt="lounsbrough"/><br /><sub><b>lounsbrough</b></sub>](https://github.com/lounsbrough)<br />[💻](https://github.com/TonyBrobston/jpegasus/commits?author=lounsbrough "Code") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
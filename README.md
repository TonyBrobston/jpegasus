# jpegasus
A client-side JavaScript tool that takes in a `File` of type `.jpeg`, `.png`, or `.gif` and returns a compressed `Blob` of type `.jpeg`. It's as easy as taking out the trash! 🗑

### Demo
* [Live Demo](https://tonybrobston.github.io/jpegasus-demo)
* [Concise Example Repository](https://github.com/TonyBrobston/jpegasus-demo)

### Code example

```
const jpegasus = require('Jpegasus');

const compress = (file, quality) => {
    return jpegasus.compress(file, {
        maxHeight: 1000,
        maxWidth: 1000,
        quality
    });
};

module.exports = {
    compress
};
```

### Parameters
* First parameter: JavaScript `File`
* Second parameter: Object of `options`
  * `allowCrossOriginResourceSharing`: a boolean that determines if CORS should be allowed, defaults to `false`.
  * `maxHeight`: the max height in pixels of the compressed output File, defaults to `16250`.
  * `maxWidth`: the max width in pixels of the compressed output File, defaults to `16250`.
  * `quality`: degrades quality of File, values is between `0.01` and `1.00`, defaults to `0.50`.

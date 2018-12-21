# jpegasus
A client-side JavaScript tool that takes in a `File` of type `.jpeg`, `.png`, or `.gif` and returns a compressed `File` of type `.jpeg`.
 
### Here's a temporary example using react-dropzone until I can build something more concise.
 
```
import React from 'react';
import Dropzone from 'react-dropzone';
import Jpegasus from 'jpegasus';

class FileUploader extends React.Component {
    constructor() {
        super();
        this.state = {
            files: []
        };
    }

    async onDrop(files) {
        const file = files[0];

        console.log(file);

        const compressedFile = await Jpegasus.compress(file);

        console.log(compressedFile);

        this.setState({
            files: [compressedFile]
        });
    }

    onCancel() {
        this.setState({
            files: []
        });
    }

    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {`${file.name} - ${file.size}  bytes`}
            </li>
        ));

        return (
            <section>
                <Dropzone
                    onDrop={this.onDrop.bind(this)}
                    onFileDialogCancel={this.onCancel.bind(this)}
                >
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>{'Drop files here, or click to select files'}</p>
                        </div>
                    )}
                </Dropzone>
                <aside>
                    <h4>{'Files'}</h4>
                    <ul>{files}</ul>
                </aside>
            </section>
        );
    }
}

export default FileUploader;

```

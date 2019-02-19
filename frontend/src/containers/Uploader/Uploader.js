import React, { Component }  from 'react';
import ipfsClient            from 'ipfs-http-client';

// Create a Stream from a File which enables uploads of large files without allocation mem multiple times
import fileReaderPullStream  from 'pull-file-reader';

import { Form, Input, Label, FormGroup } from 'reactstrap';

class Uploader extends Component {

    constructor (props) {
        super(props);

        this.state = {
            added_file_hash: null
        };

        this.ipfs = ipfsClient('ipfs.emanate.live', '5002', { protocol: 'https' });

        this.captureFile  = this.captureFile.bind(this);
        this.saveToIpfs   = this.saveToIpfs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    captureFile = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const file = event.target.files[0];

        if (document.getElementById('keepFilename').checked) {
            this.saveToIpfsWithFilename(file);
        } else {
            this.saveToIpfs(file);
        }
    }

    // Add File to IPFS and Return a CID (Content Identifiers)
    saveToIpfs = (file) => {
        let ipfsId = '';

        const fileStream = fileReaderPullStream(file);

        this.ipfs.add(fileStream, { progress: (prog) => console.log(`Received: ${prog}`)})
            .then((response) => {
                console.log('Response: ', response);
                ipfsId = response[0].hash;
                console.log('IPFS ID: ' , ipfsId);
                this.setState({added_file_hash: ipfsId});
            }).catch((err) => {
                console.error(err);
            });
    }

    // Add File to IPFS and wrap it in a Dir to keep the original filename
    saveToIpfsWithFilename = (file) => {
        let ipfsId = '';

        const fileStream = fileReaderPullStream(file);

        const fileDetails = {
            path:    file.name,
            content: fileStream
        };

        const options = {
            wrapWithDirectory: true,
            progress: (prog) => console.log(`Received: ${prog}`)
        };

        this.ipfs.add(fileDetails, options)
            .then((response) => {
                console.log('Response: ', response);
                ipfsId = response[response.length - 1].hash
                console.log('IPFS ID: ' , ipfsId);
                this.setState({added_file_hash: ipfsId});
            }).catch((err) => {
                console.error(err);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className='uploadForm'>
                <FormGroup id='captureMedia' onSubmit={this.handleSubmit}>
                    <Input type='file' onChange={this.captureFile} />
                    <Label className='uploadLabel' htmlFor='keepFilename'><Input type='checkbox' id='keepFilename' name='keepFilename' /> Keep Filename</Label>
                </FormGroup>
                <div style={{ marginBottom: '20px' }}>
                    <a href={'https://ipfs.io/ipfs/' + this.state.added_file_hash}>
                        ipfs.io/ipfs/{this.state.added_file_hash}
                    </a>
                </div>
            </div>
        );
    }
}

export default Uploader;
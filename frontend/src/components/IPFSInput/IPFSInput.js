import React, { Component }        from 'react';
import PropTypes from 'prop-types';
import ipfsClient                  from 'ipfs-http-client';

// Create a Stream from a File which enables uploads of large files without allocation mem multiple times
import fileReaderPullStream        from 'pull-file-reader';

import { Button, Input, Spinner } from 'reactstrap';

class IPFSInput extends Component {

  constructor (props) {
    super(props);

    this.state = {
      added_file_hash: null,
      loading: false,
    };

    this.ipfs = ipfsClient('ipfs.emanate.live', '5002', { protocol: 'https' });

  }

  captureFile = (event) => {

    event.stopPropagation();
    event.preventDefault();

    this.setState({loading: true});

    const file = event.target.files[0];
    this.saveToIpfs(file);

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
        const fileUrl = `ipfs.io/ipfs/${ipfsId}`;

        this.setState({added_file_hash: fileUrl, loading: false});
        this.props.onChange && this.props.onChange({
          target: {
            value: fileUrl,
          }
        })
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
        this.setState({added_file_hash: ipfsId, loading: false});
      }).catch((err) => {
      console.error(err);
    });
  }

  render() {
    if(this.state.loading) {
      return <Spinner size="sm" color='primary' />
    }
    return (
      <div className='uploadForm'>
        {this.state.added_file_hash ?
          <div>
            <a className="ipfs-url" href={'https://' + this.state.added_file_hash}>
              {this.state.added_file_hash}
            </a>
            <Button>Remove</Button>
          </div>
          :
          <label>
            <span className="btn btn-primary">Select file</span>
            <Input type="file" className="hidden-input" onChange={this.captureFile}/>
          </label>
        }
      </div>
    );
  }
}

IPFSInput.propTypes = {
  onChange: PropTypes.func,
};

export default IPFSInput;

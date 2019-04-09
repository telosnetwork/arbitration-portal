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
      loading: false,
    };

    this.ipfs = ipfsClient('ipfs.telosfoundation.io', '443', { protocol: 'https' });

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
        const fileUrl = `${ipfsId}`;

        this.setState({loading: false});
        this.props.onChange({
          target: {
            value: fileUrl,
          }
        })
      }).catch((err) => {
      console.error(err);
    });
  }

  reset() {
    return () => {
      this.props.onChange({
        target: {
          value: null,
        }
      })
    }
  }

  render() {
    if(this.state.loading) {
      return <Spinner size="sm" color='primary' />
    }
    return (
      <div className='uploadForm'>
        {this.props.value ?
          <div>
            <a className="ipfs-url" href={'https://web.ipfs.telosfoundation.io/' + this.props.value}>
              {this.props.value}
            </a>
            <Button style={{marginTop: '5px', marginBottom: '5px'}} onClick={this.reset()}>Remove</Button>
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
  value: PropTypes.string,
};

export default IPFSInput;

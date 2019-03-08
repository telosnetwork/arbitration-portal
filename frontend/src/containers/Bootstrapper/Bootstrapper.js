import { Component }      from 'react';

// Redux
import { connect }               from 'react-redux';
import { CasesActions } from 'business/actions';

/*
This class has been created to launch app initialisation and fetch data from server. Later on this may be move somewhere else and this could be deleted
 */
class Bootstrapper extends Component {

    componentDidMount() {
       this.props.fetchCases();
    }

    render() {
        return null
    }

}

const mapStateToProps = state => ({
});

// Map the following action to props
const mapDispatchToProps = {
  fetchCases: CasesActions.fetchCases,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Bootstrapper);

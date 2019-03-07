import React, { Component }      from 'react';
import { Link }   from 'react-router-dom';


// Resources
import mainLogo                  from 'resources/telosLogo.png'

// Components
import Login                     from 'containers/Login';

// Redux
import { connect }               from 'react-redux';
import { AuthenticationSelectors } from 'business/selectors';

// Reactstrap Components
import { Collapse, Navbar, NavbarToggler, Nav, NavItem }      from 'reactstrap';

class NavBar extends Component {

    constructor (props) {
        super(props);

        this.state = {
            isOpen:  false
        };

        this.toggleNavBar = this.toggleNavBar.bind(this);

    }

    toggleNavBar() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {

          return (
                <Navbar color='light' light expand='md'>
                    <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                        <img src={mainLogo} alt='mainLogo' height="40" width="40"/> Arbitration Portal
                    </Link>
                    <NavbarToggler onClick={this.toggleNavBar}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <Link to='/arbitrators' style={ !this.props.authentication.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
                                    Arbitrator
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/members' style={ !this.props.authentication.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
                                    Members
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/transfers' style={ !this.props.authentication.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
                                    Transfers
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Login/>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
          );
      }
  }

const mapStateToProps = state => ({
    authentication: {
        isLogin: AuthenticationSelectors.isLogin(state),
    },
});

// Export a redux connected component
export default connect(mapStateToProps, null)(NavBar);
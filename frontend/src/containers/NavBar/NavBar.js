import React, { Component }      from 'react';
import { Link }   from 'react-router-dom';

// Resources
import mainLogo                  from 'resources/telosLogo.png'

// Components
import Login                     from 'containers/Login';

// Redux
import { connect }               from 'react-redux';
import { AuthenticationSelectors, ArbitratorsSelectors } from 'business/selectors';
import { ArbitratorsActions } from 'business/actions';

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

            {this.props.isLogin && [

              <NavItem key="members">
                <Link to='/members' style={ !this.props.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
                  Member
                </Link>
              </NavItem>,
              this.props.isArbitrator &&
              <NavItem key="arbitrators">
                <Link to='/arbitrators' style={ !this.props.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
                  Arbitrator
                </Link>
              </NavItem>,
              <NavItem key="transfers">
                <Link to='/transfers' style={ !this.props.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
              Transfers
              </Link>
              </NavItem>,
            ]}

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
  isLogin: AuthenticationSelectors.isLogin(state),
  isArbitrator: ArbitratorsSelectors.isArbitrator(state),
});

const mapDispatchToProps = {
  fetchArbitrators: ArbitratorsActions.fetchArbitrators,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

import React, { Component }      from 'react';
import { NavLink, withRouter }   from 'react-router-dom';

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
        <NavLink to='/' style={{ color: 'black', textDecoration: 'none' }}>
          <img src={mainLogo} alt='mainLogo' height="40" width="40"/> Arbitration Portal
        </NavLink>
        <NavbarToggler onClick={this.toggleNavBar}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>

            {this.props.isLogin && [

              <NavItem key="members">
                <NavLink
                  to='/members'
                  className="c-nav-link"
                  activeClassName="nav-link-disabled"
                >
                  MEMBER
                </NavLink>
              </NavItem>,
              this.props.isArbitrator &&
              <NavItem key="arbitrators">
                <NavLink
                  to='/arbitrators'
                  className="c-nav-link"
                  activeClassName="nav-link-disabled"
                >
                  ARBITRATOR
                </NavLink>
              </NavItem>,
              /*<NavItem key="transfers">
                <Link to='/transfers_reg' style={ !this.props.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
                  Transfers
                </Link>
              </NavItem>,*/
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

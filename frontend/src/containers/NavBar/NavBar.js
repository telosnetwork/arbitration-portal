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
      <div>
      <Navbar color='light' light expand='md'>
        <NavLink to='/' style={{ color: 'black', textDecoration: 'none' }}>
            <img src={mainLogo} alt='mainLogo' height="50" width="50" />
            <h5 className='nav-title' style={{display: 'inline-block'}}>Telos Arbitration Portal</h5>
        </NavLink>
        <NavbarToggler onClick={this.toggleNavBar}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>

            <NavItem>
              <Login/>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
      <Navbar color='light' light expand='md'>
        <div className='nav-links'>
          <Nav className='ml-auto' navbar>

            {this.props.isLogin && [

              <NavItem key="members">
                <NavLink
                  to='/members'
                  className="c-nav-link"
                  activeClassName="nav-link-disabled"
                >
                  <i className="fas fa-users"></i><p className="nav-text">MEMBER</p>
                </NavLink>
              </NavItem>,
              this.props.isArbitrator &&
              <NavItem key="arbitrators">
                <NavLink
                  to='/arbitrators'
                  className="c-nav-link"
                  activeClassName="nav-link-disabled"
                >
                  <i className="fas fa-user-shield"></i><p className="nav-text">ARBITRATOR</p>
                </NavLink>
              </NavItem>,
            ]}

          </Nav>
        </div>
     </Navbar>
     </div>
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

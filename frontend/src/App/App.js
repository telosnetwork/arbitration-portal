import React, { Component }      from 'react';
import {  Route, Switch }   from 'react-router-dom';

// Components
import MembersHome               from '../containers/MembersHome';
import ArbitratorsHome           from '../containers/ArbitratorsHome';
import NavBar                    from '../containers/NavBar';
import ActionModal               from '../containers/ActionModal';
import ErrorModal                from '../containers/ErrorModal';

// Resources
import mainLogo                  from '../resources/telosLogo.png'

// Redux
import { withRouter, Redirect }            from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthenticationSelectors } from 'business/selectors';

class App extends Component {

  render() {

    const Home = () => (
      <div style={{ textAlign: 'center', marginTop: '150px' }}>
        <h1 className='portal-title'>
          Welcome to the Telos Arbitration Portal!
        </h1>
        <h3>In order to use the portal, please sign in with the button at the top right corner.</h3>
        <img src={mainLogo} alt='mainLogo' />
      </div>
    );

    return (
      <div className='App'>
        <NavBar />
        <ErrorModal />
        <ActionModal />
        <Switch>
          <Route exact path='/' render={Home} />
          {this.props.isLogin && <Route exact path='/members'     component={MembersHome} />}
          {this.props.isLogin && <Route exact path='/arbitrators' component={ArbitratorsHome} />}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: AuthenticationSelectors.isLogin(state),
});

export default withRouter(connect(mapStateToProps, null)(App));

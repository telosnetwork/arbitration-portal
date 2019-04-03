import React, { Component }      from 'react';
import {  Route, Switch }   from 'react-router-dom';

// Components
import Transfers                 from '../containers/Transfers';
import Arbitrators               from '../containers/Arbitrators';
import Members                   from '../containers/Members';
import MembersHome               from '../containers/MembersHome';
import ArbitratorsHome           from '../containers/ArbitratorsHome';
import NavBar                    from '../containers/NavBar';
import ActionModal               from '../containers/ActionModal';
import ErrorModal                from '../containers/ErrorModal';

// Resources
import mainLogo                  from '../resources/telosLogo.png'

// Redux
import { withRouter }            from 'react-router-dom';

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

    const NotFound = () => (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>
          Page not found...
        </h1>
      </div>
    );

    return (
      <div className='App'>
        <NavBar />
        <ErrorModal />
        <ActionModal />
        <Switch>
          <Route exact path='/' render={Home} />
          <Route exact path='/members'     component={MembersHome} />
          <Route exact path='/arbitrators' component={ArbitratorsHome} />
          <Route exact path='/transfers_reg'   component={Transfers} />
          <Route exact path='/members_reg'     component={Members} />
          <Route exact path='/arbitrators_reg' component={Arbitrators} />
          <Route render={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

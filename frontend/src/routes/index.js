import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/common/history';

import App from '../components/common/App';
// import login from '../components/common/login';
import Login from '../components/login/Login';
import Home from '../components/common/Home';
import NoMatch from '../components/common/404';

class MRoute extends Component {
  render() {
    return (
        //路由切换由URL的hash变化决定
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/app" component={App}/>
          <Route path="/login" component={Login}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    );
  }
}

export default MRoute;
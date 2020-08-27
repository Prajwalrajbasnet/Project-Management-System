import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from './views/LoginForm';
import Dashboard from './views/Dashboard';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return this.props.isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />;
          }}
        ></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default connect(mapStateToProps)(App);

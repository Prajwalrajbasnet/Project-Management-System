import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authService from './services/authService';
import userService from './services/userService';
import LoginForm from './views/Login';
import Dashboard from './views/Dashboard/';
import ProjectsList from './views/ProjectsList';
import './styles/App.css';
import { loginUser } from './actions/authActions';

class App extends React.Component {
  componentDidMount() {
    const userToken = authService.getAuthenticationToken();
    if (userToken) {
      this.props.changeLoginStatus();
    }
  }

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
        {this.props.isLoggedIn && <Route path="/dashboard" component={Dashboard}></Route>}
        {this.props.isLoggedIn && <Route path="/app/projects" component={ProjectsList}></Route>}
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeLoginStatus: () => dispatch(loginUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

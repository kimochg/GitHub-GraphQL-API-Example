import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NavigatorIOS,
  TouchableHighlight,
} from 'react-native';

import _ from 'lodash';

import { graphql, ApolloProvider } from 'react-apollo';
import { login } from './githubLogin';

import gql from 'graphql-tag';

import Repository from './repository';
import Issue from './issue';
import Login from './Login';
import configClient from './configClient';

class IssueReader extends Component {
  constructor() {
    super();
    this.state = { 
      login: false,       // whether user logged in
      isLoading: false,   // is logging
      errMsg: '',         // error message when login failed
      token: ''           // login token
    }; 
  }

  routeForIssue(id, title) {
    return {
      title,
      component: Issue,
      passProps: {
        id,
      },
    };
  }
  routeForRepository(login, name) {
    return {
      title: `${login}/${name}`,
      component: Repository,
      passProps: {
        login,
        name,
        goToIssue: (id, title) => {
          this.refs.nav.push(this.routeForIssue(id, title));
        }
      },
    };
  }
  handleLogin(username, password) {
    // console.log('handleLogin', username, password);

    // state: start login
    this.setState({
      isLoading: true,
      errMsg: '',
      token: '',
    });

    login(username, password).then(
      // login success
      (token) => {
        this.setState({
          isLoading: false,
          login: true,
          token
        })
      },
      // login failure
      (err) => {
        this.setState({
          isLoading: false,
          errMsg: err.message || 'User login failed'
        })
      }
    );
  }
  render() {

    const {
      token,
      login,
      isLoading,
      errMsg
    } = this.state;

    return login ? (
      <ApolloProvider client={configClient(token)}>
        <NavigatorIOS
          ref="nav"
          style={styles.container}
          initialRoute={this.routeForRepository('apollographql', 'apollo-client')}
          tintColor="#008888"
        />
      </ApolloProvider>
    ) : (
      <Login
        isLoading={isLoading}
        loginErr={errMsg}
        handleLogin={this.handleLogin.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('IssueReader', () => IssueReader);

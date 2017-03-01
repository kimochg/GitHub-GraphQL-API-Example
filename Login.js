/*
 * @Author: LIU CHENG 
 * @Date: 2017-02-28 09:27:56 
 * @Last Modified by: LIU CHENG
 * @Last Modified time: 2017-03-01 11:53:16
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

/**
 * Login form 
 * props:
 * isLoading: Boolean spinner show or not
 * loginErr: String error message of login
 * handleLogin: func (username, password), called when click login
 */

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }
  }

  handleUsernameChange(username) {
    this.setState({
      username,
    })
  }

  handlePasswordChange(password) {
    this.setState({
      password,
    })
  }

  render () {

    const {
      handleLogin,
      isLoading,
      loginErr
    } = this.props;
    
    const {
      username,
      password
    } = this.state;

    return (
      <View style={styles.contaienr}>
        <Text style={styles.title}>Github Account Login</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleUsernameChange.bind(this)}
          value={username}
          placeholder="username"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.handlePasswordChange.bind(this)}
          value={password}
          placeholder="password"
          secureTextEntry
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => handleLogin(username, password)}
          underlayColor="white"
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={isLoading}
          color="#111"
          size="large"
        />
        {loginErr? <Text>{loginErr}</Text> : null}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  contaienr: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#324050',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  },
  textInput: {
    height: 50,
    padding: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
})

export default LoginForm;
import * as React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'badger@wisc.edu',
      password: '123456',
      url: 'http://172.220.7.76:8080',
      token: '',
    };
  }

  static navigationOptions = {
    title: ' ',
    headerShown: false,
  };

  componentDidMount() {}

  login() {
    fetch(this.state.url + '/v1/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({
        email: this.state.email,
        passwd: this.state.password,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        //alert('Login-result.data as token: '+result.data);//
        if (result.message === 'success') {
          const { navigate } = this.props.navigation;
          navigate('Search', {
            url: this.state.url,
            email: this.state.email,
            // and more infor.....
            token: result.data, //<-new
          });
        } else {
          alert('Invalid passwrod or username');
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  register() {
    const { navigate } = this.props.navigation;
    navigate('SignUp', {
      url: this.state.url,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <ImageBackground
        source={require('../../pic/home_back_1.png')}
        style={{width: '100%', height: '100%'}}
      >
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            style={styles.inputs}
            underlineColor='transparent'
            // underlineColorAndroid='transparent'
            placeholder="Email"
            value={email}
            onChangeText={u => this.setState({ email: u })}
            theme={{colors: {text: '#282728', primary: 'transparent'}}}
          />
          <TextInput
            style={styles.inputs}
            underlineColor='transparent'
            placeholder="Password"
            value={password}
            onChangeText={p => this.setState({ password: p })}
            secureTextEntry={true}
            theme={{colors: {text: '#282728', primary: 'transparent'}}}
          />
        </View>
        <View style={styles.btn_container}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => {
              this.login();
            }}>
            <Text style={{color: '#646569'}}>Login</Text>
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => {
              this.register();
            }}>
            <Text style={{color: '#646569'}}>Register</Text>
          </Button>
        </View>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  input_container: {
    marginTop: '87%',
    alignItems: 'center',
  },
  inputs: {
    fontSize: 14,
    borderWidth: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor : "#F7F7F7",
    width: '80%',
    height: 40,
    marginTop: '6%',
  },
  btn_container: {
    marginTop: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    marginHorizontal: '4%',
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor : "#F7F7F7",
    marginTop: '3%',
    width: '36%',
    color: '#646569',
  },
});

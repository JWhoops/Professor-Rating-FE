import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { IconButton, Button, TextInput } from 'react-native-paper';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  // static navigationOptions = {
    // title: '',
    // headerLeft: () => (
    //   <IconButton
    //     icon={'chevron-left'}
    //     onPress={()=>{navigation.goBack()}}
    //     title="return"
    //     color="#F7F7F7"
    //   />
    // ),
    
  // };
  static navigationOptions = (
    {navigation}) => {
    return{
      title: '',
      headerStyle: { 
        backgroundColor: '#C5050C',
        shadowOffset: {
          // 设置阴影偏移量
          width: 0,
          height: 4,
        },
        shadowRadius: 4, // 设置阴影模糊半径
        shadowOpacity: 0.13, // 设置阴影的不透明度
        shadowColor: 'rgba(96,96,96,1)', // 设置阴影色
      },
      headerLeft:(()=><IconButton
        icon={'chevron-left'}
        onPress={()=>{navigation.goBack()}}
        color="#F7F7F7"
        size={35}/>)
    }
  }

  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  handleConfirmPassword = text => {
    this.setState({ confirmPassword: text });
  };

  addUser = () => {
    const url = this.props.navigation.state.params.url;
    const { email, password, confirmPassword } = this.state;
    if (
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      alert('Error');
    } else {
      const { navigate } = this.props.navigation;
      fetch(url + '/v1/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          passwd: password,
        }),
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          if (result.message === 'success') {
            alert('You got it!!');
            const { navigate } = this.props.navigation;
            navigate('Login');
          } else {
            alert('User exists, please try again!!!');
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../../pic/signup.png')}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
      <View style={styles.container}>
        <TextInput
          label="Email"
          onChangeText={text => this.handleEmail(text)}
          style={styles.input}
          underlineColor='transparent'
          theme={{colors: {text: '#282728', primary: '#c5050c'}}}
        />
        <TextInput
          label="Password"
          onChangeText={text => this.handlePassword(text)}
          style={styles.input}
          secureTextEntry={true}
          underlineColor='transparent'
          theme={{colors: {text: '#282728', primary: '#c5050c'}}}
        />
        <TextInput
          label="Confirm Password"
          onChangeText={text => this.handleConfirmPassword(text)}
          style={styles.input}
          secureTextEntry={true}
          underlineColor='transparent'
          theme={{colors: {text: '#282728', primary: '#c5050c'}}}
        />

        <Button
          style={styles.btn}
          onPress={() => this.addUser()}
          mode="contained">
          REGISTER
        </Button>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    alignItems: 'center',
  },
  input: {
    // marginLeft: '5%',
    marginTop: '3%',
    width: '85%',

    fontSize: 14,
    borderWidth: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#F7F7F7",
    // width: '80%',
    height: 60,
    // marginTop: '6%',
  },
  btn: {
    marginTop: '8%',
    width: '85%',
    margin: '5%',
    borderRadius: 0,
    backgroundColor: '#c5050c',
  },
});

export default SignupScreen;

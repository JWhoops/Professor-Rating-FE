import * as React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Searchbar, Button, IconButton } from 'react-native-paper';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'CS',
    };
  }

  static navigationOptions = (
    { navigation }) => {
    return {
      title: '',
      headerStyle: {
        backgroundColor: '#C5050C',
        shadowOffset: {
          // 设置阴影偏移量
          width: 0,
          height: 4,
        },
        shadowRadius: 10, // 设置阴影模糊半径
        shadowOpacity: 0.0, // 设置阴影的不透明度
        shadowColor: 'rgba(96,96,96,1)', // 设置阴影色
      },
      headerLeft: (() =>
        <IconButton
          icon={'chevron-left'}
          onPress={() => { navigation.goBack() }}
          color="#F7F7F7"
          size={35} />),
      headerRight: () =>
        <IconButton
          icon="bookmark"
          color="#F7F7F7"
          size={28}
          onPress={() => {
            const { url, email, token } = navigation.state.params;
            navigation.navigate('Saved', {
              url: url,
              email: email,
              token: token,
            });
          }}
        />,
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  searchCourse = () => {
    if (this.state.search === '') {
      alert('Search is still empty');
    } else {
      const { navigate } = this.props.navigation;
      const { url, email, token } = this.props.navigation.state.params;
      navigate('Result', {
        search: this.state.search.toUpperCase(), //
        url: url,
        token: token,
        email: email,
      });
    }
  };

  render() {
    const { search } = this.state;
    return (
      <ImageBackground
        source={require('../pic/search.png')}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        <View style={styles.container}>
          <View style={styles.search}>
            <Searchbar
              placeholder="Type Here..."
              style={{ borderRadius: 0 }}
              onChangeText={this.updateSearch}
              value={this.state.search}
              inputStyle={{ marginLeft: -10 }}
              icon={() => <IconButton
                icon="magnify"
                color="#494949"
                size={30}
                style={styles.submitButton}
                onPress={() => this.searchCourse()}
              />}
            />
          </View>
          {/* <IconButton
          icon="magnify"
          color="black"
          size={30}
          style={styles.submitButton}
          onPress={() => this.searchCourse()}
        /> */}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  search: {
    width: '85%',
    borderWidth: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#F7F7F7",
    height: 40,
    marginTop: '45%',
  }
  // submitButton: {
  //   width: '5%'
  // },
});

export default SearchScreen;

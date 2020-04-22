import * as React from 'react';
import { ActivityIndicator, IconButton, Button } from 'react-native-paper';
import { View, FlatList, Text } from 'react-native';
import ResultSaved from '../ResultSaved.js'; //


class SavedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://172.220.7.76:8080',
      courses: '',
      search: '',
      terms: [],
      fav: [],
      visible: true,
      token: '',
      notFound: false,
    };
    this.updateList = this.updateList.bind(this);
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
        elevation: 4,
      },
      headerLeft: (() =>
        <IconButton
          accessibilityLabel={'saved_back_btn'}
          testID={'saved_back_btn'}
          accessible={true}
          icon={'chevron-left'}
          onPress={() => { navigation.goBack() }}
          color="#F7F7F7"
          size={35} />),
    }
  }

  updateList() {
    const { url, email, token } = this.props.navigation.state.params;
    fetch(url + '/v1/users/email/' + email, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*'
      },
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.success === true) {
          // let terms = result.data;
          let terms = result.data.favorite;
          let notFound = false;
          if (terms.length === 0) {
            notFound = true;
          }
          this.setState({ notFound: notFound, terms: terms, visible: false, token: token });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  componentDidMount() {
    const { url, email, token } = this.props.navigation.state.params;
    fetch(url + '/v1/users/email/' + email, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*'
      },
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.success === true) {
          // let terms = result.data;
          let terms = result.data.favorite;
          let notFound = false;
          if (terms.length === 0) {
            notFound = true;
          }
          this.setState({ notFound: notFound, terms: terms, visible: false, token: token });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <View >
        {this.state.notFound &&
          <View>
            <Text style={{ fontSize: 18, color: "grey", fontWeight: "bold", textAlign: "center", width: "100%", marginTop: "50%" }}
              accessibilityLabel={'no_favorite_text'}
              testID={'no_favorite_text'}
              accessible={true}
            >
              Nothing Here, Bookmark a course : )
            </Text>
            <Button
              accessibilityLabel={'no_favorite_btn'}
              testID={'no_favorite_btn'}
              accessible={true}
              color={"#c5050c"}
              style={{ fontSize: 23, width: "auto" }}
              onPress={() => { this.props.navigation.goBack(); }}
            >Go Back</Button>
          </View>
        }
        {this.state.visible && <ActivityIndicator style={{
          position: "absolute",
          marginTop: "40%",
          alignSelf: "center"
        }} size={60} color="#c5050c" />}
        <FlatList
          data={this.state.terms}
          renderItem={({ item }) => (
            <ResultSaved
              title={item.name}
              course_id={item.id}
              description={item.description}
              navigate={this.props.navigation.navigate}
              token={this.state.token}
              url={this.state.url}
              email={this.state.email}
              id={this.state.id}
              updateList={this.updateList}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}




export default SavedScreen;
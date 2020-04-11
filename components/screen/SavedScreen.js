import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import ResultItem from '../ResultSaved.js';


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
    };
  }

  static navigationOptions = {
    title: 'Saved Courses',
  };

  componentDidMount() {
    const { url, email } = this.props.navigation.state.params;
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
          this.setState({ terms: terms, visible: false });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <View>
        {this.state.visible && <ActivityIndicator style={{
          position: "absolute",
          marginTop: "40%",
          alignSelf: "center"
        }} size={60} color="#0000ff" />}
        <FlatList
          data={this.state.terms}
          renderItem={({ item }) => (
            <ResultItem
              title={item.name}
              course_id={item.id}
              description={item.description}
              navigate={this.props.navigation.navigate}
              token={this.state.token}
              url={this.state.url}
              email={this.state.email}
              id={this.state.id}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}




export default SavedScreen;
import * as React from 'react';
import { IconButton, Button } from 'react-native-paper';
import { View, Text, FlatList, ActivityIndicator, } from 'react-native';
import ResultItem from '../ResultItem.js';

class SearchResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      courses: null,
      search: '',
      token: '',
      email: '',
      id: '',
      visible: true,
      notfound: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Search Result',
      headerRight: () =>
        <IconButton
          icon="account"
          color="black"
          size={35}
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

  componentDidMount() {
    const { search, url, token, email, id } = this.props.navigation.state.params;
    fetch(url + '/v1/terms/name/' + search, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.message === 'success') {
          if (result.data.length !== 0) {
            this.setState({
              courses: result.data,
              search: search,
              url: url,
              token: token,
              email: email,
              id: result.data.id,
              visible: false,
            });
          } else {
            this.setState({ visible: false, notFound: true })
          }
        }
        else {
          alert('Invalid Search');
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
        {this.state.notFound &&
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: "grey", marginTop: "45%", fontWeight: "bold" }}>
              Whoops, courses not found : (
            </Text>
            <Button
              style={{ fontSize: 23 }}
              onPress={() => { this.props.navigation.goBack(); }}
            >Try Again</Button>
          </View>
        }
        <FlatList
          data={this.state.courses}
          renderItem={({ item }) => (
            <ResultItem
              title={item.name}
              course_id={item.id}
              season={item.season}
              year={item.year}
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

export default SearchResultScreen;
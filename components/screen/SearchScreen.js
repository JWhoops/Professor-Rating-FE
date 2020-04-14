import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: 'CS',
    };
  }

  static navigationOptions = {
    title: 'Search Course',
  };

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
        search: this.state.search,
        url: url,
        token: token,
        email: email,
      });
    }
  };

  render() {
    const { search } = this.state;
    return (
      <View>
        <Searchbar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
        />
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={() => this.searchCourse()}>
          SEARCH
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: {
    margin: '5%',
  },
});

export default SearchScreen;

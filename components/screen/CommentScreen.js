import * as React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import Comment from '../CommentItem.js';

class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      id: '',
      course_name: '',
      visible: true,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: navigation.state.params.header,
    })
  };

  init(cid) {
    fetch('http://172.220.7.76:8080' + '/v1/terms/' + cid, {
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
        if (result.success == true) {
          const title = this.props.navigation.state.params;
          this.setState({ visible: false, comments: result.data.comments.reverse(), title: title });
        } else {
          alert('otherwise: ' + result.sucess);
        }
      })
      .catch(err => {
        alert('err: ' + err);
      });
  }

  componentDidMount() {
    const {
      url,
      course_id,
      title
    } = this.props.navigation.state.params;
    fetch(url + '/v1/terms/' + course_id, {
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
        if (result.success === true) {
          this.setState({
            course_name: result.data.name,
            comments: result.data.comments.reverse(),
            visible: false,
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  jumpToRate = () => {
    const { navigate } = this.props.navigation;
    const { token, course_id } = this.props.navigation.state.params;
    navigate('Rate', {
      url: 'http://172.220.7.76:8080',
      token: token,
      id: course_id,
      refresh: () => { this.init.bind(this) },
      course_name: this.state.course_name,
    });
  };

  render() {
    const { token, course_id } = this.props.navigation.state.params;
    return (
      <View style={{ height: '100%' }}>
        {this.state.visible && <ActivityIndicator style={{
          position: "absolute",
          marginTop: "40%",
          alignSelf: "center"
        }} size={60} color="#0000ff" />}
        <FlatList
          contentContainerStyle={{ paddingBottom: '18%' }}
          data={this.state.comments}
          renderItem={({ item }) => (
            <Comment
              date={item.lastModifiedDate}
              comment={item.content}
              rate={item.rating}
            />
          )}
          keyExtractor={item => item.id}
        />
        <Button
          style={{
            width: '80%',
            position: 'absolute',
            bottom: '3%',
            left: '10%',
          }}
          onPress={() => this.props.navigation.navigate('Rate', {
            onNavigateBack: this.init.bind(this),
            url: 'http://172.220.7.76:8080',
            token: token,
            id: course_id,
            course_name: this.state.course_name,
          })}
          mode="contained">
          ADD COMMENT
        </Button>
      </View>
    );
  }
}

export default CommentScreen;

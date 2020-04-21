import * as React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Button, ActivityIndicator, IconButton } from 'react-native-paper';
import Comment from '../CommentItem.js';

class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      id: '',
      course_name: '',
      visible: true,
      notFound: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: navigation.state.params.header,
      headerTitleStyle: {
        // marginLeft: 'auto',
        alignSelf: 'center',
        color: '#F7F7F7',
      },
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
      headerLeft: (() => <IconButton
        icon={'chevron-left'}
        onPress={() => { navigation.goBack() }}
        color="#F7F7F7"
        size={35} />)
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
          this.setState({notFound:false, visible: false, comments: result.data.comments.reverse(), title: title });
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
          let notFound = false;
          if (result.data.comments.length === 0) {
            notFound = true;
          }
          this.setState({
            notFound: notFound,
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
    let notFound = this.state.notFound;
    return (
      <View style={{ height: '100%', width: "100%" }}>
        {this.state.visible && <ActivityIndicator style={{
          position: "absolute",
          marginTop: "40%",
          alignSelf: "center"
        }} size={60} color="#C5050C" />}
        {notFound &&
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 18, color: "grey", fontWeight: "bold", textAlign: "center", width: "100%", marginTop: "50%" }}>
              Whoops, there is no comment for this course : (
            </Text>
          </View>
        }
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
            borderRadius: 0,
            backgroundColor: "#C5050C",
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

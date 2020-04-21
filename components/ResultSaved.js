import * as React from 'react';

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  IconButton,
} from 'react-native-paper';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import Comment from './CommentItem.js';
import { NativeModules } from "react-native";

class ResultSaved extends React.Component {
  constructor(props) {
    super(props);
    this.state;
  }

  static navigationOptions = {
    title: 'Course Name',
  };

  toComment() {
    const { course_id, url, navigate, token } = this.props;
    navigate('Comment', {
      course_id: course_id,
      url: url,
      token: token,
    });
  }

  toUnSaved() {
    const { url, token } = this.props;
    fetch(url + '/v1/terms/unfavorite', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        token: token,
      },
      body: JSON.stringify({
        id: this.props.course_id,
      })
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.success === true) {
          const terms = result.data;
          this.props.updateList();
          alert("Course is Deleted");
        } else {
          alert("You have already deleted this course to your favorite list.");
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={{ top: -5, color: "#282728" }}>{this.props.title}</Title>

            <Paragraph>{this.props.description}</Paragraph>
            <View style={{ position: "absolute", right: 3, top: 0 }}>
              <IconButton
                icon="heart-off"
                color="#FF1493"
                size={30}
                onPress={() => this.toUnSaved()}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => this.toComment()}><Text style={{color:"#9b0000"}}>Detail</Text></Button>
          </Card.Actions>
        </Card>

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  card: { 
    width: '92%', 
    marginLeft: '4%', 
    marginTop: '4.5%', 
    borderRadius: 0, 
    backgroundColor: '#f7f7f7',

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10, // 设置阴影模糊半径
    shadowOpacity: 0.3, // 设置阴影的不透明度
    shadowColor: 'rgba(96,96,96,1)', // 设置阴影色

    elevation: 3,
  },

});

export default ResultSaved;

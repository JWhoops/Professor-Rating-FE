import * as React from 'react';

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
} from 'react-native-paper';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import Comment from './CommentItem.js';

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

  render() {
    return (

      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{this.props.title}</Title>

            <Paragraph>{this.props.description}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => this.toComment()}>Detail</Button>
          </Card.Actions>
        </Card>

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  card: { width: '94%', marginLeft: '3%', marginTop: '3%' },

});

export default ResultSaved;

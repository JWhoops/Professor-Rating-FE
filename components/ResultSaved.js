import * as React from 'react';

import {
  Card,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';

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
      <View style={{ marginBottom: 1 }}>
        <Card style={styles.card} onPress={() => this.toComment()}>
          <Card.Content>
            <Title style={{ top: -5, color: "#282728" }}>{this.props.title}</Title>
            <Paragraph>{this.props.description}</Paragraph>
            <View style={{ position: "absolute", right: 3, top: 0 }}>
              <IconButton
                accessibilityLabel={'unfavorite_btn'}
                testID={'unfavorite_btn'}
                accessible={true}
                icon="heart-off"
                color="#9b0000"
                size={28}
                onPress={() => this.toUnSaved()}
              />
            </View>
          </Card.Content>
          {/* <Card.Actions>
          <Button onPress={() => this.toComment()}><Text style={{ color: "#9b0000" }}>Detail</Text></Button>
        </Card.Actions> */}
        </Card>
      </View>
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
  },

});

export default ResultSaved;

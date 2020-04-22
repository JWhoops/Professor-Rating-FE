import * as React from 'react';

import {
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Text,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state;
  }

  static navigationOptions = {
    title: 'Course Name',
  };

  toComment() {
    const { course_id, url, year, season, navigate, token, comments, title } = this.props;
    navigate('Comment', {
      course_id: course_id,
      url: url,
      token: token,
      comments: comments,
      header: title + " (" + season + "," + year + ")",
    });
  }

  toSaved() {
    const { url, token } = this.props;
    fetch(url + '/v1/terms/favorite', {
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
          alert("Course Added :)");
        } else {
          alert("You have already added this course to your favorite list.");
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <View style={{ marginBottom: 1 }}>
        <Card style={styles.card} onPress={() => this.toComment()}
          accessibilityLabel={'result_card'}
          testID={'result_card'}
          accessible={true}
        >
          <Card.Content>
            <Title style={{ top: -5, color: "#282728" }}>{this.props.title}</Title>
            <Text style={{ fontSize: 11, color: "#646569", top: -8 }}>{this.props.season + ", " + this.props.year}</Text>
            <Paragraph style={{ marginTop: 8, color: "#282728" }}>{this.props.description}</Paragraph>
            <View style={{
              position: "absolute",
              right: 3,
              top: 0,
            }}>
              <IconButton
                accessibilityLabel={'favorite_btn'}
                testID={'favorite_btn'}
                accessible={true}
                icon="heart"
                color="#c5050c"
                size={30}
                onPress={() => this.toSaved()}
              />
            </View>
          </Card.Content>
          {/* <Card.Actions>
            <Button onPress={() => this.toComment()}><Text style={{color:"#9b0000"}}>Detail</Text></Button>
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

export default ResultItem;

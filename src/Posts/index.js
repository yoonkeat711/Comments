import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator} from 'react-native';

const BoldText = ({children, style}) => {
  return <Text style={{fontWeight: '700', ...style}}>{children}</Text>;
};

const Posts = ({route}) => {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [filteredComments, setFilteredComments] = useState();
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchPosts();
    fetchPostComments();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/' + route.params?.postId,
    );
    const result = await response.json();
    setData(result);
  };

  const fetchPostComments = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/comments?postId=' +
        route.params?.postId,
    );
    const result = await response.json();
    setComments(result);
  };

  const renderComments = ({item}) => {
    return (
      <View style={styles.commentsContainer}>
        <Text>
          <BoldText>Name: </BoldText>
          {item?.name}
        </Text>
        <Text>
          <BoldText>Email: </BoldText>
          {item?.email}
        </Text>
        <Text style={styles.commentsBody}>{item?.body}</Text>
      </View>
    );
  };

  const filterComments = text => {
    setFilterText(text);

    const filteredData = comments.filter(item => {
      return (
        item?.name.toLowerCase().includes(text) ||
        item?.email.toLowerCase().includes(text) ||
        item?.body.toLowerCase().includes(text)
      );
    });

    if (text !== '') setFilteredComments(filteredData);
  };

  if (!data && !comments) {
    return <ActivityIndicator />
  }
  else return (
    <View style={styles.container}>
      <BoldText style={styles.title}>{data?.title}</BoldText>
      <Text>{data?.body}</Text>
      <BoldText style={styles.comments}>Comments: </BoldText>
      <TextInput
        text={filterText}
        autoCorrect={false}
        autoCapitalize={'none'}
        onChangeText={filterComments}
        style={styles.filter}
        placeholder="Filter comments here by name, email, content..."
      />
      <FlatList
        data={filterText === '' ? comments : filteredComments}
        renderItem={renderComments}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  commentsContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  title: {
    paddingVertical: 8
  },
  comments: {
    paddingTop: 15,
    paddingBottom: 8,
  },
  filter: {
    borderRadius: 4,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 8,
  },
  commentsBody: {
    paddingTop: 10,
  },
});
export default Posts;

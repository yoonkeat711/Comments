import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Comments = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    const result = await response.json();
    setData(result);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.postContainer}
        onPress={() => onNavigateToPosts(item?.id)}>
        <Text style={styles.title}>
          {index + 1}. {item?.title}
        </Text>
        <Text>{item?.body}</Text>
      </TouchableOpacity>
    );
  };

  const onNavigateToPosts = postId => {
    navigation.navigate('Posts', {postId});
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  postContainer: {
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: '700',
    paddingBottom: 8,
  },
});

export default Comments;

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Provider as PaperProvider,
  Appbar,
  Card,
  Title,
  Paragraph,
  IconButton,
  Dialog,
  Portal,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const ClubScreen = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [showAddPost, setShowAddPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);

  const nameInputRef = useRef(null);

  const toggleAddPost = () => {
    setShowAddPost(!showAddPost);
    if (!showAddPost) {
      setName('');
      setContent('');
      setImageURI('');
    }
  };

  const addPost = () => {
    if (name.trim() === '' || content.trim() === '') {
      return;
    }

    const newPost = {
      id: Date.now(),
      name,
      content,
      imageURL: imageURI,
    };

    setPosts([...posts, newPost]);
    toggleAddPost();
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!result.cancelled) {
      setImageURI(result.assets[0].uri); // Updated key to result.assets[0].uri
    }
  };  

  const handleEditPost = () => {
    if (selectedPost && name.trim() !== '' && content.trim() !== '') {
      const editedPost = {
        ...selectedPost,
        name,
        content,
        imageURL: imageURI,
      };

      const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id ? editedPost : post
      );

      setPosts(updatedPosts);
      setIsEditDialogVisible(false);
      setSelectedPost(null);
      setName('');
      setContent('');
      setImageURI('');
    }
  };

  const handleDeletePost = () => {
    if (selectedPost) {
      const updatedPosts = posts.filter((post) => post.id !== selectedPost.id);
      setPosts(updatedPosts);
      setIsEditDialogVisible(false);
      setSelectedPost(null);
      setName('');
      setContent('');
      setImageURI('');
    }
  };

  return (
    <PaperProvider>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Explorer's Club" titleStyle={styles.title} />
        <Appbar.Action
          icon={showAddPost ? 'close' : 'plus'}
          onPress={toggleAddPost}
        />
      </Appbar.Header>
      <View style={styles.container}>
        {showAddPost && (
          <Card style={styles.inputContainer}>
            <Card.Content>
              <TextInput
                ref={nameInputRef}
                placeholder="Your Name"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Post Content"
                value={content}
                onChangeText={(text) => setContent(text)}
                style={[styles.input, styles.contentInput]}
                multiline
              />
              <Button title="Pick an Image" onPress={pickImage} />
              {imageURI !== '' && (
                <Image source={{ uri: imageURI }} style={styles.previewImage} />
              )}
            </Card.Content>
            <Card.Actions>
              <Button title="Add Post" onPress={addPost} />
            </Card.Actions>
          </Card>
        )}
        <ScrollView style={styles.postContainer}>
          {posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => {
                setSelectedPost(post);
                setIsEditDialogVisible(true);
                setName(post.name);
                setContent(post.content);
                setImageURI(post.imageURL);
                if (nameInputRef.current) {
                  nameInputRef.current.focus();
                }
              }}
            >
              <Card style={styles.post}>
                <Card.Content>
                  <Title style={styles.postAuthor}>{post.name}</Title>
                  <Paragraph style={styles.postContent}>{post.content}</Paragraph>
                  {post.imageURL && (
                    <Image source={{ uri: post.imageURL }} style={styles.postImage} />
                  )}
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Portal>
        <Dialog
          visible={isEditDialogVisible}
          onDismiss={() => setIsEditDialogVisible(false)}
        >
          <Dialog.Title>Edit or Delete Post</Dialog.Title>
          <Dialog.Content>
            <TextInput
              ref={nameInputRef}
              placeholder="Your Name"
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Post Content"
              value={content}
              onChangeText={(text) => setContent(text)}
              style={[styles.input, styles.contentInput]}
              multiline
            />
            <Button title="Pick an Image" onPress={pickImage} />
            {imageURI !== '' && (
              <Image source={{ uri: imageURI }} style={styles.previewImage} />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button title="Edit" onPress={handleEditPost}>Edit</Button>
            <Button title="Delete" onPress={handleDeletePost}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#3f51b5',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  contentInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  postContainer: {
    flex: 1,
    borderRadius: 8,
    marginVertical: 16,
    elevation: 4,
    backgroundColor: 'white',
  },
  post: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  postAuthor: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
    marginBottom: 8,
  },
  postContent: {
    color: '#666',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ClubScreen;

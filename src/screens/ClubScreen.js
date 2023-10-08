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
  const [imageAssets, setImageAssets] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);

  const nameInputRef = useRef(null);

  const toggleAddPost = () => {
    setShowAddPost(!showAddPost);
    if (!showAddPost) {
      setName('');
      setContent('');
      setImageAssets([]);
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
      imageAssets,
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
  
    if (!result.canceled) {
      // Use the 'assets' array to get selected assets
      setImageAssets([result.assets[0]]);
      console.log('Image Assets:', result.assets); // Add this line for debugging
    } else if (result.errorCode) {
      console.error('Image picking error:', result.errorCode);
    }
  };      

  const handleEditPost = () => {
    if (selectedPost && name.trim() !== '' && content.trim() !== '') {
      const editedPost = {
        ...selectedPost,
        name,
        content,
        imageAssets,
      };

      const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id ? editedPost : post
      );

      setPosts(updatedPosts);
      setIsEditDialogVisible(false);
      setSelectedPost(null);
      setName('');
      setContent('');
      setImageAssets([]);
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
      setImageAssets([]);
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
              {imageAssets.length > 0 && (
                <Image
                  source={{ uri: imageAssets[0].uri }}
                  style={styles.previewImage}
                />
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
                setImageAssets(post.imageAssets);
                if (nameInputRef.current) {
                  nameInputRef.current.focus();
                }
              }}
            >
              <Card style={styles.post}>
                <Card.Content>
                  <Title style={styles.postAuthor}>{post.name}</Title>
                  <Paragraph style={styles.postContent}>{post.content}</Paragraph>
                  {post.imageAssets.length > 0 && (
                    <Image
                      source={{ uri: post.imageAssets[0].uri }}
                      style={styles.postImage}
                    />
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
            {imageAssets.length > 0 && (
              <Image
                source={{ uri: imageAssets[0].uri }}
                style={styles.previewImage}
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button title="Delete" onPress={handleDeletePost}>Delete</Button>
            <Button title="Done" onPress={handleEditPost}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appBar: {
    backgroundColor: 'blue', // Change to your desired color
  },
  title: {
    color: 'white', // Change to your desired text color
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#f0f0f0', // Change to your desired background color
  },
  contentInput: {
    minHeight: 100,
  },
  previewImage: {
    width: 200, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: 'cover',
  },
  postContainer: {
    marginTop: 16,
  },
  post: {
    marginBottom: 16,
  },
  postAuthor: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 16,
  },
  postImage: {
    width: '100%', // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
  },
});

export default ClubScreen;

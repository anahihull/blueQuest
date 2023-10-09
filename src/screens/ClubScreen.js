import React, { useState } from 'react';
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
  Card,
  Title,
  Paragraph,
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
  
    if (!result.cancelled) {
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
      <ScrollView style={styles.container}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={() => {
              setSelectedPost(post);
              setIsEditDialogVisible(true);
              setName(post.name);
              setContent(post.content);
              setImageAssets(post.imageAssets);
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
      {showAddPost && (
        <View style={styles.inputContainer}>
          <TextInput
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
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={toggleAddPost} style={styles.cancelButton} />
            <Button title="Add Post" onPress={addPost} />
          </View>
        </View>
      )}
      {!showAddPost && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={toggleAddPost}
        >
          <Text style={styles.addButtonLabel}>+</Text>
        </TouchableOpacity>
      )}
      <Portal>
        <Dialog
          visible={isEditDialogVisible}
          onDismiss={() => setIsEditDialogVisible(false)}
        >
          <Dialog.Title>Edit or Delete Post</Dialog.Title>
          <Dialog.Content>
            <TextInput
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
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  contentInput: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    fontSize: 24,
    color: 'white',
  },
  post: {
    marginBottom: 16,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    marginTop: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 8,
  },
});

export default ClubScreen;

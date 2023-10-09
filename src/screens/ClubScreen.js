import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Provider as PaperProvider,
  Title,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import {Card, Image} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const ClubScreen = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [imageAssets, setImageAssets] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);

  const MyCard = ({ title, content, image }) => {
    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider/>
        <Text style={{ marginBottom: 10 }}>
          {content}
        </Text>
        <Card.Image source={image} style={{borderRadius: 10}} />
      </Card>
    );
  };

  const data = [
    {
      title: 'Discovering the Deep: Your Most Exciting Underwater Caves Experiences',
      content: ' Last month, I explored the submerged caves off the coast of Mexico. The stunning stalactites and the eerie stillness of the place were breathtaking! Has anyone else dove here before?',
      image: { uri: 'https://i.pinimg.com/564x/09/e6/7b/09e67ba7ae7e957f5e92d90daa47caf2.jpg' }
    },
    {
      title: 'Safety First: Share Your Tips for Safe Deep-sea Diving',
      content: 'Always, always, always do a thorough equipment check before descending. A minor malfunction can be a major issue in the depths.',
      image: { uri: 'https://i.pinimg.com/564x/9a/11/1c/9a111c187f7eb5eceb3b556c8a8255d5.jpg' }
    },
    {
      title: 'Mysterious Ocean Sounds: Your Experiences and Theories',
      content: '"I once heard a low-frequency hum in the Pacific that lasted about a minute. Still puzzled about what it could be. Any similar experiences?',
      image: { uri: 'https://i.pinimg.com/564x/9e/6e/68/9e6e68c0e7313a81bf97cc23bc27d45e.jpg' }
    }
  ];

  const CardList = ({ data }) => {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        {data.map((item, index) => (
          <MyCard
          key={index}
          title={item.title}
          content={item.content}
          image={item.image}
          />
        ))}
      </View>
    );
  };

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
      <ScrollView style={styles.container}>
      <View>
        <CardList data={data}/>
      </View>
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
          <TouchableOpacity
            onPress={pickImage}
            style={styles.roundButton} // Apply the round button style here
          >
            <Text style={styles.roundButtonText}>Pick an Image</Text>
          </TouchableOpacity>
          {imageAssets.length > 0 && (
            <Image
              source={{ uri: imageAssets[0].uri }}
              style={styles.previewImage}
            />
          )}
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress={addPost}
              style={styles.roundButton} // Apply the round button style here
            >
              <Text style={styles.roundButtonText}>Add Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleAddPost}
              style={styles.roundButton} // Apply the round button style here
            >
              <Text style={styles.roundButtonText}>Cancel</Text>
            </TouchableOpacity>
            
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
            <TouchableOpacity
              onPress={pickImage}
              style={styles.roundButton} 
            >
              <Text style={styles.roundButtonText}>Pick an Image</Text>
            </TouchableOpacity>
            {imageAssets.length > 0 && (
              <Image
                source={{ uri: imageAssets[0].uri }}
                style={styles.previewImage}
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
          
            <TouchableOpacity
              onPress={handleDeletePost}
              style={styles.roundButton} 
            >
              <Text style={styles.roundButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleEditPost}
              style={styles.roundButton} 
            >
              <Text style={styles.roundButtonText}>Done</Text>
            </TouchableOpacity>
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
    backgroundColor: '#87cefa',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
    height: 40,
    paddingLeft: 8,
  },
  contentInput: {
    height: 100,
  },
  roundButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20, // Adjust the value to make it more or less round
    alignItems: 'center',
    marginTop: 8,
    elevation: 3, // Add some elevation for a shadow effect
  },
  roundButtonText: {
    color: 'white',
    fontSize: 16,
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
    backgroundColor: '#3498db',
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

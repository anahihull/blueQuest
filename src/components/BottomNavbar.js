import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';



const BottomNavbar = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Home')}
      >
        <Icon2 name="home" size={30} color="#87cefa" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Learn')}
      >
        <Icon name="book" size={30} color="#87cefa" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Club')}
      >
        <Icon name="user-friends" size={30} color="#87cefa" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Map')}
      >
        <Icon3 name="jellyfish" size={30} color="#87cefa" />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '',
    height: 60, 
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default BottomNavbar;
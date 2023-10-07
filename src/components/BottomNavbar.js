import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <Icon name="heart" size={30} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Learn')}
      >
        <Icon name="heart" size={30} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Club')}
      >
        <Icon name="heart" size={30} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigateToScreen('Map')}
      >
        <Icon name="heart" size={30} color="red" />
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
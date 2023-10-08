import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Modal, TouchableOpacity, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const bucketHeight = 50;
const bucketWidth = 50;

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [fallenItems, setFallenItems] = useState(0);
  const [fallingObjects, setFallingObjects] = useState([]);
  const [bucketPosition, setBucketPosition] = useState(150);
  const [gameOver, setGameOver] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      setBucketPosition(bucketPosition + gestureState.dx);
    },
  });

  const isColliding = (obj1, obj2) => (
    obj1.positionX < obj2.positionX + obj2.width &&
    obj1.positionX + obj1.width > obj2.positionX &&
    obj1.positionY + obj1.height > obj2.positionY &&
    obj1.positionY < obj2.positionY + obj2.height
  );

  useEffect(() => {
    const objectCreator = setInterval(() => {
      const newObj = { positionX: Math.floor(Math.random() * windowWidth), positionY: 0, width: 30, height: 30 };
      setFallingObjects((prevObjects) => [...prevObjects, newObj]);
    }, 1000);

    return () => clearInterval(objectCreator);
  }, []);

  useEffect(() => {
    const objectMover = setInterval(() => {
      const newFallingObjects = fallingObjects.map((obj) => ({
        ...obj,
        positionY: obj.positionY + 10,
      }));

      const bucket = {
        positionX: bucketPosition,
        positionY: windowHeight - bucketHeight,
        width: bucketWidth,
        height: bucketHeight,
      };

      let scoreIncrement = 0;
      const filteredFallingObjects = newFallingObjects.filter((obj) => {
        if (obj.positionY + obj.height >= windowHeight) {
          setFallenItems((prev) => prev + 1);
          return false;
        }

        if (isColliding(obj, bucket)) {
          scoreIncrement += 1;
          return false;
        }

        return true;
      });

      setScore((prevScore) => prevScore + scoreIncrement);
      setFallingObjects(filteredFallingObjects);
    }, 100);

    return () => clearInterval(objectMover);
  }, [bucketPosition, fallingObjects]);

  useEffect(() => {
    if (score >= 100 || fallenItems >= 5) {
      setGameOver(true);
    }
  }, [score, fallenItems]);

  const resetGame = () => {
    setScore(0);
    setFallenItems(0);
    setFallingObjects([]);
    setGameOver(false);
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={gameOver}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Game Over</Text>
            <Text style={styles.modalScore}>Score: {score}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={resetGame}>
              <Text style={styles.textStyle}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.score}>Score: {score}</Text>
      {fallingObjects.map((object, index) => (
        <View
          key={index}
          style={[
            styles.fallingObject,
            { top: object.positionY, left: object.positionX },
          ]}
        />
      ))}
      <View style={[styles.bucket, { left: bucketPosition }]} />
    </View>
  );
};
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEF',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#009688'
  },
  bucket: {
    width: bucketWidth,
    height: bucketHeight,
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 25
  },
  fallingObject: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 10,
  },
  // Styles para el modal:
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalScore: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  retryButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameScreen;

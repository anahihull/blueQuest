import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Modal from 'react-native-modal';

const Questions = [
  {
    "Answers": [
      "Through their skin",
      "By drinking water",
      "Using gills"
    ],
    "Correct Answer": "Using gills",
    "ID": "'1'",
    "Question": "What is the main way fish breathe underwater?"
  },
  {
    "Answers": [
      "Dolphins",
      "Turtles",
      "Eels"
    ],
    "Correct Answer": "Eels",
    "ID": "'2'",
    "Question": "Which of these animals lives in both saltwater and freshwater environments?"
  },
  {
    "Answers": [
      "Seaweeds",
      "Plankton",
      "Coral reefs"
    ],
    "Correct Answer": "Plankton",
    "ID": "'3'",
    "Question": "What is the term for tiny floating organisms in the ocean that form the base of the marine food chain?"
  },
  {
    "Answers": [
      "Swimming",
      "Photosynthesis",
      "Digestion"
    ],
    "Correct Answer": "Photosynthesis",
    "ID": "'4'",
    "Question": "What process do aquatic plants use to make their own food using sunlight?"
  },
  {
    "Answers": [
      "Seashells",
      "Plastic bags",
      "Algae blooms"
    ],
    "Correct Answer": "Algae blooms",
    "ID": "'5'",
    "Question": "What poses a danger to aquatic ecosystems by blocking sunlight and reducing oxygen levels in the water?"
  }
];

const getRandomQuestion = () => {
  const randomNum = Math.floor(Math.random() * Questions.length);
  return Questions[randomNum];
};

const LearnScreen = () => {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(false);
  };

  const checkAnswer = () => {
    setShowResult(true);

    if (isCorrectAnswer()) {
      setModalVisible(true);
    }
  };

  const isCorrectAnswer = () => {
    return selectedAnswer === question['Correct Answer'];
  };

  const handleNextQuestion = () => {
    setQuestion(getRandomQuestion());
    setSelectedAnswer('');
    setShowResult(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DAILY MISSION</Text>
      <Text style={styles.question}>{question.Question}</Text>

      {question.Answers.map((answer, index) => (
        <View key={index} style={styles.optionContainer}>
          <RadioButton
            value={answer}
            status={selectedAnswer === answer ? 'checked' : 'unchecked'}
            onPress={() => handleAnswerChange(answer)}
            disabled={showResult}
            style={styles.radioinput}
          />
          <Text style={styles.optionText}>{answer}</Text>
        </View>
      ))}

      <Button
        title="Verify Answer"
        onPress={checkAnswer}
        disabled={!selectedAnswer || showResult}
      />

      <Image
        source={require('../../assets/drop.png')} style={{width: 200, height: 200}} />

      {showResult && (
        <Text style={isCorrectAnswer() ? styles.correctText : styles.incorrectText}>
          {isCorrectAnswer() ? '¡Correct answer!' : 'Incorrect answer. Try again.'}
        </Text>
      )}

      {showResult && !isCorrectAnswer() && (
        <Button
          title="Try again"
          onPress={handleNextQuestion}
        />
      )}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Congratulations!</Text>
          <Text style={styles.modalText}>You unlocked a new lesson.</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#87cefa',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"#FFFFFF"
  },
  question: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
    backgroundColor: '#3498db',
    borderWidth: 10,
    borderColor: '#3498db'
  },
  radioinput:{
    backgroundColor:"#3498db",
    border: '#3498db',
    borderColor: '#3498db',
    borderWidth: '#3498db'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 20,
    color: '#3498db',
    fontWeight: 'bold'
  },
  correctText: {
    color: 'green',
    fontSize: 16,
    marginTop: 10,
  },
  incorrectText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default LearnScreen;
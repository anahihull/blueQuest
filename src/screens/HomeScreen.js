import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
      <Text style={styles.title}>Trivia Time!</Text>
      <Text style={styles.question}>{question.Question}</Text>

      {question.Answers.map((answer, index) => (
        <View key={index} style={styles.optionContainer}>
          <RadioButton
            value={answer}
            status={selectedAnswer === answer ? 'checked' : 'unchecked'}
            onPress={() => handleAnswerChange(answer)}
            disabled={showResult}
          />
          <Text style={styles.optionText}>{answer}</Text>
        </View>
      ))}

      <Button
        title="Verify Answer"
        onPress={checkAnswer}
        disabled={!selectedAnswer || showResult}
      />

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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
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
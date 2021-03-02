import React from 'react'
import { connect } from 'react-redux'
import { Card, Button, Title, Paragraph, Surface, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const QuestionCard = (props) => {
  const [showAnswer, setShowAnswer] = React.useState(false)
  const toggleAnswer = () => setShowAnswer(!showAnswer)

  return (
    <Card>
      <Card.Content>
        <Title>{ showAnswer === true ? props.answer : props.question}</Title>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button mode="contained" style={[styles.button, styles.toggle]} onPress={toggleAnswer}>{`Show ${showAnswer===true?'Question':'Answer'}`}</Button>
        <Button mode="contained" style={styles.button} onPress={() => {props.recordResult(true)}}>Correct</Button>
        <Button mode="contained" style={styles.button} onPress={() => {props.recordResult(false)}}>Incorrect</Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'column',
  },
  button: {
    color: 'white',
    backgroundColor: 'rgb(98, 0, 238)',
    margin: 5,
    width: 250,
  },
  toggle: {
    backgroundColor: 'wheat',
  }
});

export default QuestionCard

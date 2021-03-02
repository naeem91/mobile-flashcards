import React from 'react'
import { connect } from 'react-redux'
import { Card, Text, Title, Button } from 'react-native-paper'
import {View, StyleSheet} from 'react-native'
import QuestionCard from './QuestionCard'
import { recordQuizTime } from '../utils/api'

const QuizScreen = (props) => {
  const { cardIDs, cards, deckID } = props
  const totalCards = cardIDs.length

  const [cardIndex, setCardIndex] = React.useState(0)
  const [showResult, setShowResult] = React.useState(false)
  const [correctCount, setcorrectCount] = React.useState(0)

  const getCard = (cardIndex) => cards[cardIDs[cardIndex]]
  const displayNext = () => {
    if(cardIndex + 1 === totalCards){
      setShowResult(true)
      recordQuizTime()
    }else{
      setCardIndex(cardIndex + 1)
    }
  }
  const recordResult = (response) => {
    response === true
    ? setcorrectCount(correctCount + 1)
    : null
    displayNext()
  }
  const restartQuiz = () => {
    setCardIndex(0)
    setShowResult(false)
    setcorrectCount(0)
  }

  return (
    <View style={styles.container}>
      {
        totalCards === 0
        ? <Text> There's no cards in this deck. Please add cards first. </Text>
        : showResult === false
        ? <View>
            <Text style={styles.count}> {`Question ${cardIndex + 1} of ${totalCards}`}  </Text>
            <QuestionCard {...getCard(cardIndex)} recordResult={recordResult} />
          </View>
        : <Card>
            <Card.Content>
              <Title>{`Correct Answers: ${correctCount}/${totalCards}`}</Title>
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <Button
              mode="contained"
              style={styles.button}
              onPress={restartQuiz}
              >Restart Quiz</Button>
              <Button
              mode="contained"
              style={styles.button}
              onPress={() => props.navigation.navigate('DeckDetailScreen', {deckID})}
              >Back to Deck</Button>
            </Card.Actions>
          </Card>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 300,
    alignSelf: 'center',
    marginTop: 20,
  },
  count: {
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'column',
  },
  button: {
    color: 'white',
    backgroundColor: 'rgb(98, 0, 238)',
    margin: 5,
    width: 150,
  },
})

function mapStateToProps({decks, cards}, {route}){
  const { deckID } = route.params
  return {
    deckID,
    cardIDs: decks[deckID].cards,
    cards
  }
}

export default connect(mapStateToProps)(QuizScreen)

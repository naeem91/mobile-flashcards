import * as React from 'react'
import { connect } from 'react-redux'
import { Card, Button, Title, Subheading, Surface, Text } from 'react-native-paper'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { removeDeckHandler } from '../actions/decks'

const Deck = (props) => {
  const onDeletion = () => {
    props.navigation.navigate('Home')
  }
  const deleteDeck = () => {
    props.dispatch(removeDeckHandler(props.id, onDeletion))
  }
  return (
    <Card style={styles.deck}>
      <Card.Content>
        <Title style={styles.title}>{props.name}</Title>
        <Subheading style={styles.subtitle}>{`${props.cards && props.cards.length} cards`}</Subheading>
      </Card.Content>
      {
        props.showActions && (
          <Card.Actions style={styles.actions}>
            <Button
              style={styles.button}
              onPress={()=> {props.navigation.navigate('AddCardScreen', {deckID: props.id})}}
            >Add Card
            </Button>
            <Button
              style={styles.button}
              onPress={()=> {props.navigation.navigate('QuizScreen', {deckID: props.id})}}
            >Start Quiz</Button>
            <Button
            style={styles.button}
            color="red"
            onPress={deleteDeck}>Delete Deck</Button>
          </Card.Actions>
        )
      }
    </Card>
  )
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: 'rgb(98, 0, 238)',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'white',
    margin: 5,
    width: 150,
  }
});

function mapStateToProps({decks}){
  return {
    decks
  }
}

export default connect()(Deck)

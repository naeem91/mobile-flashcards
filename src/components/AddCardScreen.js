import React from 'react'
import { connect } from 'react-redux'
import Deck from './Deck'
import {View, StyleSheet} from 'react-native'
import { Button, Text, TextInput, Snackbar } from 'react-native-paper'
import { addCardtoDeckHandler } from '../actions/decks'

const AddCardScreen = (props) => {
  const { deckID } = props.route.params
  const [qText, setQText] = React.useState('')
  const [ansText, setAnsText] = React.useState('')

  const onCardAdded = () => {props.navigation.goBack()}
  const addCard = () => {
    props.dispatch(addCardtoDeckHandler(
      deckID, qText, ansText, onCardAdded
    ))
  }

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        label="Question"
        value={qText}
        mode="outlined"
        onChangeText={text => setQText(text)}
      />
      <TextInput
        style={style.input}
        label="Answer"
        value={ansText}
        mode="outlined"
        onChangeText={text => setAnsText(text)}
        multiline
      />
      <Button
        style={style.button}
        disabled={qText === '' || ansText === ''}
        mode="contained"
        onPress={addCard}>
        Add
      </Button>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 300,
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
  input: {
    marginTop: 10,
  }
})



export default connect()(AddCardScreen)

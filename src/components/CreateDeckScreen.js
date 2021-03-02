import React from 'react'
import { connect } from 'react-redux'

import {View, StyleSheet} from 'react-native'
import { Button, Text, TextInput, Snackbar } from 'react-native-paper'
import { createDeckHandler } from '../actions/decks'

const CreateDeckScreen = (props) => {
  const [text, setText] = React.useState('')

  const onSuccess = (deckID) => {
    props.navigation.pop() // remove this from nav history
    props.navigation.navigate('DeckDetailScreen', {deckID})
  }
  const createDeck = () => {
    props.dispatch(createDeckHandler(text, onSuccess))
  }

  return (
    <View style={style.container}>
      <TextInput
        label="Title of your new deck?"
        value={text}
        mode="outlined"
        onChangeText={text => setText(text)}
      />
      <Button style={style.button} disabled={text === ''} mode="contained" onPress={createDeck}>
        Create
      </Button>
    </View>
  )

}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    width: 300,
  },
  button: {
    marginTop: 20,
  }
})

export default connect()(CreateDeckScreen)

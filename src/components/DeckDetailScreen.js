import React from 'react'
import { connect } from 'react-redux'
import Deck from './Deck'
import {View, StyleSheet} from 'react-native'

const DeckDetailScreen = (props) => {
  const { deckID } = props.route.params
  const { decks } = props

  return (
    <View style={style.container}>
      <Deck {...decks[deckID]} showActions={true} navigation={props.navigation}/>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    margin: 20,
  }
})

function mapStateToProps({decks}){
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckDetailScreen)

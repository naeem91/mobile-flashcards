import React from 'react'
import loadAppData from '../actions/shared'
import {
StyleSheet, View, SafeAreaView, FlatList, StatusBar,
TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'

class HomeScreen extends React.Component {
  componentDidMount(){
    this.props.dispatch(loadAppData())
  }
  render() {
    const { decks } = this.props

    const renderDeck = ({ item }) => (
      <TouchableOpacity
        style={styles.toucharea}
        onPress={() => {
          this.props.navigation.navigate('DeckDetailScreen', {deckID: item.id})
        }}>
        <Deck {...item} />
      </TouchableOpacity>
    )

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={decks}
            renderItem={renderDeck}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  toucharea: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 300,
    alignSelf: 'center',
  },
})


function mapStateToProps({decks}){
  return {
    decks: Object.values(decks).sort(function(a, b){return b.timestamp - a.timestamp})
  }
}

export default connect(mapStateToProps)(HomeScreen)

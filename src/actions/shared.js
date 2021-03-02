import { loadAppData } from '../utils/api'
import { receiveDecks } from './decks'
import { receiveCards } from './cards'

export default function loadInitialData(){
  return (dispatch) => {
    return loadAppData()
    .then(({ decks, cards }) => {
      dispatch(receiveDecks(decks))
      dispatch(receiveCards(cards))
    })
  }
}

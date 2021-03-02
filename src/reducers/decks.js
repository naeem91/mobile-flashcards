import {
  RECEIVE_DECKS,
  CREATE_DECK,
  ADD_CARD_TO_DECK,
  REMOVE_DECK
} from '../actions/decks'

export default function decksReducer(state={}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks
    case CREATE_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck
      }
    case REMOVE_DECK:
      let decks = Object.assign({}, state)
      delete decks[action.deckID]
      return decks
    case ADD_CARD_TO_DECK:
      const deck = state[action.deckID]
      return {
        ...state,
        [deck.id]: {
          ...deck,
          cards: deck.cards.concat([action.card.id])
        }
      }
    default:
      return state
  }
}

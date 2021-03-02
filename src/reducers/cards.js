import { RECEIVE_CARDS } from '../actions/cards'
import { ADD_CARD_TO_DECK } from '../actions/decks'

export default function cardsReducer(state={}, action) {
  switch (action.type) {
    case RECEIVE_CARDS:
      return action.cards
    case ADD_CARD_TO_DECK:
      const card = action.card
      return {...state, [card.id]: card}
    default:
      return state
  }
}

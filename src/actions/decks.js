import {
  saveDeck,
  removeDeck,
  addCardtoDeck,
} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'


export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function createDeck(deck){
  return {
    type: CREATE_DECK,
    deck
  }
}

export function removeDeckAction(deckID){
  return {
    type: REMOVE_DECK,
    deckID
  }
}

export function addCardtoDeckAction(deckID, card){
  return {
    type: ADD_CARD_TO_DECK,
    deckID,
    card
  }
}

export function createDeckHandler(name, cb){
  return (dispatch) => {
    return saveDeck(name)
    .then((deck) => {
      dispatch(createDeck(deck))
      cb(deck.id)
    })
  }
}

export function removeDeckHandler(deckID, cb){
  return (dispatch) => {
    removeDeck(deckID)
    .then(() => {
      cb()
      dispatch(removeDeckAction(deckID))
    })
  }
}

export function addCardtoDeckHandler(deckID, question, answer, cb){
  return (dispatch) => {
    addCardtoDeck(deckID, question, answer)
    .then((card) => {
      dispatch(addCardtoDeckAction(deckID, card))
      cb()
    })
  }
}

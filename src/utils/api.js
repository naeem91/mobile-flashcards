import { getObject, setObject, mergeObject } from './storage'
import { generateUID } from './helpers'

const DECKS_KEY = 'MobileFlashCards:decks'
const CARDS_KEY = 'MobileFlashCards:cards'
const QUIZ_TIME_KEY = 'MobileFlashCards:quiz_time'

function _formatDeck(name){
  return {
    id: generateUID(),
    timestamp: Date.now(),
    name,
    cards: []
  }
}

function _formatCard(question, answer){
  return {
    id: generateUID(),
    timestamp: Date.now(),
    question,
    answer
  }
}

function _saveCard(card){
  _getCards().then((cards)=>{
    let c = {...cards, [card.id]:card}
    setObject(CARDS_KEY, c)
  })
}

function _getDecks(){
  return getObject(DECKS_KEY)
}

function _getCards(){
  return getObject(CARDS_KEY)
}

function _removeCard(cardID){
  _getCards().then((cards) => {
    delete cards[cardID]
    setObject(CARDS_KEY, cards)
  })
}

export function loadAppData () {
  return Promise.all([
    _getDecks(),
    _getCards(),
  ]).then(([decks, cards]) => ({
    decks,
    cards,
  }))
}

export function saveDeck(name){
  const deck = _formatDeck(name)

  return new Promise((res, rej) => {
    _getDecks().then((decks) => {
      let d = {...decks, [deck.id]:deck}
      setObject(DECKS_KEY, d)
      return res(deck)
    })
  })
}

export function removeDeck(deckID){
  return new Promise((res, rej) => {
      _getDecks().then((decks) => {
        // remove decks' cards first
        for(let cardID of decks[deckID].cards){
          _removeCard(cardID)
        }
        delete decks[deckID]
        setObject(DECKS_KEY, decks)
        return res()
      })
  })

}

export function addCardtoDeck(deckID, question, answer){
  const card = _formatCard(question, answer)
  _saveCard(card)

  return new Promise((res, rej) => {
    _getDecks().then((decks) => {
      const deck = decks[deckID]
      const d = {
        ...decks,
        [deckID]: {
          ...deck,
          cards: deck.cards.concat([card.id])
        }
      }
      mergeObject(DECKS_KEY, d)
      return res(card)
    })
  })
}

export function recordQuizTime(){
  setObject(QUIZ_TIME_KEY, Date.now())
}

export function getLastQuizTime(){
  return new Promise((res, rej) => {
    getObject(QUIZ_TIME_KEY).then((time) => {
      return res(time)
    })
  })
}

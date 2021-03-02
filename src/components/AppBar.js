import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, Menu } from 'react-native-paper'

function AppBar ({ navigation, previous }) {
  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  const moveToNewDeck = () => {
    navigation.navigate('CreateDeckScreen')
    closeMenu()
  }

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Flashcards" />
      {!previous ? (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action icon="menu" color="white" onPress={openMenu} />
            }>
            <Menu.Item onPress={moveToNewDeck} title="New Deck" />
          </Menu>
        ) : null}
    </Appbar.Header>
  )
}

export default AppBar

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'
import loadInitialData from '../actions/shared'
import AppBar from './AppBar'
import HomeScreen from './HomeScreen'
import CreateDeckScreen from './CreateDeckScreen'
import DeckDetailScreen from './DeckDetailScreen'
import AddCardScreen from './AddCardScreen'
import QuizScreen from './QuizScreen'
import { scheduleStudyNotification } from '../utils/notifications'

const Stack = createStackNavigator()

function App(){
  useEffect(() => {
    if(Platform.OS === 'android')
      scheduleStudyNotification()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateDeckScreen" component={CreateDeckScreen} />
        <Stack.Screen name="DeckDetailScreen" component={DeckDetailScreen} />
        <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

import { registerRootComponent } from 'expo';
import React from 'react'
import App from './src/components/App';
import { createStore } from 'redux'
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux'
import reducer from './src/reducers/index'
import middleware from './src/middleware/index'

const store = createStore(reducer, middleware)

const RNRedux = () => (
  <StoreProvider store = { store }>
    <PaperProvider>
      <App />
    </PaperProvider>
  </StoreProvider>
)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(RNRedux);

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './src/splashscreen/SplashScreen'
import MainStackNavigation from './src/navigation/navigation'
import Mycontext from './src/context/Mycontext'
import { Provider } from 'react-redux'
import Store from './services/redux/Store'

const App = () => {
  return (
    // <Provider store={Store}>
      <Mycontext>
        <MainStackNavigation />
      </Mycontext>
    // </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
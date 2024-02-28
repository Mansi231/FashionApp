import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './src/splashscreen/SplashScreen'
import MainStackNavigation from './src/navigation/navigation'
import Mycontext from './src/context/Mycontext'
import { Provider } from 'react-redux'
import Store from './services/redux/Store'
import { Colors } from './utils'
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from './pixel'

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

export const appStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1, backgroundColor: Colors.white, paddingBottom: hp(1)
  }
})
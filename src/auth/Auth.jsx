import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Auth = ({ navigation, route }) => {

  const [from, setFrom] = useState(route?.params?.from || 'signup')
  let accountType = { signin: 'signin', signup: 'signup' }

  // let from = 'signup'

  const GobackToScreen = () => {
    navigation.goBack()
  }

  return (
    <>
      {from == accountType?.signin ? <SignIn
        onGoBack={GobackToScreen}
        goback={route?.params?.goback ? route?.params?.goback : false} navigation={navigation} from={from} setFrom={setFrom} /> : <SignUp
        onGoBack={GobackToScreen}
        goback={route?.params?.goback ? route?.params?.goback : false}
        navigation={navigation} from={from} setFrom={setFrom} />}
    </>
    // <SignIn navigation={navigation} from={from} setFrom={setFrom} />
  )
}

export default Auth

const styles = StyleSheet.create({})
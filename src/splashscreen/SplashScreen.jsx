import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../pixel'
import { Colors } from '../../utils'
import logo from '../assets/logo.png'
import { Routes } from '../../services/Routes'
import { useFocusEffect } from '@react-navigation/native'
import { Context } from '../context/Mycontext'
import { KEYS, getItemFromStorage } from '../../services/storage'

const SplashScreen = ({ navigation }) => {

    const { isVerified, setIsVerified } = useContext(Context)

    useEffect(() => {
        getIsUserLoggedIn()
    },[])

    const getIsUserLoggedIn = async () => {
        try {
            const is_verified = await getItemFromStorage(KEYS.is_verified)
            if (is_verified == 1) {
                setIsVerified(is_verified)
                setTimeout(() => { navigation.replace(Routes?.BottomTab) }, 1500)
            }
            else {
                setTimeout(() => { navigation.replace(Routes?.GetStarted) }, 1500)
            }
        } catch (error) {
            console.log(error, ' + error while getting is_verified .')
        }
    }

    return (
        <View style={styles?.container}>
            <View style={styles?.logoContainer}>
                <Image source={logo} style={styles?.logoImage} />
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors?.white },
    logoContainer: { width: hp(23), height: hp(23) },
    logoImage: { resizeMode: 'contain', width: '100%', height: '100%' }
})
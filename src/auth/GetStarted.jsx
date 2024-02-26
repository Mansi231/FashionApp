import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import getStarted from '../assets/auth/getStarted.png'
import { Colors, Fonts } from '../../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../pixel'
import { FilledButton } from '../components/InputComp/Button'
import { Routes } from '../../services/Routes'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? hp(6) : 0;

const GetStarted = ({ navigation }) => {

    const handleNavigation = (from) => {
        navigation.navigate(Routes.Auth, { from })
    }

    return (
        <View style={styles?.container}>
            {/* <View style={{
                width: "100%",
                height: STATUS_BAR_HEIGHT,
                backgroundColor: Colors.white
            }} /> */}
            <StatusBar
                backgroundColor={Colors.white}
                barStyle="dark-content"
            />
            <Text style={styles?.skip} onPress={()=>navigation.replace(Routes?.BottomTab)}>Skip</Text>
            <Image source={getStarted} style={{ width: wp(95), height: hp(50), resizeMode: 'contain', marginTop: hp(0) }} />
            <Text style={styles?.headingText}>The<Text style={{ color: Colors?.primaryBrown }}>{' '}Fashion App{' '}</Text>That {'\n'} Makes You Look </Text>
            <Text style={styles?.text}>The Lorem ipsum dolor sit amet consectetur {'\n'} adipisicing elit , Est placeat reiciendis</Text>
            <FilledButton text={`Let's Get Started`} onPress={() => handleNavigation('signup')} />
            <Text style={styles.signInText}>Already have an account?{' '}<Text style={styles.signIn} onPress={() => { handleNavigation('signin') }}>{' '}Sign In</Text></Text>
        </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors?.white, paddingHorizontal: wp(3.2) },
    skip: {
        color: Colors.primaryBrown, fontFamily: Fonts?.RobotoMedium, fontSize: hp(2.3), alignSelf: 'flex-end', paddingHorizontal: wp(3.2), marginVertical: hp(2)
    },
    headingText: { fontSize: hp(3.2), color: Colors?.black, marginVertical: hp(3), textAlign: 'center', fontFamily: Fonts?.RobotoBold },
    text: { color: Colors?.lightGrey, fontSize: hp(1.9), textAlign: 'center', width: '100%', fontFamily: Fonts?.RobotoRegular },
    signInText: { fontSize: hp(1.9), color: Colors?.black, marginVertical: hp(2.5) },
    signIn: { textDecorationLine: 'underline', textAlign: 'center', fontFamily: Fonts?.RobotoRegular, color: Colors.primaryBrown }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { Header } from '../../components/CommonComp'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FilledButton, OutLinedButton } from '../../components/InputComp/Button'

const PaymentSuccess = ({navigation,route}) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={[styles?.container]}>
                <Header heading={'Payment'} onPress={()=>navigation.goBack()}/>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name='checkcircle' size={hp(15)} color={Colors.primaryBrown} />
                    <Text style={[styles?.heading]}>Payment Successful!</Text>
                    <Text style={[styles?.text]}>Thank you for your purchase</Text>
                </View>
                <View style={[styles?.cartBtnView, { marginVertical: 0 }]}>
                    <FilledButton
                        text={'View Order'}
                        btnStyle={{ flex: 1, marginTop: 0, height: hp(6), paddingVertical: hp(.2) }} />
                    <OutLinedButton text={'View E-Receipt'} style={{
                        borderWidth:0,height: hp(5), paddingVertical: hp(.2)
                    }}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PaymentSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingBottom: hp(3.3), paddingHorizontal: wp(5.2),
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    heading: {
        color: Colors.black, fontSize: hp(2.5), fontFamily: Fonts.RobotoBold,
        marginVertical: hp(2)
    },
    text: { color: Colors.grey, fontSize: hp(2.1), fontFamily: Fonts.RobotoRegular },
    cartBtnView: {
        paddingTop: hp(2), borderColor: Colors?.borderGrey, borderWidth: hp(.12),
        borderTopLeftRadius: hp(2), borderTopRightRadius: hp(2), borderBottomWidth: 0,
        bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: Colors?.white,
        marginTop: hp(2), paddingHorizontal: wp(5.2),
    },
})
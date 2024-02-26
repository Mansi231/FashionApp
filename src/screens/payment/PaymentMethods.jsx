import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import paypal from '../../assets/payment/paypal.png'
import google from '../../assets/auth/googleLogo.png'
import { FilledButton } from '../../components/InputComp/Button'
import { Routes } from '../../../services/Routes'
import { Header } from '../../components/CommonComp'
import { Colors, Fonts } from '../../../utils'

const PaymentMethods = ({ navigation, route, from }) => {

    const paymentOptions = [
        { image: <Image source={paypal} style={[styles?.imageLogo]} />, name: 'Paypal' },
        { name: 'Apple Pay', icon: <MaterialIcons name={'apple'} size={hp(5)} color={Colors.black} style={{ marginHorizontal: wp(2) }} /> },
        { image: <Image source={google} style={[{ width: hp(3.6), height: hp(3.6), marginLeft: wp(4), marginRight: wp(2.5) }]} />, name: 'Google Pay' },
    ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={[styles?.container]}>
                <StatusBar backgroundColor={Colors.white} />

                {/* header */}
                <Header heading={'Payment Methods'} onPress={() => navigation.goBack()} />
                <Text style={[styles?.heading, { marginTop: hp(4), marginBottom: hp(2), width: '100%' }]}>
                    Credit & Debit Card
                </Text>
                <TouchableOpacity style={[styles?.outlineBtn, styles?.paddingX]} onPress={() => navigation.navigate(Routes.AddCard)}>
                    <Text style={[styles?.text]}>
                        <FontAwesome6 name='credit-card' size={hp(2.2)} color={Colors.primaryBrown} />{' '} Add Card
                    </Text>
                    {from == 'Settings' ?
                        <Text style={[styles?.text, { color: Colors.primaryBrown }]}>Link</Text>
                        : <Feather name='chevron-right' size={hp(2.5)} color={Colors.primaryBrown} />}
                </TouchableOpacity>
                <Text style={[styles?.heading, { marginTop: hp(4), marginBottom: hp(2), width: '100%' }]}>
                    More Payment Options
                </Text>

                {/* Payment Options */}
                <View style={[styles?.optionBox]}>
                    {
                        paymentOptions?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={[styles?.btn, styles.paddingX, { borderBottomColor: Colors.borderGrey, borderBottomWidth: index != paymentOptions?.length - 1 ? hp(.12) : 0 }]}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'flex-start',
                                        alignItems: 'center', gap: wp(1), height: hp(7)
                                    }}>
                                        {item?.image ? item?.image : item?.icon}
                                        <Text style={[styles?.text]}>{item?.name}</Text>
                                    </View>
                                    {from == 'Settings' ?
                                        <Text style={[styles?.text, { color: Colors.primaryBrown }]}>Link</Text>
                                        : <MaterialIcons name={'radio-button-unchecked'} size={hp(3.7)} color={Colors.borderGrey} />}
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
                {from == 'Settings' ? null : <View style={[styles?.cartBtnView, { marginVertical: 0 }]}>
                    <FilledButton
                        text={'Confirm Payment'}
                        btnStyle={{ flex: 1, marginTop: 0, height: hp(5.6), paddingVertical: hp(.2) }} />
                </View>}
            </View>
        </SafeAreaView>
    )
}

export default PaymentMethods

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingBottom: hp(3.3), paddingHorizontal: wp(5.2),
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    header: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        width: '100%', paddingVertical: hp(1), backgroundColor: Colors?.white,
        position: 'relative'
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1), marginTop: hp(1.5)
    },
    heading: {
        color: Colors.black, fontSize: hp(2.4), fontFamily: Fonts?.RobotoMedium,
        textAlign: 'left', width: '100%',
    },
    outlineBtn: {
        borderColor: Colors.borderGrey, borderWidth: hp(.12), height: hp(7.5),
        width: '100%', borderRadius: hp(2), justifyContent: 'space-between', alignItems: 'center',
        flexDirection: 'row'
    },
    text: { color: Colors.grey, fontFamily: Fonts?.RobotoBold, fontSize: hp(2.1) },
    optionBox: {
        borderColor: Colors.borderGrey, borderWidth: hp(.12), width: '100%', borderRadius: hp(2),

    },
    btn: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' },
    imageLogo: { height: '100%', width: wp(15), },
    cartBtnView: {
        paddingVertical: hp(2), borderColor: Colors?.borderGrey, borderWidth: hp(.12),
        borderTopLeftRadius: hp(2), borderTopRightRadius: hp(2), borderBottomWidth: 0,
        bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: Colors?.white,
        marginTop: hp(2), paddingHorizontal: wp(5.2)
    }
})
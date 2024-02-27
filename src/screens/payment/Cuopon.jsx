import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/CommonComp'
import { Colors, Fonts } from '../../../utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'

const Cuopon = () => {

    const [cuoponList, setCuoponList] = useState([
        { heading: 'WELCOME200', des: 'Add items worth $2 more to unlock', offer: 'Get 50% OFF' },
        { heading: 'WELCOME200', des: 'Add items worth $2 more to unlock', offer: 'Get 50% OFF' },
        { heading: 'WELCOME200', des: 'Add items worth $2 more to unlock', offer: 'Get 50% OFF' },
        { heading: 'WELCOME200', des: 'Add items worth $2 more to unlock', offer: 'Get 50% OFF' },
        { heading: 'WELCOME200', des: 'Add items worth $2 more to unlock', offer: 'Get 50% OFF' },
        { heading: 'WELCOME200', des: 'Add items worth $2 more to unlock', offer: 'Get 50% OFF' },
        { heading: 'WELCOME200', des: 'Add items worth $2 more to unlock', offer: 'Get 50% OFF' },
    ])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={[styles?.container]}>
                {/* Header */}
                <Header heading={'Cuopon'} />

                <Text style={[styles?.heading, { marginTop: hp(4), marginBottom: hp(2), width: '100%' }]}>
                    Best offers for you
                </Text>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={[{ flex: 1, width: '100%', marginVertical: hp(1) }]}
                    data={cuoponList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[styles?.cuoponCard]}>
                                <View style={[styles?.leftRound, { zIndex: 1 }]} />
                                <View style={[styles?.rightRound, { zIndex: 1 }]} />
                                <Text style={[styles?.heading, styles.cuoponPaddingX]}>{item?.heading}</Text>
                                <Text style={[styles?.greyText, styles.cuoponPaddingX, { marginVertical: hp(1.5) }]}>{item?.des}</Text>
                                <Text style={[styles?.heading, styles.cuoponPaddingX]}>
                                    <MaterialCommunityIcons name='brightness-percent' size={hp(2.7)} color={Colors.primaryBrown} /> {item?.offer}
                                </Text>
                                <View style={[styles?.copyCodeBox]}>
                                    <Text style={[styles?.copyCodetext]}>Copy Code</Text>
                                </View>
                            </View>
                        )
                    }}
                />


            </View>
        </SafeAreaView>
    )
}

export default Cuopon

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingBottom: hp(3.3), paddingHorizontal: wp(5.2),
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    heading: {
        color: Colors.black, fontSize: hp(2.4), fontFamily: Fonts?.RobotoMedium,
        textAlign: 'left', width: '100%',
    },
    greyText: { color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.RobotoRegular, textAlign: 'left', },
    cuoponCard: {
        borderRadius: hp(3), position: 'relative', paddingTop: hp(2),
        height: hp(23), width: '100%',marginVertical:hp(1.3),
        borderColor: Colors.borderGrey, borderWidth: hp(.12), zIndex: 1,
    },
    cuoponPaddingX: { paddingHorizontal: wp(7), },
    leftRound: {
        position: 'absolute', width: hp(6), height: hp(6), borderRadius: hp(8),
        borderColor: Colors.borderGrey, borderWidth: hp(.12), top: hp(26),
        left: Platform?.OS == 'ios' ? -hp(3.2) : -hp(3), backgroundColor: Colors.white,
        borderLeftWidth: 0, borderTopWidth: 0,
        transform: [
            // { translateX: 50 },
            { translateY: -hp(20) },
            { rotate: Platform?.OS == 'ios' ? '-33deg' : '-20deg' },

        ],
    },
    rightRound: {
        position: 'absolute', width: hp(6), height: hp(6), borderRadius: hp(8),
        borderColor: Colors.borderGrey, borderWidth: hp(.12), top: hp(26), right: Platform?.OS == 'ios' ? -hp(3.2) : -hp(3), backgroundColor: Colors.white,
        borderRightWidth: 0,
        transform: [
            // { translateX: 50 },
            { translateY: -hp(20) },
            { rotate: Platform?.OS == 'ios' ? '-33deg' : '-20deg' },

        ],
    },
    copyCodeBox: {
        flexDirection: 'row', justifyContent: 'center', alignItems: "center", width: '100%',
        flex: 1, marginTop: hp(2),
        backgroundColor: Colors.WhiteSmoke,borderBottomLeftRadius:hp(3),
        borderBottomRightRadius:hp(3)
    },
    copyCodetext: {
        color: Colors.primaryBrown, fontFamily: Fonts.RobotoMedium,
        fontSize: hp(2), textTransform: 'uppercase', letterSpacing: wp(.3)
    },
})
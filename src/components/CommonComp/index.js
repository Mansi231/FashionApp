import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, Fonts } from "../../../utils"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../../pixel"
import React from "react"

const BackArrow = React.memo(({ onPress, hidden, style }) => {
    return (
        hidden ? <TouchableOpacity
            style={[styles?.backBtn, { opacity: 0 }]}
            onPress={onPress}>
            <Ionicons name="arrow-back" color={Colors.black} size={hp(3)} />
        </TouchableOpacity> : <TouchableOpacity
            style={[styles?.backBtn, style]}
            onPress={onPress}>
            <Ionicons name="arrow-back" color={Colors.black} size={hp(3)} />
        </TouchableOpacity>

    )
})

const Header = React.memo(({ heading, onPress, comp, boxStyle }) => {
    return (
        <View style={[styles?.header, styles?.paddingX, boxStyle]}>
            <BackArrow style={[{ marginLeft: 0, backgroundColor: Colors.white, position: 'absolute', left: 0, }]} onPress={onPress} />
            <Text style={styles?.headerText}>{heading}</Text>
            {/* <View /> */}
            {comp ? comp() : null}
        </View>
    )
})


export { BackArrow, Header }

const styles = StyleSheet.create({
    paddingX: { paddingHorizontal: wp(5.2), },
    backBtn: {
        alignSelf: 'flex-start', marginLeft: -hp(1.5), marginTop: hp(1.5), borderColor: Colors?.borderGrey,
        borderRadius: hp(8), borderWidth: hp(.1), height: hp(6), width: hp(6), alignItems: 'center',
        justifyContent: 'center', flexDirection: 'row',
    },
    backImage: {
        height: hp(4),
        width: hp(4),
        resizeMode: 'contain',
        tintColor: Colors.black,
    },
    header: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        width: '100%', paddingVertical: hp(1), backgroundColor: Colors?.white,
        position: 'relative'
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1), marginTop: hp(2)
    },
    heading: {
        color: Colors.black, fontSize: hp(2.4), fontFamily: Fonts?.RobotoMedium,
        textAlign: 'left', width: '100%',
    },
})


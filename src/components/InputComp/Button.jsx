import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'

const FilledButton = React.memo(({loading, text, onPress, btnStyle, textStyle }) => {
    return (
        <TouchableOpacity disabled={loading || false} style={[styles?.filledBtn, btnStyle,loading && {backgroundColor:Colors.Timberwolf}]} onPress={onPress}>
            {loading && <ActivityIndicator color={Colors.white} />}
            <Text style={[styles?.btnText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
})

const OutLinedButton = React.memo(({ onPress, style, textStyle, text }) => {
    return (
        <TouchableOpacity style={[styles?.outlinedBtn, style]} onPress={onPress}>
            <Text style={[styles?.btnText, styles?.filledText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
})

export { FilledButton, OutLinedButton }

const styles = StyleSheet.create({
    filledBtn: {
        width: '100%', alignItems: 'center',
        paddingVertical: hp(1.75), backgroundColor: Colors.primaryBrown, borderRadius: hp(8), paddingHorizontal: wp(2.6),
        justifyContent: 'center', height: hp(6.8), marginTop: hp(2.5),flexDirection:'row',gap:wp(3.5)
    },
    btnText: {
        // fontFamily: Fonts.FONTS.PoppinsMedium, 
        color: Colors.white, fontSize: hp(2.3),
        textAlignVertical: 'center'
    },
    outlinedText: { color: Colors.white },
    filledText: { color: Colors.primaryBrown },
    outlinedBtn: {
        width: '100%', height: hp(7.5), alignItems: 'center',
        paddingVertical: hp(1.75), borderRadius: hp(8), paddingHorizontal: wp(2.6),
        justifyContent: 'center', marginTop: hp(2), borderColor: Colors.primaryBrown, borderWidth: hp(.2), marginBottom: hp(3)
    },
})
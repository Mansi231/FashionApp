import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { BackArrow } from '../../components/CommonComp'
import { Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TextInput from '../../components/InputComp/TextInputCommon'
import { FilledButton } from '../../components/InputComp/Button'

const LeaveReview = ({ navigation, route }) => {

    let { params: { item } } = route;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.container]}>
                <StatusBar backgroundColor={Colors.white} />

                {/* header */}
                <View style={[styles?.header, styles?.paddingX]}>
                    <BackArrow style={{ marginLeft: 0, backgroundColor: Colors.white, position: 'absolute', left: 0, }} onPress={() => navigation.goBack()} />
                    <Text style={styles?.headerText}>Leave Review</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                    style={{ width: '100%' }}
                >
                    <View style={[styles?.itemView, { justifyContent: 'flex-start', gap: wp(2) }]}>
                        <Image source={item?.image} style={[styles?.itemImage]} />
                        <View style={[styles?.itemInfo]}>
                            <Text style={[styles?.itemName,]}>{item?.name}</Text>
                            <Text style={[styles?.size, { marginVertical: hp(.4), width: wp(50) }]}>size : {item?.size} | Qty : {item?.qty}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp(.5) }}>
                                <Text style={[styles?.itemName]}>${item?.price}</Text>
                                <TouchableOpacity style={[styles?.btnView]}>
                                    <Text style={[styles?.btnText]}>Re-Order</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={[styles?.headingBox]}>
                        <Text style={[styles?.heading]}>How is your order?</Text>
                    </View>
                    <View style={[styles?.headingBox, { height: hp(18), gap: hp(2) }]}>
                        <Text style={[styles?.overAllRating]}>Your overall rating</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: wp(2) }}>
                            {
                                Array.from({ length: 5 }, (value, index) => index).map((item, index) => {
                                    return <AntDesign name='star' color={Colors?.yellow} size={hp(5)} key={index}/>
                                })
                            }
                        </View>
                    </View>

                    <Text style={[styles?.itemName, { marginTop: hp(2) }]}>Add detailed review</Text>
                    <View style={{ height: hp(16), width: '100%', marginVertical: hp(2) }}>
                        <TextInput style={{ height: '100%', borderRadius: hp(2) }}
                            placeholder={'Enter here'} textAlignVertical={'top'}
                            keyboardType={'default'}
                        />
                    </View>

                    <TouchableOpacity style={[styles?.addPhotoBox]} activeOpacity={.7}>
                        <Ionicons name='camera-outline' color={Colors.primaryBrown} size={hp(3.5)} />
                        <Text style={[styles?.addPhotoText,]}>add photo</Text>
                    </TouchableOpacity>
                </ScrollView>

                <View style={[styles?.bottomBtn, styles.paddingX]}>
                    <FilledButton btnStyle={{ marginTop: 0, width: '48%', height: hp(6), backgroundColor: Colors?.AntiFlashWhite }} text={'Cancel'} textStyle={{ color: Colors.primaryBrown }} />
                    <FilledButton btnStyle={{ marginTop: 0, width: '48%', height: hp(6) }} text={'Submit'} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LeaveReview

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingHorizontal: wp(5.2),
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    header: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        width: '100%', paddingVertical: hp(2.3), backgroundColor: Colors?.white,
        position: 'relative'
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1), marginTop: hp(1)
    },
    itemView: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderBottomColor: Colors?.borderGrey, borderBottomWidth: hp(.12),
        paddingVertical: hp(2.5), marginTop: hp(1.5), width: '100%'
    },
    itemImage: { width: hp(13), height: hp(13), borderRadius: hp(1) },
    itemInfo: {
        flex: .6
    },
    itemName: {
        color: Colors?.black, fontSize: hp(2), fontFamily: Fonts?.RobotoMedium, textAlign: 'left', width: '100%'
    },
    size: { color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.RobotoRegular, textAlign: 'left', width: '100%' },
    btnView: {
        backgroundColor: Colors.primaryBrown, borderRadius: hp(8), paddingHorizontal: wp(3),
        justifyContent: 'center', paddingVertical: hp(1)
    },
    btnText: {
        // fontFamily: Fonts.FONTS.PoppinsMedium, 
        color: Colors.white, fontSize: hp(1.9),
        textAlignVertical: 'center'
    },
    headingBox: {
        height: hp(13), width: '100%', borderBottomColor: Colors?.borderGrey,
        borderBottomWidth: hp(.12), justifyContent: 'center', alignItems: 'center'
    },
    heading: {
        color: Colors.black, fontSize: hp(3), fontFamily: Fonts?.RobotoMedium
    },
    overAllRating: {
        color: Colors?.lightGrey, fontFamily: Fonts.RobotoRegular, fontSize: hp(2.1)
    },
    addPhotoBox: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
    addPhotoText: {
        color: Colors.primaryBrown, fontSize: hp(2.1),
        fontFamily: Fonts.RobotoRegular, paddingHorizontal: wp(2)
    },
    bottomBtn: {
        paddingVertical: hp(2), borderColor: Colors?.borderGrey, borderWidth: hp(.12),
        borderTopLeftRadius: hp(2), borderTopRightRadius: hp(2), borderBottomWidth: 0,
        bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: Colors?.white,
        justifyContent: 'space-between', alignItems: 'center',
        flexDirection: 'row',
    },
    
})
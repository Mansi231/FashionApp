import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackArrow } from '../../components/CommonComp'
import { Colors, Fonts } from '../../../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const TrackOrder = ({ navigation, route }) => {

    let { params: { item } } = route;
    const [orderRoute,setOrderRoute] = useState([
        {status:'Order Placed',date:'23 Aug 2023, 04:25 PM',icon:<MaterialCommunityIcons name='clipboard-text-outline' size={hp(3)} color={Colors.primaryBrown}/>},
        {status:'In Progress',date:'23 Aug 2023, 03:54 PM',icon:<MaterialCommunityIcons name='package-variant-closed' size={hp(3)} color={Colors.primaryBrown}/>},
        {status:'Shipped',date:'Expected 02 Sep 2023',icon:<MaterialCommunityIcons name='truck-outline' size={hp(3)} color={Colors.primaryBrown}/>},
        {status:'Delivered',date:'23 Aug 2023, 04:25 PM',icon:<Ionicons name='checkmark-done-circle-outline' size={hp(3)} color={Colors.primaryBrown}/>},
    ])
    let completedStep = 2

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles?.container}>
                <StatusBar backgroundColor={Colors.white} />

                {/* header */}
                <View style={[styles?.header, styles?.paddingX]}>
                    <BackArrow style={{ marginLeft: 0, backgroundColor: Colors.white, position: 'absolute', left: 0, top: 0 }} onPress={() => navigation.goBack()} />
                    <Text style={styles?.headerText}>Track Order</Text>
                    <View />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                    style={{ width: '100%' }}
                >

                    {/* order item */}
                    <View style={[styles?.itemView, { justifyContent: 'flex-start', gap: wp(2) }]}>
                        <Image source={item?.image} style={[styles?.itemImage]} />
                        <View style={[styles?.itemInfo]}>
                            <Text style={[styles?.itemName,]}>{item?.name}</Text>
                            <Text style={[styles?.size, { marginVertical: hp(.4), width: wp(50) }]}>Size : {item?.size} | Qty : {item?.qty}</Text>
                            <Text style={[styles?.itemName]}>${item?.price}</Text>
                        </View>
                    </View>

                    {/* order detail */}
                    <View style={[styles?.headingBox]}>
                        <Text style={[styles?.heading]}>Order Details</Text>
                        <View style={[styles?.orderDetailBox]}>
                            <Text style={[styles?.headerText, { marginTop: 0, color: Colors.grey }]}>Expected Delivery Date</Text>
                            <Text style={[styles?.headerText, { marginTop: 0 }]}>03 Sep 2023</Text>
                        </View>
                        <View style={[styles?.orderDetailBox]}>
                            <Text style={[styles?.headerText, { marginTop: 0, color: Colors.grey }]}>Tracking ID</Text>
                            <Text style={[styles?.headerText, { marginTop: 0 }]}>TRK452126542</Text>
                        </View>
                    </View>

                    <Text style={[styles?.heading, { marginVertical: hp(3) }]}>Order Status</Text>

                    {/* stepper - order detail */}
                    {
                        orderRoute.map((item, index) => {
                            return (
                                <View key={index} style={{ flex: 1,position: 'relative', flexDirection: 'row', gap: wp(4),}}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                                        <View style={[styles?.trackRound,{
                                            backgroundColor:index+1 <= completedStep ? Colors?.primaryBrown :Colors.borderGrey
                                        }]} >
                                            <FontAwesome6 name='check' color={Colors.white} size={hp(1.7)} />
                                        </View>
                                        {index !== 3 && <View style={[styles?.trackLine,{
                                            backgroundColor:index+1 < completedStep ? Colors?.primaryBrown :Colors.borderGrey
                                        }]} />}
                                    </View>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',
                                        flex: 1, position: 'absolute', top: -hp(.7),left: hp(5), width: wp(78)
                                    }}>
                                        <View style={{gap:hp(.5)}}>
                                            <Text style={[styles?.itemName]}>{item.status}</Text>
                                            <Text style={[styles?.size]}>{item.date}</Text>
                                        </View>
                                        {item?.icon}
                                    </View>
                                </View>
                            )
                        })
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default TrackOrder

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingHorizontal: wp(5.2),
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    header: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        width: '100%', paddingVertical: hp(1), backgroundColor: Colors?.white,
        position: 'relative', height: hp(7.5)
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1), marginTop: hp(1.5)
    },
    itemView: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderBottomColor: Colors?.borderGrey, borderBottomWidth: hp(.12),
        paddingVertical: hp(2.5), marginTop: hp(1.5), width: '100%'
    },
    itemImage: { width: hp(13), height: hp(13), borderRadius: hp(1) },
    itemInfo: {
        flex: 1, gap: hp(.8)
    },
    itemName: {
        color: Colors?.black, fontSize: hp(2), fontFamily: Fonts?.RobotoMedium, textAlign: 'left', width: '100%'
    },
    size: { color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.RobotoRegular, textAlign: 'left', width: '100%' },
    headingBox: {
        height: hp(16.5), width: '100%', borderBottomColor: Colors?.borderGrey,
        borderBottomWidth: hp(.12), justifyContent: 'center', alignItems: 'center'
    },
    heading: {
        color: Colors.black, fontSize: hp(2.3), fontFamily: Fonts?.RobotoMedium,
        textAlign: 'left', width: '100%'
    },
    orderDetailBox: {
        flexDirection: 'row', justifyContent: "space-between",
        alignItems: 'center', width: '100%', marginTop: hp(1)
    },
    trackRound: {
        height: hp(3.5), width: hp(3.5), borderRadius: hp(8),
        backgroundColor: Colors.primaryBrown, justifyContent: 'center', alignItems: 'center'
    },
    trackLine: {
        height: hp(8), width: wp(1.3), backgroundColor: Colors.primaryBrown,
    },
})
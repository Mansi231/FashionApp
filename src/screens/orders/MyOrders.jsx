import { Animated, FlatList, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { Colors, Fonts } from '../../../utils'
import { BackArrow } from '../../components/CommonComp'
import item1 from '../../assets/home/item1.png'
import item2 from '../../assets/home/item2.png'
import item3 from '../../assets/home/item3.png'
import item4 from '../../assets/home/item4.png'
import { FilledButton } from '../../components/InputComp/Button'
import { Routes } from '../../../services/Routes'

const MyOrders = ({ navigation, route }) => {

    const [orderTypes, setOrderTypes] = useState([
        { type: 'Active', selected: true },
        { type: 'Completed', selected: false },
        { type: 'Cancelled', selected: false },
    ]);
    const [orders, setOrders] = useState([
        { image: item1, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9', size: 'XL', qty: '10pcs' },
        { image: item1, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9', size: 'M', qty: '10pcs' },
        { image: item2, liked: false, price: 120.00, name: 'Brown Suit', rating: '5.0', size: 'S', qty: '10pcs' },
        { image: item2, liked: false, price: 120.00, name: 'Brown Suit', rating: '5.0', size: 'L', qty: '10pcs' },
        { image: item3, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9', size: 'XL', qty: '10pcs' },
        { image: item3, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9', size: 'M', qty: '10pcs' },
        { image: item4, liked: false, price: 120.00, name: 'Yellow Shirt', rating: '5.0', size: 'XXL', qty: '10pcs' },
        { image: item4, liked: false, price: 120.00, name: 'Yellow Shirt', rating: '4.0', size: 'S', qty: '10pcs' },
    ])
    const [selectedType, setSelectedType] = useState(orderTypes[0])

    const [slideAnim] = useState(new Animated.Value(0));

    const selectOrderType = (index, item) => {
        const updatedOrderTypes = [...orderTypes];

        // Toggle the selected state for the pressed item
        updatedOrderTypes[index].selected = true;

        // Deselect all other items
        for (let i = 0; i < updatedOrderTypes.length; i++) {
            if (i !== index) {
                updatedOrderTypes[i].selected = false;
            }
        }

        setOrderTypes(updatedOrderTypes);
        setSelectedType(item);

        slideOrderAnim(index * wp(31.5))
        // Animate the slide

    }

    const slideOrderAnim = (slideVal) => {
        Animated.timing(slideAnim, {
            toValue: slideVal,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    const handleNavigation = (item) =>{

        let route = selectedType?.type == orderTypes[0]?.type ? Routes.TrackOrder : selectedType?.type == orderTypes[0]?.type ? Routes.LeaveReview : Routes.LeaveReview
        navigation.navigate(route, { item })
    }

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:Colors.white }}>
            <View style={styles?.container}>
                <StatusBar backgroundColor={Colors.white} />

                {/* header */}
                <View style={[styles.paddingX, { width: '100%' }]}>
                    <View style={[styles?.header, styles?.paddingX]}>
                        <BackArrow style={{ marginLeft: 0, backgroundColor: Colors.white, position: 'absolute', left: 0, }} onPress={() => navigation.goBack()} />
                        <Text style={styles?.headerText}>My Orders</Text>
                        <View />
                    </View>
                </View>

                {/* order type */}
                <View style={[{
                    width: '100%', borderBottomColor: Colors.borderGrey,
                    borderBottomWidth: hp(.12), paddingHorizontal: wp(2)
                }]}>
                    <View style={[styles?.types]}>
                        {
                            orderTypes.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={[styles?.typeBox]}
                                        key={index} onPress={() => selectOrderType(index, item)}
                                    >
                                        <Text style={[styles?.headerText, { color: item?.selected ? Colors?.primaryBrown : Colors?.grey }]}>{item.type}</Text>
                                        {/* {item?.selected && <View style={styles?.selectedTypeBorder} />} */}
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={{ paddingHorizontal: wp(3.1) }}>
                        <Animated.View style={[styles?.selectedTypeBorder, {
                            position: 'relative',
                            left: slideAnim,
                        }]} />
                    </View>
                </View>

                {/* items */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={[{ flex: 1, width: '100%', marginVertical: hp(1) }, styles?.paddingX]}
                    data={orders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[styles?.itemView,index == orders.length - 1 && {borderBottomWidth:0}]}>
                                <View style={[styles?.itemView, { justifyContent: 'flex-start', borderBottomWidth: 0, gap: wp(2) }]}>
                                    <Image source={item?.image} style={[styles?.itemImage]} />
                                    <View style={[styles?.itemInfo,{
                                        flex: Platform?.OS == 'android' ? selectedType?.type ==  orderTypes[1]?.type ? .72 : .76 :Platform?.OS == 'ios' && .73,
                                    }]}>
                                        <Text style={[styles?.itemName,]}>{item?.name}</Text>
                                        <Text style={[styles?.size, {width:wp(60), marginVertical: hp(.4) }]}>size : {item?.size} | Qty : {item?.qty}</Text>
                                        <View style={{marginTop:hp(1), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={[styles?.itemName]}>${item?.price}</Text>
                                            <TouchableOpacity style={[styles?.btnView]}
                                                // onPress={() => navigation.navigate(Routes.LeaveReview, { item })}
                                                onPress={() => handleNavigation(item)}
                                            >
                                                <Text style={[styles?.btnText]}>{
                                                    selectedType?.type == orderTypes[0]?.type ? 'Track Order' : 
                                                    selectedType?.type == orderTypes[1]?.type ? 'Leave Review' : 'Re-Order'
                                                }</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default MyOrders

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white,paddingBottom:hp(3.3)
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
    types: {
        flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
        width: '100%',
        // borderBottomColor: Colors.borderGrey,
        paddingTop: hp(2),
        // borderBottomWidth: hp(.12)
    },
    typeBox: {
        flexDirection: 'column', justifyContent: 'space-between',
        alignItems: 'center', height: hp(5.6), width: '30%',
    },
    selectedTypeBorder: {
        height: hp(.6), backgroundColor: Colors.primaryBrown,
        borderTopLeftRadius: hp(1), borderTopRightRadius: hp(1), width: '30%'
    },
    itemView: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderBottomColor: Colors?.borderGrey, borderBottomWidth: hp(.12),
        paddingVertical: hp(1)
    },
    itemImage: { width: hp(13), height: hp(13), borderRadius: hp(1) },
    itemInfo: {
        // flex: Platform?.OS == 'android' ? .76 : .74,
        flex: Platform?.OS == 'android' ? .72 : .74,
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
})
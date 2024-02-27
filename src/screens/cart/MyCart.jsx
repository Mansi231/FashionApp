import { FlatList, Image, Modal, Platform, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { BackArrow, Header } from '../../components/CommonComp'
import item1 from '../../assets/home/item1.png'
import item2 from '../../assets/home/item2.png'
import item3 from '../../assets/home/item3.png'
import item4 from '../../assets/home/item4.png'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'
import { FilledButton } from '../../components/InputComp/Button'
import Svg, { Line } from 'react-native-svg';

const MyCart = ({navigation}) => {

    const [cartList, setCartList] = useState([
        { image: item1, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9', size: 'XL' },
        { image: item1, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9', size: 'M' },
        { image: item2, liked: false, price: 120.00, name: 'Brown Suit', rating: '5.0', size: 'S' },
        { image: item2, liked: false, price: 120.00, name: 'Brown Suit', rating: '5.0', size: 'L' },
        { image: item3, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9', size: 'XL' },
        { image: item3, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9', size: 'M' },
        { image: item4, liked: false, price: 120.00, name: 'Yellow Shirt', rating: '5.0', size: 'XXL' },
        { image: item4, liked: false, price: 120.00, name: 'Yellow Shirt', rating: '4.0', size: 'S' },
    ])
    const [removeCartVisible, setRemoveCartVisible] = useState(false);
    const [checkoutVisible, setCheckoutVisible] = useState(false);

    const DeleteItem = (item) => {
        return <View style={[styles?.deleteView]}>
            <MaterialIcons name='delete-sweep' size={hp(3.5)} color={Colors?.ImperialRed}
                onPress={() => setRemoveCartVisible(true)}
            />
        </View>
    }

    return (
        <GestureHandlerRootView style={{ flex: 1,backgroundColor: Colors?.white ,paddingBottom:Platform?.OS == 'ios' ? hp(2) : hp(5) }}>
            <SafeAreaView style={{ flex: 1  }}>

                <View style={[styles?.container]}>
                    <StatusBar backgroundColor={Colors.white} />

                    {/* header */}
                    <Header heading={'My Cart'} boxStyle={[{ paddingBottom: hp(2.7), }]} onPress={() => navigation.goBack()} />

                    {/* Cart Items */}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={[{ flex: 1, width: '100%', marginVertical: hp(1) },]}
                        data={cartList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <Swipeable renderRightActions={() => DeleteItem(item)}>
                                    <View style={[styles?.itemView]}>
                                        <View style={[styles?.itemView, { justifyContent: 'flex-start', borderBottomWidth: 0 }]}>
                                            <Image source={item?.image} style={[styles?.itemImage]} />
                                            <View style={[styles?.itemInfo]}>
                                                <Text style={[styles?.itemName]}>{item?.name}</Text>
                                                <Text style={[styles?.size]}>size : {item?.size}</Text>
                                                <Text style={[styles?.itemName]}>${item?.price}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles?.btnView]}>
                                            <TouchableOpacity style={[styles?.actionBtn, { backgroundColor: Colors?.AntiFlashWhite }]}>
                                                <AntDesign name='minus' color={Colors.black} size={hp(1.8)} />
                                            </TouchableOpacity>
                                            <Text style={[styles?.count]}>1</Text>
                                            <TouchableOpacity style={[styles?.actionBtn]}>
                                                <AntDesign name='plus' color={Colors.white} size={hp(1.8)} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Swipeable>
                            )
                        }}
                    />
                </View>

                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={removeCartVisible}
                    statusBarTranslucent
                    onRequestClose={() => {
                        setRemoveCartVisible(!removeCartVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                // height:'25%',
                                height: '83%',
                            }}
                            activeOpacity={1}
                            onPress={() => {
                                // setReportVisible(false);
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </TouchableOpacity>
                        <View style={[styles?.removeCartView, styles?.paddingX]}>
                            <View style={[styles?.removeCartHeadingView]}>
                                <Text style={[styles?.removeCartHeading]}>Remove from Cart ?</Text>
                            </View>
                            <View style={[styles?.itemView, { paddingRight: 0, borderBottomWidth: 0 }]}>
                                <View style={[styles?.itemView, { justifyContent: 'flex-start', borderBottomWidth: 0 }]}>
                                    <Image source={item1} style={[styles?.itemImage]} />
                                    <View style={[styles?.itemInfo]}>
                                        <Text style={[styles?.itemName]}>{cartList[0]?.name}</Text>
                                        <Text style={[styles?.size]}>size : {cartList[0]?.size}</Text>
                                        <Text style={[styles?.itemName]}>${cartList[0]?.price}</Text>
                                    </View>
                                </View>
                                <View style={[styles?.btnView]}>
                                    <TouchableOpacity style={[styles?.actionBtn, { backgroundColor: Colors?.AntiFlashWhite }]}>
                                        <AntDesign name='minus' color={Colors.black} size={hp(1.8)} />
                                    </TouchableOpacity>
                                    <Text style={[styles?.count]}>1</Text>
                                    <TouchableOpacity style={[styles?.actionBtn]}>
                                        <AntDesign name='plus' color={Colors.white} size={hp(1.8)} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles?.header]}>
                                <FilledButton text={'Cancel'}
                                    onPress={() => setRemoveCartVisible(false)}
                                    btnStyle={{ width: '49%', height: hp(6), paddingVertical: hp(.2) }} />
                                <FilledButton text={'Yes, Remove'}
                                    onPress={() => setRemoveCartVisible(false)}
                                    btnStyle={{ width: '49%', height: hp(6), paddingVertical: hp(.2) }} />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={checkoutVisible}
                    statusBarTranslucent
                    onRequestClose={() => {
                        setCheckoutVisible(!checkoutVisible);
                    }}>
                    <View style={[styles.centeredView, { backgroundColor: 'transparent' }]}>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                // height:'25%',
                                height: '83%',
                            }}
                            activeOpacity={1}
                            onPress={() => {
                                // setReportVisible(false);
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </TouchableOpacity>
                        <View style={[styles?.removeCartView, styles?.paddingX, { height: '73%' }]}>
                            <View style={[styles?.promocodeBox]}>
                                <Text style={[{
                                    color: Colors.grey,
                                    fontSize: hp(2.1), fontFamily: Fonts?.RobotoMedium
                                }]}>Promo Code</Text>
                                <TouchableOpacity style={[styles?.promoBtn]}>
                                    <Text style={[styles?.promoBtnText]}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles?.itemInfo, { width: '100%', gap: 0 }]}>
                                <View style={[styles?.header]}>
                                    <Text style={[styles?.size, { width: 'auto' }]}>Sub-Total</Text>
                                    <Text style={[styles?.itemName, { width: 'auto' }]}>$407.94</Text>
                                </View>
                                <View style={[styles?.header]}>
                                    <Text style={[styles?.size, { width: 'auto' }]}>Delivery Fee</Text>
                                    <Text style={[styles?.itemName, { width: 'auto' }]}>$25.00</Text>
                                </View>
                                <View style={[styles?.header]}>
                                    <Text style={[styles?.size, { width: 'auto' }]}>Discount</Text>
                                    <Text style={[styles?.itemName, { width: 'auto' }]}>-$35.00</Text>
                                </View>
                                <Svg height="1" width="100%" >
                                    <Line
                                        x1="0"
                                        y1="0"
                                        x2="100%"
                                        y2="0"
                                        stroke={Colors.borderGrey} // Color of the dashed line
                                        strokeWidth="1"
                                        strokeDasharray="14,8"  // Adjust this to change the dash pattern
                                    />
                                </Svg>
                                <View style={[styles?.header]}>
                                    <Text style={[styles?.size, { width: 'auto' }]}>Total Cost</Text>
                                    <Text style={[styles?.itemName, { width: 'auto' }]}>$397.94</Text>
                                </View>
                            </View>
                            <View style={[styles?.header]}>
                                <FilledButton text={'Proceed to Checkout'}
                                    onPress={() => setRemoveCartVisible(false)}
                                    btnStyle={{ height: hp(6.5), paddingVertical: hp(.2), marginTop: hp(0.1) }} />
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </GestureHandlerRootView>

    )
}

export default MyCart

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        paddingHorizontal: wp(5.2), backgroundColor: Colors.white
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        width: '100%', paddingVertical: hp(1), backgroundColor: Colors?.white
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1), marginTop: hp(1.5)
    },
    itemView: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        height: hp(17), gap: wp(3), paddingRight: wp(3),
        borderBottomColor: Colors?.borderGrey, borderBottomWidth: hp(.1), paddingVertical: hp(2)
    },
    itemImage: { width: hp(13), height: '100%', borderRadius: hp(1) },
    itemInfo: {
        flexDirection: 'column', gap: hp(1), justifyContent: 'flex-start',
        alignItems: 'center'
    },
    itemName: {
        color: Colors?.black, fontSize: hp(2), fontFamily: Fonts?.RobotoMedium, textAlign: 'left', width: '100%'
    },
    size: { color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.RobotoRegular, textAlign: 'left', width: '100%' },
    btnView: {
        flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'flex-end',
        gap: wp(3)
    },
    actionBtn: { padding: hp(.8), backgroundColor: Colors?.primaryBrown, borderRadius: hp(.8) },
    count: { color: Colors.black, fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1) },
    deleteView: {
        height: hp(17), backgroundColor: Colors?.PalePink, marginVertical: hp(2),
        justifyContent: 'center', alignItems: 'center', paddingHorizontal: wp(6)
    },
    centeredView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    removeCartView: {
        flexDirection: 'column', gap: hp(1), justifyContent: 'flex-start',
        alignItems: 'center', backgroundColor: Colors.white, width: '100%', height: '65%',
        borderTopLeftRadius: hp(4), borderTopRightRadius: hp(4)
    },
    removeCartHeadingView: {
        width: '100%',
        paddingVertical: hp(3), borderBottomColor: Colors.borderGrey, borderBottomWidth: hp(.12),

    },
    removeCartHeading: {
        textAlign: 'center',
        color: Colors.black, fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1),
    },
    promocodeBox: {
        width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: hp(8),
        borderColor: Colors.borderGrey, borderWidth: hp(.12), height: hp(6), marginVertical: hp(3),
        paddingVertical: hp(.4), paddingLeft: wp(4), paddingRight: wp(1)
    },
    promoBtn: {
        height: '100%', justifyContent: 'center',
        alignItems: 'center', backgroundColor: Colors?.primaryBrown, borderRadius: hp(8),
        paddingHorizontal: wp(5)
    },
    promoBtnText: { fontSize: hp(1.9), fontFamily: Fonts?.RobotoMedium, color: Colors.white },
})
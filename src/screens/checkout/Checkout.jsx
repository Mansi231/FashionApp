import { Animated, FlatList, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { BackArrow } from '../../components/CommonComp'
import { FilledButton, OutLinedButton } from '../../components/InputComp/Button'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import item1 from '../../assets/home/item1.png'
import item2 from '../../assets/home/item2.png'
import item3 from '../../assets/home/item3.png'
import item4 from '../../assets/home/item4.png'
import  styles  from './styles'

const Checkout = ({ navigation, route }) => {
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

    let options = { address: 'address', type: 'type' }
    const [shippingOption, setShippingOption] = useState('address');
    const opacity = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500, // Adjust the duration as needed
            useNativeDriver: true, // Enable native driver for better performance
        }).start();
    }, [shippingOption]);

    const toggleOption = (option) => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 500, // Adjust the duration as needed
            useNativeDriver: true, // Enable native driver for better performance
        }).start(() => {
            setShippingOption(option);
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500, // Adjust the duration as needed
                useNativeDriver: true, // Enable native driver for better performance
            }).start();
        });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={[styles?.container]}>
                <StatusBar backgroundColor={Colors.white} />

                {/* header */}
                <View style={[styles?.header, styles?.paddingX]}>
                    <BackArrow style={{ marginLeft: 0, backgroundColor: Colors.white, position: 'absolute', left: 0, }} onPress={() => navigation.goBack()} />
                    <Text style={styles?.headerText}>Checkout</Text>
                    <View />
                </View>

                {/* Shipping Address*/}
                <Text style={[styles?.heading, { marginTop: hp(4), marginBottom: hp(2), width: '100%' }]}>Shipping Address</Text>
                <View style={[styles?.addressBox]}>
                    <View>
                        <SimpleLineIcons name='location-pin' size={hp(3)} color={Colors.black} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', gap: wp(3), justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={[{ flex: .7 }]}>
                            <Text style={[styles?.heading, { fontSize: hp(2.2) }]}>Home</Text>
                            <Text style={[styles?.greyText]}>1901 Thornridge Cir. Shiloh , Hawaii 81063 </Text>
                        </View>
                        <View style={{ flex: .3 }}>
                            <OutLinedButton text={'CHANGE'} style={{
                                height: hp(4), paddingVertical: hp(.1), borderColor: Colors.borderGrey, marginTop: 0,
                                marginBottom: 0
                            }}
                                textStyle={{ fontSize: hp(1.9), fontFamily: Fonts?.RobotoMedium }}
                                onPress={() => toggleOption(options?.address)}
                            />
                        </View>
                    </View>
                </View>

                {/* Shipping Type */}
                <Text style={[styles?.heading, { marginTop: hp(4), marginBottom: hp(2), width: '100%' }]}>Choose Shipping Type</Text>
                <View style={[styles?.addressBox]}>
                    <View>
                        <MaterialCommunityIcons name='package-variant-closed' size={hp(3)} color={Colors.black} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', gap: wp(3), justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={[{ flex: .7 }]}>
                            <Text style={[styles?.heading, { fontSize: hp(2.2) }]}>Economy</Text>
                            <Text style={[styles?.greyText]}>Estimated Arrival 25 August 2023</Text>
                        </View>
                        <View style={{ flex: .3 }}>
                            <OutLinedButton text={'CHANGE'} style={{
                                height: hp(4), paddingVertical: hp(.1), borderColor: Colors.borderGrey, marginTop: 0,
                                marginBottom: 0
                            }}
                                textStyle={{ fontSize: hp(1.9), fontFamily: Fonts?.RobotoMedium }}
                                onPress={() => toggleOption(options?.type)}
                            />
                        </View>
                    </View>
                </View>

                {/* Order List */}
                <Text style={[styles?.heading, { marginTop: hp(4), marginBottom: hp(2), width: '100%' }]}>Order List</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={[{ flex: 1, width: '100%', marginBottom: hp(1) }]}
                    data={orders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[styles?.itemView, index == orders.length - 1 && { borderBottomWidth: 0 }]}>
                                <View style={[styles?.itemView, { justifyContent: 'flex-start', borderBottomWidth: 0, gap: wp(2) }]}>
                                    <Image source={item?.image} style={[styles?.itemImage]} />
                                    <View style={[styles?.itemInfo]}>
                                        <Text style={[styles?.itemName,]}>{item?.name}</Text>
                                        <Text style={[styles?.size, { width: wp(60), marginVertical: hp(.4) }]}>size : {item?.size} | Qty : {item?.qty}</Text>
                                        <Text style={[styles?.itemName]}>${item?.price}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />

                <View style={[styles?.cartBtnView, { marginVertical: 0 }]}>
                    <FilledButton
                        text={'Continue to Payment'}
                        btnStyle={{ flex: 1, marginTop: 0, height: hp(5.6), paddingVertical: hp(.2) }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Checkout

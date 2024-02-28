import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import React, { useRef, useEffect, useState, useContext, useCallback } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../splashscreen/SplashScreen';
import { Routes } from '../../services/Routes';
import GetStarted from '../auth/GetStarted';
import VerifyCode from '../auth/VerifyCode';
import Location from '../screens/location/Location';
import ManualLocation from '../screens/location/ManualLocation';
import { Colors } from '../../utils';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel';
import Home from '../screens/home/Home';
import Likes from '../screens/likes/Likes';
import Message from '../screens/message/Message';
import styles from './style';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/profile/Profile';
import ProductDetail from '../screens/productDetail/ProductDetail';
import MyCart from '../screens/cart/MyCart';
import MyOrders from '../screens/orders/MyOrders';
import LeaveReview from '../screens/review/LeaveReview';
import TrackOrder from '../screens/orders/TrackOrder';
import Checkout from '../screens/checkout/Checkout';
import ShippingAddress from '../screens/checkout/ShippingAddress';
import ShippingType from '../screens/checkout/ShippingType';
import PaymentMethods from '../screens/payment/PaymentMethods';
import AddCard from '../screens/payment/AddCard';
import PaymentSuccess from '../screens/payment/PaymentSuccess';
import Cuopon from '../screens/payment/Cuopon';
import Notification from '../screens/notification/Notification';
import Filter from '../screens/filter/Filter';
import Policy from '../screens/profile/Policy';
import PasswordManager from '../auth/PasswordManager';
import Search from '../screens/serach/Search';
import Auth from '../auth/Auth';
import AllCategory from '../screens/category/AllCategory';
import CategoryProducts from '../screens/category/CategoryProducts';
import EditProfile from '../screens/profile/EditProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Tab.Navigator
                initialRouteName="Feed"
                screenOptions={{
                    headerShown: false, tabBarStyle: styles?.tabBarStyle, tabBarActiveTintColor: Colors.black,
                    // tabBarHideOnKeyboard:true
                }}
            >
                <Tab.Screen
                    name={Routes.Home}
                    component={Home}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={[[styles?.bottomIconBtn, focused && styles?.bgWhite]]}>
                                    <FontAwesome6 name='house' color={focused ? Colors?.primaryBrown : Colors.white} size={hp(2.9)} />
                                </View>
                            )
                        },
                    }}
                />
                {/* <Tab.Screen
                    name={Routes.Cart}
                    component={MyCart}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={[[styles?.bottomIconBtn, focused && styles?.bgWhite]]}>
                                    <FontAwesome6 name='bag-shopping' color={focused ? Colors?.primaryBrown : Colors.white} size={hp(2.9)} />
                                </View>
                            )
                        },
                    }}
                /> */}
                <Tab.Screen
                    name={Routes.Likes}
                    component={Likes}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={[styles?.bottomIconBtn, focused && styles?.bgWhite]}>
                                    <Octicons name='heart-fill' color={focused ? Colors?.primaryBrown : Colors.white} size={hp(2.9)} />
                                </View>
                            )
                        },
                    }}
                />
                {/* <Tab.Screen
                    name={Routes.Message}
                    component={Message}
                    options={{
                        tabBarShowLabel: false,
                        tabBarStyle: { display: "none" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={[styles?.bottomIconBtn, focused && styles?.bgWhite]} >
                                    <Ionicons name='chatbox-ellipses' color={focused ? Colors?.primaryBrown : Colors.white} size={hp(3.3)} />
                                </View>
                            )

                        },
                    }}
                /> */}
                < Tab.Screen
                    name={Routes.Profile}
                    component={Profile}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={[styles?.bottomIconBtn, focused && styles?.bgWhite]}>
                                    <Ionicons name='person-circle-outline' color={focused ? Colors?.primaryBrown : Colors.white} size={hp(3.4)} />
                                </View>
                            )
                        },
                    }}
                />
            </Tab.Navigator >
        </View>
    )
}

const Navigation = () => {
    const navigationRef = useRef();

    const [screens, setScreens] = useState([
        { name: Routes?.SplashScreen, component: SplashScreen },
        { name: Routes?.GetStarted, component: GetStarted },
        { name: Routes?.BottomTab, component: BottomTab },
        { name: Routes?.Auth, component: Auth },
        { name: Routes?.VerifyCode, component: VerifyCode },
        { name: Routes?.Location, component: Location },
        { name: Routes?.ManualLocation, component: ManualLocation },
        { name: Routes?.ProductDetail, component: ProductDetail },
        { name: Routes?.MyCart, component: MyCart },
        { name: Routes?.LeaveReview, component: LeaveReview },
        { name: Routes?.TrackOrder, component: TrackOrder },
        { name: Routes?.Checkout, component: Checkout },
        { name: Routes?.ShippingType, component: ShippingType },
        { name: Routes?.ShippingAddress, component: ShippingAddress },
        { name: Routes?.PaymentMethods, component: PaymentMethods },
        { name: Routes?.AddCard, component: AddCard },
        { name: Routes?.PaymentSuccess, component: PaymentSuccess },
        { name: Routes?.Cuopon, component: Cuopon },
        { name: Routes?.Notification, component: Notification },
        { name: Routes?.Filter, component: Filter },
        { name: Routes?.Policy, component: Policy },
        { name: Routes?.PasswordManager, component: PasswordManager },
        { name: Routes?.EditProfile, component: EditProfile},
        { name: Routes?.Search, component: Search },
        { name: Routes?.AllCategory, component: AllCategory },
        { name: Routes?.CategoryProducts, component: CategoryProducts },
    ])

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}>
                {
                    screens?.map(({ name, component, options }, index) => {
                        return (
                            <Stack.Screen
                                key={index}
                                name={name}
                                component={component}
                                options={options}
                            />
                        )
                    })
                }


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
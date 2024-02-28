import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Header } from '../../components/CommonComp'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { styles } from './Policy'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { Routes } from '../../../services/Routes'
import { appStyles } from '../../../App'

const Settings = ({ navigation }) => {

    const [options, setOptions] = useState([
        { name: 'Notification Settings', icon: <AntDesign name='user' color={Colors.primaryBrown} size={hp(2.5)} />, onPress: () => navigation.navigate(Routes.Notification) },
        { name: 'Password Manager', icon: <Octicons name='key' color={Colors.primaryBrown} size={hp(2.5)} />, onPress: () => navigation.navigate(Routes.PasswordManager) },
        { name: 'Delete Account', icon: <Octicons name='credit-card' color={Colors.primaryBrown} size={hp(2.5)} />, },
    ])
    return (
        <SafeAreaView style={appStyles.safeAreaView}>
            <View style={[styles?.container]}>
                <Header heading={'Settings'} boxStyle={[{ paddingBottom: hp(2.7), }]} onPress={() => navigation.goBack()} />
                <View style={{ flexDirection: 'column', justifyContent: "flex-start", alignItems: 'center', width: '100%' }}>
                    {
                        options?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={.8}
                                    onPress={item?.onPress}
                                    style={[styles?.optionBtn]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3) }}>
                                        {item?.icon}
                                        <Text style={[styles?.userName, { marginTop: 0, fontFamily: Fonts?.RobotoMedium, }]}>{item?.name}</Text>
                                    </View>
                                    <Octicons name='chevron-right' color={Colors.primaryBrown} size={hp(2.5)} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Settings)
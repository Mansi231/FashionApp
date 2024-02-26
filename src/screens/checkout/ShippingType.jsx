import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { BackArrow } from '../../components/CommonComp'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FilledButton } from '../../components/InputComp/Button'
import styles from './styles'

const ShippingType = ({navigation,route}) => {

    const [typeList, setTypeList] = useState([
        { icon: <Feather name='package' size={hp(3)} color={Colors.black} />, name: 'Economy', des: 'Estimated Arrival 25 August 2023' },
        { icon: <Ionicons name='checkmark-done-circle-outline' size={hp(3)} color={Colors.black} />, name: 'Regular', des: 'Estimated Arrival 24 August 2023' },
        { icon: <FontAwesome6 name='truck' size={hp(3)} color={Colors.black} />, name: 'Cargo', des: 'Estimated Arrival 22 August 2023' },
        { icon: <FontAwesome6 name='truck-fast' size={hp(3)} color={Colors.black} />, name: `Friend's House`, des: 'Estimated Arrival 25 August 2023' },
    ])
    const [selectedType, setSelectedType] = useState(typeList[0])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={[styles?.container]}>

                {/* header */}
                <View style={[styles?.header, styles?.paddingX]}>
                    <BackArrow style={{ marginLeft: 0, backgroundColor: Colors.white, position: 'absolute', left: 0, }} onPress={() => navigation.goBack()} />
                    <Text style={styles?.headerText}>Choose Shipping</Text>
                    <View />
                </View>

                {/* address list */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10) }}
                    style={{ width: '100%' }}
                >
                    {
                        typeList.map((item, index) => {
                            return (
                                <View key={index} style={[styles?.addressBox, { marginTop: hp(4), borderBottomWidth: index != typeList?.length - 1 ? hp(.12) : 0 }]}>
                                    <View>
                                        {item?.icon}
                                        {/* <SimpleLineIcons name='location-pin' size={hp(3)} color={Colors.black} /> */}
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', gap: wp(3), justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={[{ flex: .7 }]}>
                                            <Text style={[styles?.heading, { fontSize: hp(2.2) }]}>{item?.name}</Text>
                                            <Text style={[styles?.greyText]}>{item?.des}</Text>
                                        </View>
                                        <View style={{ flex: .3, alignItems: 'flex-end' }}>
                                            <TouchableOpacity onPress={() => setSelectedType(item)}>
                                                <MaterialIcons name={selectedType?.name == item?.name ? 'radio-button-checked' : 'radio-button-unchecked'} size={hp(3.5)} color={Colors.primaryBrown} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }

                </ScrollView>
                <View style={[styles?.cartBtnView, { marginVertical: 0 }]}>
                    <FilledButton
                        text={'Apply'}
                        btnStyle={{ flex: 1, marginTop: 0, height: hp(5.6), paddingVertical: hp(.2) }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ShippingType


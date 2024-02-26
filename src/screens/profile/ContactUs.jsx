import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Collapsible from 'react-native-collapsible';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel';
import { styles } from './Policy';
import { Colors } from '../../../utils';

const ContactUs = () => {

    const [list, setList] = useState([
        { name: 'Customer Service', icon: <FontAwesome6 name='headset' color={Colors.primaryBrown} size={hp(3)} />, content: '(480) 555-0103' },
        { name: 'WhatsApp', icon: <MaterialCommunityIcons name='whatsapp' color={Colors.primaryBrown} size={hp(4)} />, content: '(480) 555-0103' },
        { name: 'Website', icon: <MaterialCommunityIcons name='web' color={Colors.primaryBrown} size={hp(4)} />, content: '(480) 555-0103' },
        { name: 'Facebook', icon: <MaterialCommunityIcons name='facebook' color={Colors.primaryBrown} size={hp(4)} />, content: '(480) 555-0103' },
        { name: 'Twitter', icon: <MaterialCommunityIcons name='twitter' color={Colors.primaryBrown} size={hp(4)} />, content: '(480) 555-0103' },
        { name: 'Instagram', icon: <MaterialCommunityIcons name='instagram' color={Colors.primaryBrown} size={hp(4)} />, content: '(480) 555-0103' },
    ])
    const [collapsedIndex, setCollapsedIndex] = useState(null);

    const toggleCollapse = (index) => {
        setCollapsedIndex(collapsedIndex == index ? null : index);
    };
    return (
        <View style={[{ flex: 1 }, styles?.paddingX]}>
            {
                list?.map((item, index) => {
                    return (
                        <View style={{ marginVertical: hp(.5) }} key={index}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => toggleCollapse(index)} style={[styles?.collapseBtn, {
                                    borderBottomLeftRadius: collapsedIndex === index ? 0 : hp(1.5),
                                    borderBottomRightRadius: collapsedIndex === index ? 0 : hp(1.5),
                                    borderBottomWidth: collapsedIndex == index ? 0 : hp(.12)
                                }]}>
                                <View style={[styles?.collapseBreak, styles?.collapseBtn, {
                                    borderBottomWidth: collapsedIndex == index ? hp(.12) : 0,
                                }]}>
                                    <View style={[styles?.contentBox,]}>
                                        {item?.icon}
                                        <Text style={styles?.userName}>{item?.name}</Text>
                                    </View>
                                    <Feather name={collapsedIndex == index ? 'chevron-up' : 'chevron-down'} color={Colors.black} size={hp(3)} />
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={!(collapsedIndex === index)} style={styles?.collapse}>
                                {/* Content you want to hide/show goes here */}
                                <Text style={[styles?.greyText, { paddingLeft: wp(9) }]}>
                                    <Octicons name='dot-fill' color={Colors.primaryBrown} size={hp(2)} />{'  '}{item?.content}
                                </Text>
                            </Collapsible>
                        </View>
                    )
                })
            }

        </View>
    )
}

export default React.memo(ContactUs)

import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './Policy'
import TextInput from '../../components/InputComp/TextInputCommon'
import Feather from 'react-native-vector-icons/Feather'
import { Colors } from '../../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { Header } from '../../components/CommonComp'
import ContactUs from './ContactUs'
import FAQ from './FAQ'

const HelpCenter = ({ navigation }) => {

    const [serachValue, setSearchValue] = useState('');
    const [slideAnim] = useState(new Animated.Value(0));

    const [orderTypes, setOrderTypes] = useState([
        { type: 'FAQ', selected: true },
        { type: 'Contact Us', selected: false },
    ]);
    const [selectedType, setSelectedType] = useState(orderTypes[0])
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

        slideOrderAnim(index * wp(45.7))
        // Animate the slide

    }
    const slideOrderAnim = (slideVal) => {
        Animated.timing(slideAnim, {
            toValue: slideVal,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
            <View style={[styles?.container, { paddingHorizontal: 0 }]}>

                {/* Header */}
                <View style={[styles?.paddingX, { width: '100%' }]}>
                    <Header heading={'Help Center'} boxStyle={[{ paddingBottom: hp(2.7) }]} onPress={() => navigation.goBack()} />
                </View>

                {/* Search Input */}
                <View style={[styles?.paddingX, { width: '100%' }]}>
                    <View style={[styles?.searchBox]}>
                        <Feather name='search' color={Colors.primaryBrown} size={hp(3.3)} />
                        <TextInput
                            style={{ borderWidth: 0, height: '100%' }}
                            keyboardType={'default'}
                            onChangeText={(value) => setSearchValue(value)}
                            value={serachValue}
                            placeholder={'Search'}
                        />
                    </View>
                </View>

                {/* Slide */}
                <View style={[styles?.typeContainer]}>
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
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={{ paddingHorizontal: wp(3.1) }}>
                        <Animated.View style={[styles?.selectedTypeBorder, {
                            position: 'relative',
                            left: slideAnim,
                            // left:wp(42)
                        }]} />
                    </View>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10), paddingTop: hp(2) }}
                    style={{ width: '100%' }}
                >
                    {
                        selectedType?.type == orderTypes[1]?.type ? <ContactUs/> :<FAQ/>
                    }
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default React.memo(HelpCenter)


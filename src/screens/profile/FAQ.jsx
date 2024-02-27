import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Collapsible from 'react-native-collapsible';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel';
import { styles } from './Policy';
import { Colors } from '../../../utils';

const FAQ = () => {

    const [list, setList] = useState([
        { name: `Can I track my order's status?`, content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ` },
        { name: 'Is there a return policy?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ` },
        { name: 'Can I save my favourite items for later?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ` },
        { name: 'Can I share my products with my friends?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ` },
        { name: 'How do I contact customer support?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ` },
        { name: 'What payment methods are accepted?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ` },
        { name: 'How to add review?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ` },
    ]);
    const [faq, setFaq] = useState([
        'All', 'Services', 'General', 'Account'
    ])
    const [selectedFaq, setSelectedfaq] = useState(faq[0])
    const [collapsedIndex, setCollapsedIndex] = useState(null);

    const toggleCollapse = (index) => {
        setCollapsedIndex(collapsedIndex == index ? null : index);
    };
    return (
        <View style={[{ flex: 1, marginVertical: hp(2) }, styles?.paddingX]}>

            <View style={{ marginBottom: hp(2.) }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={[{ width: '100%', }]}
                    data={faq}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={[styles.tag, {
                                backgroundColor: selectedFaq == item ? Colors.primaryBrown : Colors.AntiFlashWhite
                            }]} onPress={() => setSelectedfaq(item)}>
                                <Text style={[styles.tagText, {
                                    color: selectedFaq == item ? Colors.white : Colors.black
                                }]}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            {
                list?.map((item, index) => {
                    return (
                        <View style={{ marginVertical: hp(.5) }} key={index}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => toggleCollapse(index)}
                                style={[styles?.collapseBtn, {
                                    borderBottomLeftRadius: collapsedIndex === index ? 0 : hp(1.5),
                                    borderBottomRightRadius: collapsedIndex === index ? 0 : hp(1.5),
                                    borderBottomWidth:collapsedIndex == index ?0 :  hp(.12) 
                                }]}
                            >
                                <View style={[styles?.collapseBreak, styles?.collapseBtn,{
                                  borderBottomWidth:collapsedIndex == index ? hp(.12) : 0 
                                }]}>
                                    <Text style={[styles?.userName, { width: '90%' }]}>{item?.name}</Text>
                                    <Feather name={collapsedIndex == index ? 'chevron-up' : 'chevron-down'} color={Colors.black} size={hp(3)} />
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={!(collapsedIndex === index)} style={[styles?.collapse, { height: 'auto' }]}>
                                <Text style={[styles?.greyText, { paddingHorizontal: wp(4), textAlign: 'justify' }]}>
                                    {item?.content}
                                </Text>
                            </Collapsible>
                        </View>
                    )
                })
            }

        </View>
    )
}

export default React.memo(FAQ)


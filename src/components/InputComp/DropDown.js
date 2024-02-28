import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from
    '../../../pixel';
import Collapsible from 'react-native-collapsible';
import Feather from 'react-native-vector-icons/Feather'
import { Colors, Fonts } from '../../../utils';

const Dropdown = ({ options, onSelect, value, style, current, showDropdown, setShowDropdown }) => {

    const handleSelect = (option) => {
        setShowDropdown(false);
        onSelect(option);
    };

    return (

        <View style={[styles.container, style]}>
            <TouchableOpacity activeOpacity={.5} style={styles?.box} onPress={() => { showDropdown === current ? setShowDropdown(false) : setShowDropdown(current) }}>
                {/* <View style={styles.optionTextBox}> */}
                    <Text style={{ color: Colors.primaryBrown, letterSpacing: wp(.3), fontSize: hp(1.7), fontFamily: Fonts.PoppinsMedium }}>{value}</Text>
                {/* </View> */}
                <Feather name='chevron-down' size={hp(2.8)} color={Colors.black} />
            </TouchableOpacity>

            <Collapsible collapsed={!(showDropdown === current)} duration={200}>
                <View style={styles.optionBox}>
                    <ScrollView
                        style={styles.dropdownScrollView}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps='handled'
                    >
                        {
                            options.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => handleSelect(item)} style={[styles.option,index == options?.length-1 && {borderBottomWidth:0}]}>
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',width:'100%'
    },
    header: {
        padding: hp(1.7),
        borderRadius: hp(.2),
        borderWidth: hp(.17),
        borderColor: Colors.borderGrey,
        height: hp(6.4)
    },
    box: { flexDirection: 'row', alignItems: 'center',width:'100%', borderColor: Colors.borderGrey, justifyContent: 'space-between',borderRadius: hp(6), borderWidth: hp(.12), height: hp(6.4), paddingHorizontal:wp(4)},

    optionTextBox: { paddingHorizontal: wp(3), height: hp(6.2), flexGrow: 1, justifyContent: 'center', },
    dropdownContainer: {
        maxHeight: hp(20), // Set the maximum height for the dropdown container
        borderColor: Colors.borderGrey,
        borderRadius: hp(.2),
        borderWidth: hp(.17),
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: Colors.white,

    },
    optionBox: {
        height: 'auto',
        borderColor: Colors.borderGrey, borderTopLeftRadius: hp(.5), borderTopRightRadius: hp(.5), borderWidth: hp(.12), marginTop: hp(.5)
        //  borderColor: Colors.white ,
        // backgroundColor: Colors.black30,
    },
    option: {
        padding: hp(1.5),
        borderBottomColor: Colors.borderGrey,
        borderBottomWidth: hp(.1),
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(.2),
    },
    headerText: {
        fontSize: hp(1.68),
        color: Colors.primaryBlue,
        letterSpacing: 1,
        fontFamily: Fonts.PoppinsMedium, textAlignVertical: 'center'
    },
    optionText: {
        color: Colors.darkGrey,
        fontSize: hp(1.6),
        letterSpacing: wp(.2),
        fontFamily: Fonts.PoppinsRegular
    },
});


export default Dropdown;
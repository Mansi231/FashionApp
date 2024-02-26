import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { Header } from '../../components/CommonComp'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import card from '../../assets/payment/card.png'
import TextInput from '../../components/InputComp/TextInputCommon'
import DatePicker from 'react-native-date-picker';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FilledButton } from '../../components/InputComp/Button'

const AddCard = ({navigation,route}) => {

    const [expiryDate, setExpiryDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [saveCard, setSaveCard] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={[styles?.container]}>
                <StatusBar backgroundColor={Colors.white} />

                {/* header */}
                <Header heading={'Add Card'} onPress={()=>navigation.goBack()}/>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                    style={{ width: '100%' }}
                >
                    <Image source={card} style={[styles?.cardImage]} />

                    {/* Form */}
                    <Text style={[styles?.heading, { fontSize: hp(2.2) }]}>Card Holder Name</Text>
                    <TextInput
                        keyboardType={'default'}
                        onChangeText={(value) => { }}
                        value={''}
                        placeholder={'John Doe'}
                        placeholderTextColor={Colors.black}
                        style={{ width: '100%', marginBottom: hp(3), marginTop: hp(1), borderRadius: hp(1.5) }} />


                    <Text style={[styles?.heading, { fontSize: hp(2.2) }]}>Card Number</Text>
                    <TextInput
                        maxLength={10}
                        keyboardType={'decimal-pad'}
                        onChangeText={(value) => { }}
                        value={''}
                        placeholder={'4716 9627 1635 8047'}
                        placeholderTextColor={Colors.black}
                        style={{ width: '100%', marginBottom: hp(3), marginTop: hp(1), borderRadius: hp(1.5), color: Colors.black }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: wp(3), width: '100%' }}>
                        <View style={{ width: '47%' }}>
                            <Text style={[styles?.heading, { fontSize: hp(2.2) }]}>Expiry Date</Text>
                            <TouchableOpacity style={[styles?.expiryDateBox]} onPress={
                                () => setOpen(!open)
                            }>
                                <Text style={[styles?.numberText]}>{'02/10'}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                theme='dark'
                                modal
                                open={open}
                                date={expiryDate}
                                mode={'date'}
                                // onConfirm={date1 => {
                                //     setOpen(false);
                                //     setDate(date1);
                                //     onChangeDob(date1);

                                // }}
                                maximumDate={moment().subtract(18, 'years').toDate()}
                                onCancel={() => {
                                    setOpen(false);
                                }}
                            />
                        </View>
                        <View style={{ width: '47%' }}>
                            <Text style={[styles?.heading, { fontSize: hp(2.2) }]}>CVV</Text>
                            <TextInput
                                maxLength={3}
                                keyboardType={'decimal-pad'}
                                onChangeText={(value) => { }}
                                value={''}
                                placeholder={'000'}
                                style={{ marginBottom: hp(3), marginTop: hp(1), borderRadius: hp(1.5), color: Colors.black }} />
                        </View>
                    </View>
                    <View style={[styles?.saveCardBox]}>
                        <MaterialCommunityIcons name={saveCard ? 'checkbox-marked' : 'checkbox-blank-outline'} size={hp(3)} color={Colors.primaryBrown} />
                        <Text style={[styles?.heading, { fontFamily: Fonts.RobotoMedium }]} onPress={() => setSaveCard(!saveCard)}>
                            Save Card
                        </Text>
                    </View>
                </ScrollView>
                <View style={[styles?.cartBtnView, { marginVertical: 0 }]}>
                    <FilledButton
                        text={'Add Card'}
                        btnStyle={{ flex: 1, marginTop: 0, height: hp(5.6), paddingVertical: hp(.2) }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddCard

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingBottom: hp(3.3), paddingHorizontal: wp(5.2),
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    cardImage: {
        width: '100%', height: hp(26), marginVertical: hp(3), borderRadius: hp(2)
    },
    heading: {
        color: Colors.black, fontSize: hp(2.4), fontFamily: Fonts?.RobotoMedium,
        textAlign: 'left', width: '100%',
    },
    datePickerStyle: {
        fontSize: hp(2.1),
        color: Colors.text,
        fontFamily: Fonts.RobotoMedium,
        // marginLeft: wp(1.8),
    },
    datePickerViewStyle: {
        width: '100%',
        borderBottomWidth: .6,
        borderBottomColor: Colors.borderGrey,
        // height: hp(9.25),
        // paddingVertical:hp(2),
        borderRadius: hp(.6),
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: wp(2),
        marginVertical: hp(2),

    },
    expiryDateBox: {
        height: hp(6.4),
        borderRadius: hp(1.5),
        borderWidth: hp(.12),
        borderColor: Colors?.borderGrey, textAlign: 'left',
        width: '100%',
        color: Colors?.primaryBrown,
        paddingHorizontal: wp(2.6),
        paddingVertical: hp(1.1),
        marginTop: hp(1),
        marginBottom: hp(3),
        justifyContent: "center"
    },
    numberText: {
        fontSize: hp(2),
        color: Colors?.black,
        paddingHorizontal: wp(2.6),
        letterSpacing: 1,
        fontFamily: Fonts.RobotoMedium, textAlignVertical: 'center'
    },
    saveCardBox: {
        flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', gap: wp(2)
    },
    cartBtnView: {
        paddingVertical: hp(2), borderColor: Colors?.borderGrey, borderWidth: hp(.12),
        borderTopLeftRadius: hp(2), borderTopRightRadius: hp(2), borderBottomWidth: 0,
        bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: Colors?.white,
        marginTop: hp(2), paddingHorizontal: wp(5.2)
    },
})
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../utils'
import { Header } from '../components/CommonComp'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import TextInput from '../components/InputComp/TextInputCommon'
import Feather from 'react-native-vector-icons/Feather'

const PasswordManager = ({ navigation, route }) => {
    const [info, setInfo] = useState({ currentPassword: '', newPassword: '', confirmPassword: "" })

    const [inputs, setInputs] = useState([
        { title: 'Current Password', val: 'currentPassword', showPassword: false },
        { title: 'New Password', val: 'newPassword', showPassword: false },
        { title: 'Confirm New Password', val: 'confirmPassword', showPassword: false },
    ])

    const handleShowIcon = (index) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = { ...updatedInputs[index], showPassword: !updatedInputs[index].showPassword };
        setInputs(updatedInputs);
    }

    const handleChangeText = (value, name) => {
        setInfo({ ...info, [`${name}`]: value })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
            <View style={[styles?.container]}>
                <Header heading={'Settings'} boxStyle={[{ paddingBottom: hp(2.7), }]} onPress={() => navigation.goBack()} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                    style={{ width: '100%' }}
                >
                    <View style={styles?.inputContainer}>
                        {
                            inputs?.map((item, index) => {
                                return (
                                    <>
                                        <View style={styles?.inputBox}>
                                            <Text style={styles?.label}>{item?.title}</Text>
                                            <View style={[styles?.input, styles?.secureIcon]}>
                                                <TextInput
                                                    style={{ borderWidth: 0, flex: 1 }}
                                                    value={info[`${item?.val}`]}
                                                    placeholder={'*********'}
                                                    secureTextEntry={!item?.showPassword}
                                                    onChangeText={(value) => handleChangeText(value, item?.val)}
                                                    editable={true}
                                                    maxLength={10}
                                                />
                                                <TouchableOpacity
                                                    style={{ paddingHorizontal: wp(3.5) }}
                                                    onPress={() => handleShowIcon(index)}>
                                                    <Feather name={item?.showPassword ? 'eye' : 'eye-off'} size={hp(3)} color={Colors.black} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {
                                            index == 0 && <Text style={[styles?.brownText]}>
                                                Forgot Password?
                                            </Text>
                                        }
                                    </>

                                )
                            })
                        }

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default PasswordManager

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingBottom: hp(3.3), paddingHorizontal: wp(5.2),
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    inputBox: { flexDirection: 'column', gap: hp(1), justifyContent: 'flex-start', alignItems: 'center', width: '100%' },
    label: {
        fontSize: hp(2.1), fontFamily: Fonts?.PoppinsMedium, color: Colors?.black, textAlign: 'left', width: '100%'
    },
    input: { width: '100%', flexDirection: 'row', justifyContent: 'flex-start' },
    secureIcon: {
        height: hp(6.4),
        borderRadius: hp(1.5),
        borderWidth: hp(.12),
        borderColor: Colors?.borderGrey,
        width: '100%',
        justifyContent: 'space-between', alignItems: 'center'
    },
    inputContainer: { flexDirection: 'column', gap: hp(3), marginTop: hp(3) },
    brownText:{color:Colors.primaryBrown,fontSize:hp(1.9),textAlign:'right',
    textDecorationStyle:'solid',textDecorationLine:'underline'},
})
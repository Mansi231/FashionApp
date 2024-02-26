import Toast from 'react-native-toast-message';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Fragment, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../utils'
import { Header } from '../components/CommonComp'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import TextInput from '../components/InputComp/TextInputCommon'
import Feather from 'react-native-vector-icons/Feather'
import { FilledButton } from '../components/InputComp/Button'
import { Formik } from 'formik'
import * as yup from 'yup';
import { changePassword } from '../../services/redux/actions/AuthAction'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? hp(6) : 0;

const PasswordManager = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false)
    const [scrollOffset, setScrollOffset] = useState(0);

    const [inputs, setInputs] = useState([
        { title: 'Current Password', val: 'currentpassword', showPassword: false },
        { title: 'New Password', val: 'newpassword', showPassword: false },
        { title: 'Confirm New Password', val: 'confirmpassword', showPassword: false },
    ])

    const handleShowIcon = (index) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = { ...updatedInputs[index], showPassword: !updatedInputs[index].showPassword };
        setInputs(updatedInputs);
    }

    const handleChangePassword = async (values, resetForm) => {
        try {
            setLoading(true)
            let response = await changePassword(values)
            if(response.status){
                Toast.show({
                    type: 'success',
                    text1: response?.message,
                    visibilityTime: 3000,
                    swipeable: true,
                    text1Style: { fontFamily: Fonts.PoppinsMedium, fontSize: hp(1.3), color: Colors.black, letterSpacing: wp(.1) ,textAlign:'left'},
                    topOffset: scrollOffset,
                    
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error?.message[Object.keys(error?.message)[0]][0],
                visibilityTime: 3000,
                swipeable: true,
                text1Style: { fontFamily: Fonts.PoppinsMedium, fontSize: hp(1.3), color: Colors.black, letterSpacing: wp(.1) ,textAlign:'left'},
                topOffset: scrollOffset,width:'100%'
            });
        } finally {
            setLoading(false)
            resetForm()
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
            <View style={{
                width: "100%",
                height: STATUS_BAR_HEIGHT,
                backgroundColor: Colors.white
            }} />
            <StatusBar
                backgroundColor={Colors.white}
                barStyle="dark-content"
            />
            <View style={[styles?.container]}>
                <Header heading={'Settings'} boxStyle={[{ paddingBottom: hp(2.7), }]} onPress={() => navigation.goBack()} />
                <Toast position='top' />
                <Formik
                    initialValues={{ currentpassword: '', newpassword: '', confirmpassword: "" }}
                    onSubmit={(values, { resetForm }) => {
                        handleChangePassword(values, resetForm)
                    }}
                    validationSchema={yup.object().shape({
                        currentpassword: yup.string().required('Current Password is required.'),
                        newpassword: yup.string().required('New Password is required.'),
                        confirmpassword: yup.string().oneOf([yup.ref("newpassword"), null], "New password and Confirm password must match").required('Confirm Password is required.'),
                    })}
                >
                    {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => (
                        <>
                            <ScrollView
                                onScroll={(event) => {
                                    setScrollOffset(event.nativeEvent.contentOffset.y);
                                }}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                                style={{ width: '100%' }}
                            >
                                <View style={styles?.inputContainer}>
                                    {
                                        inputs?.map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <View style={styles?.inputBox}>
                                                        <Text style={styles?.label}>{item?.title}</Text>
                                                        <View style={[styles?.input, styles?.secureIcon]}>
                                                            <TextInput
                                                                style={{ borderWidth: 0, flex: 1 }}
                                                                value={values[item.val]}
                                                                placeholder={'*********'}
                                                                secureTextEntry={!item?.showPassword}
                                                                onChangeText={handleChange(item.val)}
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
                                                    {touched[item.val] && errors[item.val] && <Text style={styles.errorText}>{errors[item.val]}</Text>}
                                                    {
                                                        index == 0 && <Text style={[styles?.brownText]}>
                                                            Forgot Password?
                                                        </Text>
                                                    }
                                                </Fragment>

                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                            <View style={[styles?.cartBtnView, { marginVertical: 0 }]}>
                                <FilledButton
                                    onPress={handleSubmit}
                                    text={'Change Password'}
                                    loading={loading}
                                    btnStyle={{ flex: 1, marginTop: 0, height: hp(5.6), paddingVertical: hp(.2) }} />
                            </View>
                        </>
                    )}
                </Formik>
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
    brownText: {
        color: Colors.primaryBrown, fontSize: hp(1.9), textAlign: 'right',
        textDecorationStyle: 'solid', textDecorationLine: 'underline'
    },
    cartBtnView: {
        paddingVertical: hp(2), borderColor: Colors?.borderGrey, borderWidth: hp(.12),
        borderTopLeftRadius: hp(2), borderTopRightRadius: hp(2), borderBottomWidth: 0,
        bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: Colors?.white,
        marginTop: hp(2), paddingHorizontal: wp(5.2)
    },
    errorText: {
        color: Colors.errorColor,
        fontFamily: Fonts.Roboto,
        fontSize: hp(1.68), lineHeight: hp(2.1), width: '100%'
    },
})
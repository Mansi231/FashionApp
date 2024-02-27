import Toast from 'react-native-toast-message';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Fragment, useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { BackArrow, Header } from '../../components/CommonComp'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import TextInputCommon from '../../components/InputComp/TextInputCommon'
import Feather from 'react-native-vector-icons/Feather'
import { FilledButton } from '../../components/InputComp/Button'
import { Formik } from 'formik'
import * as yup from 'yup';
import { changePassword } from '../../../services/redux/actions/AuthAction'
import { Context } from '../../context/Mycontext';
import profileImage from '../../assets/profile/boy.png'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? hp(6) : 0;

const EditProfile = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false)
    const [scrollOffset, setScrollOffset] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const { user } = useContext(Context);

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
            if (response.status) {
                Toast.show({
                    type: 'success',
                    text1: response?.message,
                    visibilityTime: 3000,
                    swipeable: true,
                    text1Style: { fontFamily: Fonts.PoppinsMedium, fontSize: hp(1.3), color: Colors.black, letterSpacing: wp(.1), textAlign: 'left' },
                    topOffset: scrollOffset,

                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error?.message[Object.keys(error?.message)[0]][0],
                visibilityTime: 3000,
                swipeable: true,
                text1Style: { fontFamily: Fonts.PoppinsMedium, fontSize: hp(1.3), color: Colors.black, letterSpacing: wp(.1), textAlign: 'left' },
                topOffset: scrollOffset, width: '100%'
            });
        } finally {
            setLoading(false)
            resetForm()
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
            <View style={[styles?.container]}>
                <BackArrow onPress={() => navigation.goBack()} />
                <Toast position='top' />
                <Text style={styles?.heading}>Your Profile</Text>
                <Text style={styles?.welcomeText}>
                    Don't worry, only you can see your personal data.No one else will be able to see it.
                </Text>
                <Formik
                    initialValues={{ name: '', phone: '', gender: null }}
                    onSubmit={(values, { resetForm }) => {
                        handleChangePassword(values, resetForm)
                    }}
                    validationSchema={yup.object().shape({
                        name: yup.string().required('Name is required.'),
                        phone: yup.string().required('Phone Number is required.'),
                        gender: yup.string().required('Name is required.'),
                    })}
                >
                    {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => (
                        <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                                style={{ width: '100%' }}
                            >
                                {/* Profile Image */}
                                <View style={[styles?.imageContainer]}>
                                    {/* <Image source={profileImage} style={{ height: '100%', width: '100%', borderRadius: hp(8) }} /> */}
                                    <View style={styles?.profileImageContainer}>
                                        <FontAwesome6 name='user-large' size={hp(4)} color={Colors.lightGrey} />
                                    </View>
                                    <TouchableOpacity style={[styles?.editImageBox]} activeOpacity={.8}>
                                        <View style={[styles?.filledBox]}>
                                            <AntDesign name='edit' size={hp(2)} color={Colors.white} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles?.inputContainer}>
                                    <View style={styles?.inputBox}>
                                        <Text style={styles?.label}>Name</Text>
                                        <View style={styles?.input}>
                                            <TextInputCommon
                                                keyboardType={'default'}
                                                onChangeText={handleChange('name')}
                                                value={values?.name}
                                                placeholder={'John Doe'}
                                                style={{ width: '100%' }} />
                                        </View>
                                        {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                                    </View>
                                    <View style={styles?.inputBox}>
                                        <Text style={styles?.label}>Phone Number</Text>
                                        <View style={[styles?.input, {
                                            borderColor: Colors.borderGrey, borderRadius: hp(6), borderWidth: hp(.12), height: hp(6.4), paddingHorizontal: wp(4), alignItems: 'center',
                                            gap: wp(2.5)
                                        }]}>
                                            <TouchableOpacity style={{ justifyContent: "center", flexDirection: 'row', gap: wp(1.5), alignItems: 'center' }}>
                                                <Text>+91</Text>
                                                <FontAwesome6 size={hp(1.7)} name='chevron-down' color={Colors.black} />
                                            </TouchableOpacity>
                                            <View style={{ backgroundColor: Colors.borderGrey, height: hp(3.2), width: wp(.3) }} />
                                            <TextInput
                                                style={[styles.numberText]}
                                                textAlignVertical='center' placeholder='**********' />
                                        </View>
                                        {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                                    </View>
                                    <View style={styles?.inputBox}>
                                        <Text style={styles?.label}>Gender</Text>
                                        <View style={[styles?.input, styles?.secureIcon]}>

                                        </View>
                                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                                    </View>

                                </View>

                            </ScrollView>
                            <FilledButton text={'Complete Profile'} loading={loading}
                                onPress={() => handleSubmit()}
                            />
                        </>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: wp(5.2) },
    heading: { fontSize: hp(3), fontFamily: Fonts?.RobotoMedium, color: Colors?.black, marginTop: hp(3) },
    welcomeText: {
        fontFamily: Fonts?.RobotoRegular, fontSize: hp(2.2), color: Colors?.grey, marginVertical: hp(3),
        textAlign: "center"
    },
    profileImageContainer: { height: '100%', width: '100%', borderRadius: hp(8), backgroundColor: Colors.borderGrey, justifyContent: 'center', alignItems: 'center' },

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
    inputContainer: { flexDirection: 'column', gap: hp(2.3), marginTop: hp(3) },
    inputBox: { flexDirection: 'column', gap: hp(1), justifyContent: 'flex-start', alignItems: 'center', width: '100%' },
    label: {
        fontSize: hp(2.1), fontFamily: Fonts?.RobotoRegular, color: Colors?.black, textAlign: 'left', width: '100%'
    },
    input: { width: '100%', flexDirection: 'row', justifyContent: 'flex-start' },
    numberText: {
        fontSize: hp(2),
        color: Colors?.primaryBrown,
        paddingVertical: hp(1.1),
        letterSpacing: 1,
        fontFamily: Fonts.Roboto, textAlignVertical: 'center'
    },
    secureIcon: {
        height: hp(6.4),
        borderRadius: hp(6),
        borderWidth: hp(.12),
        borderColor: Colors?.borderGrey,
        width: '100%',
        justifyContent: 'space-between', alignItems: 'center'
    },
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
    imageContainer: {
        height: hp(11.5), width: hp(11.5), borderRadius: hp(8), marginTop: hp(1),
        position: 'relative', alignSelf: 'center'
    },
    editImageBox: {
        height: hp(4.5), width: hp(4.5), borderRadius: hp(8), position: 'absolute', bottom: -hp(.5), right: -hp(1), backgroundColor: Colors.white, flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center'
    },
    filledBox: {
        height: hp(3.8), width: hp(3.8), backgroundColor: Colors.primaryBrown, borderRadius: hp(8),
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center'
    },
})
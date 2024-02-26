import { Keyboard, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { Colors, Fonts } from '../../utils'
import { BackArrow } from '../components/CommonComp'
import { FilledButton } from '../components/InputComp/Button'
import { Formik } from 'formik'
import * as yup from 'yup';
import { Routes } from '../../services/Routes'
import { registerApi, resendCodeApi, verifyCodeApi } from '../../services/redux/actions/AuthAction'
import Toast from 'react-native-simple-toast';
import AsyncStorageUtil, { KEYS } from '../../services/AsyncStorageUtil'
import { Context } from '../context/Mycontext'

const VerifyCode = ({ navigation, route, length = 4 }) => {

    let { params: { email } } = route
    const [loading, setLoading] = useState(false)
    const {isVerified,setIsVerified} = useContext(Context)

    const otpInputs = Array(length).fill(null);

    const inputRefs = otpInputs.map(() => useRef(null));

    const handleChangeVal = (index, value, setFieldValue, values) => {
        if (isNaN(value)) {
            return; // Ignore non-numeric characters
        }

        const newOtp = [...values?.otp];
        newOtp[index] = value;

        setFieldValue('otp', newOtp)

        if (index < length - 1 && value !== '') {
            inputRefs[index + 1].current.focus();
        }
        if (newOtp?.join('')?.length == length) Keyboard.dismiss()
    };

    const handleKeyPress = (index, key, setFieldValue, values) => {
        if (key === 'Backspace' && index > 0 && !values?.otp[index]) {
            const newOtp = [...values.otp];
            newOtp[index - 1] = '';
            setFieldValue('otp', newOtp)
            inputRefs[index - 1].current.focus();
        }
    };

    const handleVerififcation = async (values) => {
        try {

            const response = await verifyCodeApi({ email: email, verification_code: values.otp.join('') });
            if (response.status) {
                await AsyncStorageUtil.setItem(KEYS.is_verified, '1');
                setIsVerified(1);
                // navigation.reset({
                //     index: 0,
                //     routes: [{ name: Routes.BottomTab }],
                // });
                navigation.navigate(Routes.Auth)
            } else {

            }
        } catch (err) {
            console.log('Get Error::', err);
        }
    }

    const handleResendCode = async () => {
        Toast.showWithGravity(`verification code has been sent to ${email}`, Toast.LONG, Toast.TOP, { backgroundColor: '#ec0024', textColor: Colors.white });
        try {
            const response = await resendCodeApi(email);
            console.log('----resend code response---', response)
            if (response.status) {
                Toast.showWithGravity(`verification code has been sent to ${email}`, Toast.LONG, Toast.TOP, { backgroundColor: '#ec0024', textColor: Colors.white });

            } else {
                Toast.showWithGravity('Oops ! something went wrong.', Toast.LONG, Toast.TOP, { backgroundColor: '#ec0024', textColor: Colors.white });
            }
        } catch (err) {
            Toast.showWithGravity(err?.message, Toast.LONG, Toast.TOP, { backgroundColor: '#ec0024', textColor: Colors.white });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={styles?.container}>
                <StatusBar
                    backgroundColor={Colors.white}
                    barStyle="dark-content"
                />
                <BackArrow onPress={() => navigation.goBack()} />
                <Text style={styles?.heading}>Verify Code</Text>
                <Text style={styles?.welcomeText}>
                    Please enter code we just sent to email {'\n'}
                    <Text style={{ color: Colors?.primaryBrown, textAlign: "center" }}>{email}</Text>
                </Text>
                <Formik
                    initialValues={{ otp: Array(length).fill('') }}
                    onSubmit={values => {
                        console.log(values);
                        // handleSignUp(values)
                        handleVerififcation(values)
                    }}
                    validationSchema={yup.object().shape({
                        otp: yup
                            .array(yup.string('Verification code is required.').required('Verification code is required.'))
                            .min(4)
                    })}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
                        <>
                            <View style={styles?.inputCellBox}>
                                {otpInputs.map((_, index) => (
                                    <TextInput
                                        key={index}
                                        ref={inputRefs[index]}
                                        style={[styles.inputCell]}
                                        maxLength={1}
                                        value={values.otp[index]}
                                        keyboardType="numeric"
                                        onChangeText={(value) => handleChangeVal(index, value, setFieldValue, values)}
                                        onKeyPress={({ nativeEvent: { key } }) =>
                                            handleKeyPress(index, key, setFieldValue, values)
                                        }
                                        textAlignVertical='center'
                                    />
                                ))}
                            </View>
                            {touched.otp && errors.otp && <Text style={styles.errorText}>{'Verification code is required'}</Text>}

                            <Text style={styles?.resendText}>Didn't receive OTP?</Text>
                            <TouchableOpacity>
                                <Text style={[styles?.brownText]} onPress={() => handleResendCode()}>Resend Code</Text>
                            </TouchableOpacity>
                            <FilledButton loading={loading} text={'Verify'} onPress={() => handleSubmit()} />
                        </>
                    )}

                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default VerifyCode

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: wp(5.2) },
    heading: { fontSize: hp(3), fontFamily: Fonts?.RobotoMedium, color: Colors?.black, marginTop: hp(3) },
    welcomeText: {
        fontFamily: Fonts?.RobotoRegular, fontSize: hp(2.2), color: Colors?.grey, marginVertical: hp(3),
        textAlign: "center"
    },
    resendText: {
        fontFamily: Fonts?.RobotoRegular, fontSize: hp(1.9), color: Colors?.grey,
        textAlign: "center"
    },
    brownText: {
        color: Colors?.primaryBrown, textDecorationLine: 'underline', marginVertical: hp(1),
        fontFamily: Fonts?.RobotoRegular, fontSize: hp(1.9),
        textAlign: "center"
    },
    inputCell: {
        textAlign: 'center',
        height: hp(5.7),
        width: wp(18),
        borderBottomWidth: hp(.12),
        borderRadius: hp(3),
        borderWidth: hp(.12), color: Colors?.primaryBrown,
        borderColor: Colors.borderGrey, fontSize: hp(2.1), fontFamily: Fonts.RobotoMedium,
        textAlignVertical: 'center',
        marginTop: hp(2), marginBottom: hp(1.5)
    },
    inputCellBox: { width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: wp(2) },
    errorText: {
        color: Colors.errorColor,
        fontFamily: Fonts.Roboto,
        fontSize: hp(1.68), lineHeight: hp(2.3), width: '100%', marginBottom: hp(3),
        textAlign: 'center'
    },
})
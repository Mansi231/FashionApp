import { Image, PermissionsAndroid, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors, Fonts } from '../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextInput from '../components/InputComp/TextInputCommon'
import { FilledButton } from '../components/InputComp/Button'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import GoogleLogo from '../assets/auth/googleLogo.png'
import { BackArrow, Header } from '../components/CommonComp'
import { Routes } from '../../services/Routes'
import { Formik } from 'formik'
import * as yup from 'yup';
import { styles } from './authStyle'
import { loginApi } from '../../services/redux/actions/AuthAction'
import Toast from 'react-native-simple-toast';
import AsyncStorageUtil, { KEYS } from '../../services/AsyncStorageUtil'
import { Context } from '../context/Mycontext'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? hp(6) : 0;

const SignIn = ({ navigation, from, setFrom, goback ,onGoBack}) => {

    let accountType = { signin: 'signin', signup: 'signup' }
    const { isVerified, setIsVerified } = useContext(Context)

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleNavigation = () => {
        setFrom(accountType.signup)
    }

    const handleSignIn = async (values,resetForm) => {
        try {
            setLoading(true)
            const response = await loginApi({ email: values.email, password: values.password });

            if (response?.data?.access_token || response?.status || response?.data?.status) {
                setLoading(false)
                if (response?.data?.is_verified == 1 || response.is_verified == 1) {
                    await AsyncStorageUtil.setItem(KEYS.user, JSON.stringify(response?.data));
                    await AsyncStorageUtil.setItem(KEYS.access_token, JSON.stringify(response.data.access_token || response.access_token));
                    await AsyncStorageUtil.setItem(KEYS.is_verified, '1');
                    setIsVerified(1)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: Routes.BottomTab }],
                    });
                    resetForm();
                }
                else {
                    setLoading(false);
                    resetForm();
                    navigation.navigate(Routes.VerifyCode, { email: values.email })
                }

            } else {
                setLoading(false);
                Toast.showWithGravity('Oops ! something went wrong .', Toast.LONG, Toast.TOP, { backgroundColor: '#ec0024', textColor: Colors.white });
            }
        } catch (err) {
            console.log('signin Error::', err);
            if (!err.status && err?.message && err?.is_verified == 0) {
                navigation.navigate(Routes.VerifyCode, { email: values.email })
            }
            else {
                Toast.showWithGravity(err?.message, Toast.LONG, Toast.TOP, { backgroundColor: '#ec0024', textColor: Colors.white });
            }
        }
    }

    useEffect(() => {
        // checkLocationPermission()
    }, [])

    const checkLocationPermission = async () => {
        let granted = await getLocationPermission();
        console.log(granted, '----granted----')
    }
    const getLocationPermission = () => {
        const granted = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).catch(err => {
            console.log(err, '---err location permission----')
        })
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return (
        <View style={styles?.container}>
            <View style={{
                width: "100%",
                height: STATUS_BAR_HEIGHT,
                backgroundColor: Colors.white
            }} />

            <StatusBar
                backgroundColor={Colors.white}
                barStyle="dark-content"
            />
            {
                goback ? <Header heading={'Sign In'} onPress={() => onGoBack()} /> : <>
                    <BackArrow hidden={true}/>
                    <Text style={styles?.heading}>{'Sign In'}</Text>
                </>
            }
            {/* <Text style={styles?.heading}>{'Sign In'}</Text> */}
            <Text style={styles?.welcomeText}>{`Hi! Wecome back , you've been missed`}</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, { resetForm }) => {
                    handleSignIn(values,resetForm)
                }}
                validationSchema={yup.object().shape({
                    password: yup.string().required('Password is required.'),
                    email: yup.string().required('Email is required').email('Invalida email address.'),
                })}
            >
                {({ handleChange, handleSubmit, values, setFieldValue, errors, touched}) => (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                        style={{ width: '100%' }}
                    >
                        <View style={styles?.inputContainer}>
                            <View style={styles?.inputBox}>
                                <Text style={styles?.label}>Email</Text>
                                <View style={styles?.input}>
                                    <TextInput
                                        keyboardType={'email-address'}
                                        onChangeText={handleChange('email')}
                                        value={values?.email}
                                        placeholder={'example@gmail.com'}
                                        style={{ width: '100%' }} />
                                </View>
                                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            </View>
                            <View style={styles?.inputBox}>
                                <Text style={styles?.label}>Password</Text>
                                <View style={[styles?.input, styles?.secureIcon]}>
                                    <TextInput
                                        style={{ borderWidth: 0, flex: 1 }}
                                        value={values?.password}
                                        placeholder={'*********'}
                                        secureTextEntry={!showPassword}
                                        onChangeText={handleChange('password')}
                                        editable={true}
                                        maxLength={10}
                                    />
                                    <TouchableOpacity
                                        style={{ paddingHorizontal: wp(3.5) }}
                                        onPress={() => setShowPassword(!showPassword)}>
                                        <Feather name={showPassword ? 'eye' : 'eye-off'} size={hp(2.5)} color={Colors.black} />
                                    </TouchableOpacity>
                                </View>
                                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                            </View>
                            <TouchableOpacity>
                                <Text style={styles?.forgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <FilledButton text={'Sign In'} onPress={() => handleSubmit()} loading={loading} />
                            {/* <View style={styles?.lineContainer}>
                                    <View style={styles?.line} />
                                    <Text style={styles?.signInWith}>{`Or Sign in with`}</Text>
                                    <View style={styles?.line} />
                                </View>

                                <View style={styles?.lineContainer}>
                                    <TouchableOpacity style={styles?.socialBtn}>
                                        <Ionicons name='logo-apple' size={hp(4)} color={Colors?.black} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles?.socialBtn}>
                                        <Image source={GoogleLogo} style={{ height: hp(3), width: hp(3) }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles?.socialBtn}>
                                        <EvilIcons name='sc-facebook' size={hp(5)} color={Colors?.blue} style={[Platform?.OS == 'android' && { marginTop: -hp(.9) }]} />
                                    </TouchableOpacity>
                                </View> */}

                            <Text style={styles?.alreadyHaveText}>
                                {`Didn't have an accout?`}{' '}
                                <Text style={styles?.tetxDecoration} onPress={() => handleNavigation()}>{'Sign Up'}</Text>
                            </Text>
                        </View>
                    </ScrollView>
                )}
            </Formik>
        </View>
    )
}

export default React.memo(SignIn)

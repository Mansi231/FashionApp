import { Image, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts } from '../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../pixel'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextInput from '../components/InputComp/TextInputCommon'
import { FilledButton } from '../components/InputComp/Button'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import GoogleLogo from '../assets/auth/googleLogo.png'
import { BackArrow, Header } from '../components/CommonComp'
import { Routes } from '../../services/Routes'
import { Formik } from 'formik'
import * as yup from 'yup';
import { styles } from './authStyle'
import { registerApi } from '../../services/redux/actions/AuthAction'
import Toast from 'react-native-simple-toast';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? hp(6) : 0;

const SignUp = ({ navigation, from, setFrom, goback ,onGoBack}) => {

    let accountType = { signin: 'signin', signup: 'signup' }

    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(true);
    const [loading, setLoading] = useState(false)

    const handleNavigation = () => {
        setFrom(accountType.signin)
    }

    const handleSignUp = async (values) => {
        // navigation.navigate(Routes.VerifyCode,{email:values.email})
        try {
            var formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('role_name', 'buyer');

            const response = await registerApi(formData);

            if (response.status) {
                navigation.navigate(Routes.VerifyCode, { email: values.email })

            } else {
                Toast.showWithGravity(err?.message?.email[0] || err?.message?.password[0] || err?.message?.name[0], Toast.LONG, Toast.TOP, { backgroundColor: '#ec0024', textColor: Colors.white });
            }
        } catch (err) {
            console.log('Get Error::', err);
            Toast.showWithGravity(err?.message?.email[0] || err?.message?.password[0] || err?.message?.name[0], Toast.LONG, Toast.TOP, { backgroundColor: '#ec0024', textColor: Colors.white });
        }
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
                goback ? <Header heading={'Create Account'} onPress={ onGoBack} /> : <>
                    <BackArrow hidden={true}/>
                    <Text style={styles?.heading}>{'Create Account'}</Text>
                </>
            }
            {/* <Text style={styles?.heading}>{'Create Account'}</Text> */}
            <Text style={styles?.welcomeText}>{`fill your information below or register with 
                your social account.`}</Text>
            <Formik
                initialValues={{ email: '', name: '', password: '' }}
                onSubmit={values => {
                    // navigation.replace(Routes.BottomTab);
                    if (agree) handleSignUp(values)
                }}
                validationSchema={yup.object().shape({
                    name: yup.string().required('Name is required.'),
                    password: yup.string().required('Password is required.'),
                    email: yup.string().required('Email is required').email('Invalida email address.'),
                })}
            >
                {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                        style={{ width: '100%' }}
                    >
                        <View style={styles?.inputContainer}>
                            <View style={styles?.inputBox}>
                                <Text style={styles?.label}>Name</Text>
                                <View style={styles?.input}>
                                    <TextInput
                                        keyboardType={'default'}
                                        onChangeText={handleChange('name')}
                                        value={values?.name}
                                        placeholder={'John Doe'}
                                        style={{ width: '100%' }} />
                                </View>
                                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                            </View>
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
                                        <Feather name={showPassword ? 'eye' : 'eye-off'} size={hp(3)} color={Colors.black} />
                                    </TouchableOpacity>
                                </View>
                                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                            </View>

                            <View style={[styles?.input, styles?.checkBoxContainer
                            ]}>
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => setAgree(!agree)}>
                                    <MaterialCommunityIcons name={agree ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                        size={hp(3)}
                                        color={Colors?.primaryBrown}
                                    />
                                </TouchableOpacity>
                                <Text style={styles?.agreeWithText}>
                                    Agree With <Text style={styles?.tetxDecoration}>Terms & Condition</Text>
                                </Text>
                            </View>

                            <FilledButton text={'Sign Up'} loading={loading}
                                onPress={() => handleSubmit()}
                            />
                            {/* <View style={styles?.lineContainer}>
                                    <View style={styles?.line} />
                                    <Text style={styles?.signInWith}>{`Or Sign up with`}</Text>
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
                                {`Already have an accout?`}{' '}
                                <Text style={styles?.tetxDecoration} onPress={() => handleNavigation()}>{`Sign In`}</Text>
                            </Text>
                        </View>
                    </ScrollView>
                )}

            </Formik>
        </View>
    )
}

export default React.memo(SignUp)

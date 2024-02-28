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
  import { Context } from '../../context/Mycontext';
import profileImage from '../../assets/profile/boy.png'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { appStyles } from '../../../App';
import CountryPicker from 'react-native-country-picker-modal'
import Dropdown from '../../components/InputComp/DropDown';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfile = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false)
    const [scrollOffset, setScrollOffset] = useState(0);
    const [CountryModalVisible, setCountryModalVisible] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    const [showDropdown, setShowDropdown] = useState(false);

    const { user } = useContext(Context);

    const onCountrySelect = country => {
        console.log(country.callingCode[0], ':: country.callingCode[0] ::');
        if (country.callingCode[0] != undefined) {
            setCountryCode(`+` + country.callingCode[0]);
            setCountryModalVisible(!CountryModalVisible);
        }
    };
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const genderOptions = [
        { name: 'Male', label: 'Male' },
        { name: 'Female', label: 'Female' }
    ]
    const handleSelectImage = (setFieldValue) => {
        ImagePicker.openPicker({
            multiple: false,
            width: 800,
            height: 800,
            cropping: false,
            maxFiles: 6,
            mediaType: "photo",
            compressImageMaxWidth: 800,
            compressImageMaxHeight: 800,
            compressImageQuality: Platform.OS == 'android' ? 0.8 : 1
        }).then(async image => {

            const croppedImage = await ImagePicker.openCropper({
                path: image.path,
                hideBottomControls: true,
                width: 800,
                height: 800,
                croppingQuality: 1.0,
                compressImageQuality: 0.8, // Adjust the image quality
                compressImageMaxWidth: 800,
                compressImageMaxHeight: 800,
                compressImageQuality: Platform.OS == 'android' ? 0.8 : 1
            });

            if (Platform.OS == 'android') {
                var filename = croppedImage.path.substring(croppedImage.path.lastIndexOf('/') + 1);
                setFieldValue('image', {
                    uri: croppedImage.path,
                    type: croppedImage.mime,
                    name: filename,
                });
            } else if (Platform.OS == 'ios') {
                setFieldValue('image', {
                    uri: croppedImage.sourceURL,
                    type: croppedImage.mime,
                    name: croppedImage.filename,
                });
            } else {
                setFieldValue('image', {
                    uri: croppedImage.uri,
                    type: croppedImage.type,
                    name: croppedImage.name,
                });
            }
            // try {
            //     setLoading(true);
            //     let value1 = [];
            //     dataArray.map((item, index1) => {
            //         if (item != null) {
            //             value1.push(item);
            //         }
            //     });
            //     var formData = new FormData();
            //     formData.append('required_question', value1.length);
            //     formData.append('id', id);
            //     formData.append('type', 'user-profile-picture');
            //     formData.append('image[]', dataArray[index]);
            //     const responseData = await onEditProfilePictureApi(formData);
            //     if (responseData.data?.success) {
            //         setLoading(false);
            //         setImageResponseArray(responseData.data.data);
            //         let allImage = [];
            //         responseData.data.data.map((item, index) => {
            //             var type = item?.image.substring(
            //                 item?.image.lastIndexOf('.') + 1,
            //             );
            //             dataArray[index] = {
            //                 uri: item.image,
            //                 fileName: item.image,
            //                 type: `image/${type}`,
            //                 id: item.id,
            //             }
            //         });
            //         global.imageArray = dataArray
            //         setImageArray(dataArray);

            //         AsyncStorage.setItem('Image', JSON.stringify(allImage));
            //     } else {
            //         setLoading(false);
            //     }
            // } catch (err) {
            //     setLoading(false);
            //     console.log('Get Error::', err);
            // }
            // setRefresh(!refresh);
        });
    }

    return (
        <SafeAreaView style={appStyles.safeAreaView}>
            <View style={[styles?.container]}>
                <BackArrow onPress={() => navigation.goBack()} />
                <Toast position='top' />
                <Text style={styles?.heading}>Your Profile</Text>
                <Text style={styles?.welcomeText}>
                    Don't worry, only you can see your personal data.No one else will be able to see it.
                </Text>
                <Formik
                    initialValues={{ name: '', phone: '', gender: null, image: null }}
                    onSubmit={(values, { resetForm }) => {
                    }}
                    validationSchema={yup.object().shape({
                        name: yup.string().required('Name is required.'),
                        phone: yup.string().required('Phone Number is required.').matches(phoneRegExp, 'Phone number is not valid').min(10, 'Invalid phone number !').max(10, 'Invalid phone number !'),
                        gender: yup.object().nullable().required('Gender is required.'),
                    })}
                >
                    {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => {
                        return <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                                style={{ width: '100%' }}
                            >
                                {/* Profile Image */}
                                <View style={[styles?.imageContainer]}>
                                    {
                                        values?.image != null ?
                                            <Image source={{uri:values?.image?.uri}} style={{ height: '100%', width: '100%', borderRadius: hp(8) }} />
                                            :
                                            <View style={styles?.profileImageContainer}>
                                                <FontAwesome6 name='user-large' size={hp(4)} color={Colors.lightGrey} />
                                            </View>
                                    }
                                    {/* <Image source={profileImage} style={{ height: '100%', width: '100%', borderRadius: hp(8) }} /> */}
                                    <TouchableOpacity onPress={() => handleSelectImage(setFieldValue)} style={[styles?.editImageBox]} activeOpacity={.8}>
                                        <View style={[styles?.filledBox]}>
                                            <AntDesign name='edit' size={hp(2)} color={Colors.white} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* inputs */}
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
                                        <View style={[styles?.input, styles.numberContainer]}>
                                            <TouchableOpacity
                                                onPress={() => { setCountryModalVisible(!CountryModalVisible) }}
                                                style={styles.countryCodeBox}>
                                                <Text style={styles?.countryCodeText}>{countryCode}</Text>
                                                <CountryPicker
                                                    onClose={() => setCountryModalVisible(false)}
                                                    withFilter
                                                    withCallingCode
                                                    withCallingCodeButton
                                                    countryCode={countryCode}
                                                    visible={CountryModalVisible}
                                                    withFlagButton={false}
                                                    onSelect={onCountrySelect}
                                                    withModal={true}
                                                />
                                                <FontAwesome6 size={hp(1.6)} name='chevron-down' color={Colors.black} />
                                            </TouchableOpacity>
                                            <View style={styles.devider} />
                                            <TextInputCommon
                                                value={values.phone}
                                                onChangeText={handleChange('phone')}
                                                maxLength={10}
                                                keyboardType='decimal-pad'
                                                style={[styles.numberText, {}]}
                                                placeholder='**********'
                                            />
                                        </View>
                                        {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                                    </View>
                                    <View style={[styles?.inputBox]}>
                                        <Text style={styles?.label}>Gender</Text>
                                        <Dropdown
                                            showDropdown={showDropdown}
                                            setShowDropdown={setShowDropdown}
                                            current={'gender'}
                                            options={genderOptions}
                                            onSelect={(item) => {
                                                setFieldValue('gender', item)
                                            }} value={values?.gender?.label || 'Select'}
                                        />
                                        {touched.gender && errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
                                    </View>
                                </View>

                            </ScrollView>
                            <FilledButton text={'Complete Profile'} loading={loading}
                                onPress={() => handleSubmit()}
                            />
                        </>
                    }}
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
    numberContainer: {
        borderColor: Colors.borderGrey, borderRadius: hp(6), borderWidth: hp(.12), height: hp(6.4), paddingHorizontal: wp(4), alignItems: 'center',
        gap: wp(2.5)
    },
    countryCodeBox: {
        height: '100%', width: 'auto', justifyContent: "center", flexDirection: 'row', gap: wp(.5), alignItems: 'center'
    },
    countryCodeText: {
        color: Colors.black,
        fontSize: hp(2),
        fontFamily: Fonts.Roboto, textAlignVertical: 'center',
    },
    numberText: {
        fontSize: hp(2),
        color: Colors?.primaryBrown,
        paddingVertical: hp(1.1),
        letterSpacing: 1,
        fontFamily: Fonts.Roboto, textAlignVertical: 'center',
        flexGrow: 1,
        width: 'auto', flexGrow: 1, borderRadius: 0, borderWidth: 0, height: 'auto', paddingHorizontal: wp(.5)
    },
    devider: { backgroundColor: Colors.borderGrey, height: hp(3.2), width: wp(.2) },
    secureIcon: {
        height: hp(6.4),
        borderRadius: hp(6),
        borderWidth: hp(.12),
        borderColor: Colors?.borderGrey,
        width: '100%',
        justifyContent: 'space-between', alignItems: 'center',
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
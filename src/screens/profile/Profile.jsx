import { Image, Modal, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { Colors, Fonts } from '../../../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/CommonComp'
import profileImage from '../../assets/profile/boy.png'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FilledButton, OutLinedButton } from '../../components/InputComp/Button'
import { Routes } from '../../../services/Routes'
import { Context } from '../../context/Mycontext'
import { clearStorage } from '../../../services/storage'

const Profile = ({ navigation, route }) => {

  const { isVerified, setIsVerified, user, setUser } = useContext(Context)

  const [logoutVisible, setLogoutVisible] = useState(false)

  const handleLogOut = async () => {
    setIsVerified(0);
    setLogoutVisible(false);
    setUser(null)
    await clearStorage()
  }

  const [options, setOptions] = useState([]);

  const handleProfile = () => {
    navigation.navigate(Routes.Auth, { goback: true });
    return
    if (isVerified == 1) {
      navigation.navigate(Routes.EditProfile)
    } else {
      navigation.navigate(Routes.Auth, { goback: true });
    }
  }

  useEffect(() => {
    const updatedOptions = [
      { name: 'Your Profile', icon: <AntDesign name='user' color={Colors.primaryBrown} size={hp(2.5)} />, onPress: handleProfile },
      { name: 'Settings', icon: <Ionicons name='settings-outline' color={Colors.primaryBrown} size={hp(2.5)} />, onPress: () => navigation.navigate(Routes.Policy, { from: 'Settings' }) },
      {
        name: isVerified == 1 ? 'Log out' : 'Log in / Register', icon: <AntDesign name={isVerified == 1 ? 'logout' : 'login'} color={Colors.primaryBrown} size={hp(2.5)} />, onPress: () => {
          if (isVerified == 1) {
            setLogoutVisible(!logoutVisible);
          } else {
            navigation.navigate(Routes.Auth, { goback: true });
          }
        }
      },
    ];
    setOptions(updatedOptions);
  }, [isVerified]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, paddingBottom: Platform?.OS == 'ios' ? hp(2) : hp(5) }}>
      <View style={[styles?.container]}>
        <StatusBar
          backgroundColor={Colors.white}
        />
        <Header heading={'Profile'} boxStyle={[{ paddingBottom: hp(2.7), }]} onPress={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(5) }}
          style={[{ width: '100%' }]}
        >
          {/* Profile Image */}
          <View style={[styles?.imageContainer]}>
            <Image source={profileImage} style={{ height: '100%', width: '100%', borderRadius: hp(8) }} />
            <TouchableOpacity style={[styles?.editImageBox]} activeOpacity={.8}>
              <View style={[styles?.filledBox]}>
                <AntDesign name='edit' size={hp(2)} color={Colors.white} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Profile Name */}
          <Text style={[styles?.userName]}>{user?.name}</Text>

          {/* Options */}
          <View style={{ flexDirection: 'column', justifyContent: "flex-start", alignItems: 'center', width: '100%', }}>
            {
              options?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={.5}
                    onPress={item?.onPress}
                    style={[styles?.optionBtn]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(3) }}>
                      {item?.icon}
                      <Text style={[styles?.userName, { marginTop: 0, fontFamily: Fonts?.RobotoMedium, }]}>{item?.name}</Text>
                    </View>
                    <Octicons name='chevron-right' color={Colors.primaryBrown} size={hp(2.5)} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>

      </View>

      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutVisible}
        statusBarTranslucent
        onRequestClose={() => {
          setLogoutVisible(!logoutVisible);
        }}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={{
              width: '100%'
            }}
            activeOpacity={1}
            onPress={() => {
              // setReportVisible(false);
            }}>
            <View style={{ width: '100%', height: '100%' }} />
          </TouchableOpacity>
          <View style={[styles?.removeCartView, styles?.paddingX]}>
            <View style={[styles?.bottomTextView]}>
              <Text style={[styles?.userName, { fontSize: hp(2.3), fontFamily: Fonts?.RobotoMedium }]}>Logout</Text>
            </View>
            <Text style={[styles?.greyText]}>Are you sure you want to log out?</Text>
            <View style={[styles?.logoutBtns]}>
              <OutLinedButton onPress={() => setLogoutVisible(false)}
                text={'Cancel'} style={{ width: '49%', height: hp(6), paddingVertical: hp(.2), marginBottom: 0, marginTop: 0 }} />
              <FilledButton text={'Yes, Logout'}
                onPress={handleLogOut}
                btnStyle={{ width: '49%', height: hp(6), paddingVertical: hp(.2), marginTop: 0 }} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'center',
    backgroundColor: Colors.white, paddingBottom: hp(3.3), paddingHorizontal: wp(5.2),
  },
  paddingX: { paddingHorizontal: wp(5.2), },
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
  userName: {
    color: Colors?.black, fontSize: hp(2), fontFamily: Fonts?.RobotoBold, textAlign: 'center', marginTop: hp(2),
  },
  optionBtn: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: "center", gap: wp(2), width: '100%',
    borderBottomColor: Colors.borderGrey, borderBottomWidth: hp(.12), paddingVertical: hp(2.5)
  },
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  removeCartView: {
    flexDirection: 'column', gap: hp(1), justifyContent: 'flex-start',
    alignItems: 'center', backgroundColor: Colors.white, width: '100%', height: '55%',
    borderTopLeftRadius: hp(2), borderTopRightRadius: hp(2)
  },
  bottomTextView: {
    paddingVertical: hp(2), borderBottomColor: Colors.borderGrey,
    borderBottomWidth: hp(.12), width: '100%'
  },
  greyText: { marginVertical: hp(.4), color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.RobotoRegular, },
  logoutBtns: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', paddingVertical: hp(2), backgroundColor: Colors?.white
  },

})
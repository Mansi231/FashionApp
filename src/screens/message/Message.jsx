import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { Colors, Fonts } from '../../../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { hasNotch } from 'react-native-device-info';
import { Platform } from 'react-native'
import { FilledButton } from '../../components/InputComp/Button'
import { BackArrow } from '../../components/CommonComp'
import profileImage from '../../assets/profile/boy.png'
import msgImage from '../../assets/message/msgImage.png'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useKeyboardVisible } from '../../customHooks/useKeyboardVisible'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? hp(6) : 0;

const Message = ({ navigation }) => {

  const isKeyboardVisible = useKeyboardVisible();
  
  const [messages, setMessages] = useState([
    { msg: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`, },
    { msg: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`, },
    { image: msgImage, },
    { msg: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`, },
    { msg: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`, },
    { image: msgImage, },
  ])

  const handleRightBoxRender = (item) => {
    return (
      <View style={[styles?.msgBox, styles?.paddingX, { marginVertical: hp(1.5) }]}>
        {item.image ?
          <View style={[styles?.imageBox, styles?.leftTextBox]}>
            <Image source={msgImage} style={{ height: '100%', width: '100%', borderRadius: hp(1.5) }} />
          </View>
          :
          <View style={[styles?.textMsgBox, styles?.leftTextBox]}>
            <Text style={[styles?.textMsg, { color: Colors.white }]}>{item?.msg}</Text>
          </View>}
        <View style={[styles?.bottomTextBox, { alignSelf: 'flex-end' }]}>
          <Text style={styles.greyText}>08:04 pm</Text>
          <View style={[styles?.bottomTextBox, { justifyContent: 'flex-end' }]}>
            <Image source={profileImage} style={styles?.bottomProfileImage} />
            <Text style={styles.bottomName}>Angie Breke</Text>
          </View>
        </View>
      </View>
    )
  }
  return (

    <View style={[styles?.container]}>
      <View style={{
        width: "100%",
        height: STATUS_BAR_HEIGHT,
        backgroundColor: Colors.primaryBrown
      }} />

      <StatusBar
        backgroundColor={Colors.primaryBrown}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={[styles?.header, styles?.paddingX]}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: wp(3) }}>
          <BackArrow style={{ marginLeft: 0, marginTop: 0, backgroundColor: Colors.white }} onPress={() => navigation.goBack()} />
          <Image source={profileImage} style={[styles?.profileImage]} />
          <View>
            <Text style={styles?.userName}>Angie Breke</Text>
            <Text style={[styles?.userName, { fontSize: hp(1.8), fontFamily: Fonts?.PoppinsRegular }]}>online</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles?.threeDotsBtn]}>
          <Entypo name='dots-three-vertical' color={Colors.black} size={hp(2.5)} />
        </TouchableOpacity>
      </View>

      {/* Content card */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
        style={[{ width: '100%', backgroundColor: '#fdfdfd', }, styles?.box]}
      >
        <Text style={[styles?.msgDuration]}>Today</Text>
        {
          messages?.map((item, index) => {
            return (index % 2 == 0 ?
              handleRightBoxRender(item)
              :
              <View key={index} style={[styles?.msgBox, styles?.paddingX, { marginVertical: hp(1.5) }]}>
                {item.image ?
                  <View style={[styles?.imageBox]}>
                    <Image source={msgImage} style={{ height: '100%', width: '100%', borderRadius: hp(1.5) }} />
                  </View>
                  :
                  <View style={[styles?.textMsgBox]}>
                    <Text style={[styles?.textMsg]}>{item?.msg}</Text>
                  </View>}
                <View style={[styles?.bottomTextBox]}>
                  <View style={[styles?.bottomTextBox, { justifyContent: 'flex-start' }]}>
                    <Image source={profileImage} style={styles?.bottomProfileImage} />
                    <Text style={styles.bottomName}>Angie Breke</Text>
                  </View>
                  <Text style={styles.greyText}>08:04 pm</Text>
                </View>
              </View>
            )
          })
        }

      </ScrollView>
      <KeyboardAvoidingView enabled={true} behavior='padding'>
        <View style={[{ width: '100%', paddingVertical: hp(3), marginBottom:isKeyboardVisible ?  hp(2) :0 }, styles?.paddingX]}>
          <View style={styles?.bottomInputView}>
            <TouchableOpacity style={styles?.addBtn}>
              <Feather name='plus' color={Colors.primaryBrown} size={hp(3)} />
            </TouchableOpacity>
            <TextInput style={styles?.input} placeholder='Type a message here...' placeholderTextColor={Colors.lightGrey} />
            <TouchableOpacity style={[styles?.addBtn, { backgroundColor: Colors.primaryBrown }]}>
              <FontAwesome5 name='microphone-alt' color={Colors.white} size={hp(3)} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>

  )
}

export default Message

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'center',
    backgroundColor: Colors.white, paddingBottom: hp(3.3)
  },

  paddingX: { paddingHorizontal: wp(5.2), },

  header: {
    backgroundColor: Colors.primaryBrown, paddingVertical: hp(2), paddingBottom: hp(6.5),
    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center'
  },

  threeDotsBtn: { backgroundColor: Colors.white, height: hp(6), width: hp(6), borderRadius: hp(8), justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },

  profileImage: { height: hp(6), width: hp(6), borderRadius: hp(8) },

  userName: { color: Colors.white, fontFamily: Fonts.PoppinsMedium, fontSize: hp(2.1) },

  box: { backgroundColor: '#fdfdfd', borderTopRightRadius: hp(4), borderTopLeftRadius: hp(4), marginTop: -hp(4), width: '100%', flex: 1 },

  msgDuration: { textAlign: 'center', color: Colors.black, fontSize: hp(2.1), fontFamily: Fonts.RobotoMedium, letterSpacing: wp(.5), textTransform: 'uppercase', marginVertical: hp(2.5) },

  msgBox: {
    width: '100%', gap: hp(.8),

  },

  textMsgBox: {
    width: '80%', height: 'auto', borderRadius: hp(2), borderColor: Colors.borderGrey, borderWidth: hp(.12), backgroundColor: Colors.white, padding: hp(2), borderBottomLeftRadius: hp(.5)
  },

  imageBox: { width: '80%', height: hp(25), borderRadius: hp(1.5), borderColor: Colors.borderGrey, borderWidth: hp(.12), backgroundColor: Colors.white, paddingVertical: hp(1.3), paddingHorizontal: hp(1.3), borderBottomLeftRadius: hp(.5) },

  leftTextBox: {
    alignSelf: 'flex-end', backgroundColor: Colors.primaryBrown,
    borderBottomRightRadius: hp(.5), borderBottomLeftRadius: hp(2)
  },

  textMsg: { color: Colors.black, fontSize: hp(1.9), fontFamily: Fonts.PoppinsRegular, lineHeight: hp(3) },

  bottomTextBox: { flexDirection: 'row', flex: 1, width: '80%', justifyContent: 'space-between', alignItems: 'center', gap: wp(2) },

  bottomProfileImage: { height: hp(4), width: hp(4), borderRadius: hp(8) },
  greyText: { color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.PoppinsMedium, },

  bottomName: { color: Colors.black, fontSize: hp(1.9), fontFamily: Fonts.PoppinsMedium },

  bottomInputView: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: wp(2.5),
    flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: hp(1.5), width: '100%', gap: wp(4), borderRadius: hp(1)
  },

  addBtn: {
    height: hp(5), width: hp(5), borderRadius: hp(1.5), backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center'
  },

  input: {
    height: '100%', flex: 1, color: Colors.primaryBrown,
    fontFamily: Fonts.Roboto, fontSize: hp(2)
  },

}) 
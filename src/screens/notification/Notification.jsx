import { ScrollView, SectionList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { Colors, Fonts } from '../../../utils'
import { Header } from '../../components/CommonComp'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { appStyles } from '../../../App'

const Notification = ({navigation,route}) => {

  const [list, setList] = useState([
    {
      heading: 'Today', title: 'Mark all as read', data: [
        {
          icon: <MaterialCommunityIcons name='truck-check-outline' size={hp(4)} color={Colors.primaryBrown}/>, name: 'Order Shipped', duration: '1h', des: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
        },
        {
          icon: <MaterialCommunityIcons name='sale' size={hp(4)} color={Colors.primaryBrown}/>, name: 'Flash Sale Alert', duration: '1h', des: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
        },
        {
          icon: <AntDesign name='staro' size={hp(4)} color={Colors.primaryBrown}/>, name: 'Product Review Request', duration: '1h', des: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
        },
      ]
    },
    {
      heading: 'Yesterday', title: 'Mark all as read', data: [
        {
          icon: <MaterialCommunityIcons name='truck-check-outline' size={hp(4)} color={Colors.primaryBrown}/>, name: 'Order Shipped', duration: '1d', des: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
        },
        {
          icon: <Ionicons name='wallet-outline' size={hp(4)} color={Colors.primaryBrown}/>, name: 'New Paypal Added', duration: '1d', des: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
        },
        {
          icon:  <MaterialCommunityIcons name='sale' size={hp(4)} color={Colors.primaryBrown}/>, name: 'Flash Sale Alert', duration: '1d', des: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
        },
      ]
    },
  ])

  const notificationCount = () => {
    return (<View style={[styles?.notificationBox]}>
      <Text style={[styles?.notificationCount]}>2 New</Text>
    </View>)
  }
  return (

    <SafeAreaView style={appStyles.safeAreaView}>
      <View style={[styles?.container]}>

        {/* header */}
        <View style={[styles?.paddingX, { width: '100%' }]}>
          <Header heading={'Notification'} comp={notificationCount} boxStyle={[{ paddingBottom: hp(2.7), }]} onPress={()=>navigation.goBack()}/>
        </View>

        {/* List */}
        <SectionList
          style={{ width: '100%' }}
          sections={list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <>
              <View style={[styles?.box, , styles?.paddingX,
              {
                backgroundColor: index % 2 == 0 ? Colors.white : Colors.AntiFlashWhite,
                borderBottomWidth: list[0]?.data.length - 1 == index ? 0 : hp(.12)
              }]}>
                <View style={[styles?.iconContainer, {
                  backgroundColor: index % 2 == 0 ? Colors.AntiFlashWhite : Colors.white,
                }]}>
                  {item?.icon}
                </View>
                <View style={{ flex: .9, gap: hp(1) }}>
                  <Text style={[styles?.itemName]}>{item?.name}</Text>
                  <Text style={[styles?.text]}>{item?.des}</Text>
                </View>
                <Text style={[styles?.text, { alignSelf: 'flex-start' }]}>{item?.duration}</Text>
              </View>
            </>
          )}
          renderSectionHeader={({ section: header }) => (
            <View style={[styles.textBox, styles?.paddingX]}>
              <Text style={[styles?.greyHeading]}>{header?.heading}</Text>
              <Text style={[styles?.brownText]}>{header?.title}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'center',
    backgroundColor: Colors.white, paddingBottom: hp(3.3)
  },
  paddingX: { paddingHorizontal: wp(5.2), },
  notificationBox: {
    backgroundColor: Colors.primaryBrown, paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.5), position: 'absolute', right: 0, borderRadius: hp(8),

  },
  notificationCount: {
    color: Colors.white, fontSize: hp(1.6), textTransform: 'uppercase',
    fontFamily: Fonts?.RobotoMedium
  },
  textBox: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.white, paddingVertical: hp(2)
  },
  greyHeading: {
    fontSize: hp(2.1), fontFamily: Fonts?.RobotoRegular, color: Colors?.grey,
    textTransform: 'uppercase', letterSpacing: wp(.8)
  },
  brownText: {
    color: Colors.primaryBrown, fontSize: hp(2.1), fontFamily: Fonts?.RobotoRegular
  },
  box: {
    flexDirection: 'row', justifyContent: 'space-between',
    gap: wp(2), alignItems: 'center', paddingVertical: hp(2),
    borderBottomColor: Colors.borderGrey, borderBottomWidth: hp(.12)
  },
  iconContainer: {
    height: hp(8), width: hp(8), justifyContent: 'center', alignItems: 'center',
    backgroundColor: Colors?.AntiFlashWhite, borderRadius: hp(8)
  },
  itemName: {
    color: Colors?.black, fontSize: hp(2), fontFamily: Fonts?.RobotoMedium, textAlign: 'left',
  },
  text: {
    color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.RobotoRegular,
  },
})
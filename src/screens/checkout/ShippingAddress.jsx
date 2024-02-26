import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { BackArrow } from '../../components/CommonComp'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from '../../../pixel'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FilledButton } from '../../components/InputComp/Button'
import styles from './styles'

const ShippingAddress = ({navigation,route}) => {

  const [addressList, setAddressList] = useState([
    { name: 'Home', des: '1901 Thornridge Cir. Shiloh , Hawaii 81063' },
    { name: 'Office', des: '1901 Thornridge Cir. Shiloh , Hawaii 81063' },
    { name: `Parent's House`, des: '1901 Thornridge Cir. Shiloh , Hawaii 81063' },
    { name: `Friend's House`, des: '1901 Thornridge Cir. Shiloh , Hawaii 81063' },
  ])
  const [selectedAddress, setselectedAddress] = useState(addressList[0])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={[styles?.container]}>

        {/* header */}
        <View style={[styles?.header, styles?.paddingX]}>
          <BackArrow style={{ marginLeft: 0, backgroundColor: Colors.white, position: 'absolute', left: 0, }} onPress={() => navigation.goBack()} />
          <Text style={styles?.headerText}>Shipping Address</Text>
          <View />
        </View>

        {/* address list */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10) }}
          style={{ width: '100%' }}
        >
          {
            addressList.map((item, index) => {
              return (
                <View key={index} style={[styles?.addressBox, { marginTop: hp(4), borderBottomWidth: index != addressList?.length - 1 ? hp(.12) : 0 }]}>
                  <View>
                    <SimpleLineIcons name='location-pin' size={hp(3)} color={Colors.black} />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', gap: wp(3), justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={[{ flex: .7 }]}>
                      <Text style={[styles?.heading, { fontSize: hp(2.2) }]}>{item?.name}</Text>
                      <Text style={[styles?.greyText]}>{item?.des}</Text>
                    </View>
                    <View style={{ flex: .3, alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => setselectedAddress(item)}>
                        <MaterialIcons name={selectedAddress?.name == item?.name ? 'radio-button-checked' : 'radio-button-unchecked'} size={hp(3.5)} color={Colors.primaryBrown} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            })
          }

          <TouchableOpacity style={{
            height: hp(8), width: '100%', borderColor: Colors.primaryBrown, borderRadius: hp(1),
            borderWidth: hp(.12), borderStyle: 'dashed', marginVertical: hp(2), alignSelf: 'center',
            justifyContent: 'center', alignItems: 'center', backgroundColor: Colors?.AntiFlashWhite
          }}>
            <Text style={{ color: Colors.primaryBrown, fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1) }}>
              <FontAwesome6 name='plus' size={hp(2.2)} />{' '} Add New Shiiping Address
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={[styles?.cartBtnView, { marginVertical: 0 }]}>
          <FilledButton
            text={'Apply'}
            btnStyle={{ flex: 1, marginTop: 0, height: hp(5.6), paddingVertical: hp(.2) }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ShippingAddress


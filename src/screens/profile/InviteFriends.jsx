import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { Header } from '../../components/CommonComp'
import { styles } from './Policy'
import profileImage from '../../assets/profile/boy.png'
import { FilledButton } from '../../components/InputComp/Button'

const InviteFriends = ({ navigation, route }) => {

    const [friendList, setFriendList] = useState([
        { image: profileImage, name: 'Carla Schoen', point: '207.555.0119' },
        { image: profileImage, name: 'Esther Howard', point: '207.555.0119' },
        { image: profileImage, name: 'Robert Fox', point: '207.555.0119' },
        { image: profileImage, name: 'Jacob Jones', point: '207.555.0119' },
        { image: profileImage, name: 'Carla Schoen', point: '207.555.0119' },
        { image: profileImage, name: 'Darlene Robertson', point: '207.555.0119' },
        { image: profileImage, name: 'Ralph Edwards', point: '207.555.0119' },
        { image: profileImage, name: 'Ronald Richard', point: '207.555.0119' },
        { image: profileImage, name: 'John Doe', point: '207.555.0119' },
        { image: profileImage, name: 'Courtney Henry', point: '207.555.0119' },
        { image: profileImage, name: 'Willian Benz', point: '207.555.0119' },
        { image: profileImage, name: 'Robert Pattison', point: '207.555.0119' },
        { image: profileImage, name: 'Cristal Wannes', point: '207.555.0119' },
        { image: profileImage, name: 'Carla Schoen', point: '207.555.0119' },
    ])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
            <View style={[styles?.container]}>
                <Header heading={'Invite Friends'} boxStyle={[{ paddingBottom: hp(2.7), }]} onPress={() => navigation.goBack()} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(5), paddingTop: hp(.5) }}
                    style={[{ width: '100%' }]}
                >
                    {
                        friendList?.map((item, index) => {
                            return (
                                <View style={[styles?.listBox]} key={index}>
                                    <View style={[styles?.box]}>
                                        <Image source={item?.image} style={[styles?.userImage]} />
                                        <View>
                                            <Text style={[styles?.userName]}>{item?.name}</Text>
                                            <Text style={[styles?.greyText, { marginVertical: 0 }]}>{item?.point}</Text>
                                        </View>
                                    </View>
                                    <FilledButton
                                        text={'Invite'}
                                        btnStyle={{ width: 'auto', height: hp(4.5), paddingVertical: hp(.12), paddingHorizontal: wp(2.5) }}
                                        textStyle={{ fontSize: hp(1.9), FontFamily: Fonts?.PoppinsMedium }}
                                    />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(InviteFriends)


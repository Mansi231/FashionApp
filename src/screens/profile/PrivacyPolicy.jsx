import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { Header } from '../../components/CommonComp'
import { styles } from './Policy'

const PrivacyPolicy = ({ navigation, route }) => {

    let fromRoutes = { InviteFriends: 'InviteFriends', PrivacyPolicy: "PrivacyPolicy" }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
            <View style={[styles?.container]}>
                <Header heading={'Privacy Policy'} boxStyle={[{ paddingBottom: hp(2.7), }]} onPress={() => navigation.goBack()} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(5),paddingTop:hp(2) }}
                    style={[{ width: '100%' }]}
                >
                    <Text style={[styles?.brownText]}>
                        Cancelation Policy
                    </Text>
                    <Text style={[styles?.greyText]}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, fugiat cupiditate assumenda aliquam ratione numquam rerum error quam omnis dolor dolorum. Ut et eius cum harum adipisci, mollitia maxime asperiores?
                        {'\n\n'}
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis quae libero saepe sed molestiae.
                    </Text>
                    <Text style={[styles?.brownText]}>
                        Terms & Condition
                    </Text>
                    <Text style={[styles?.greyText]}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, fugiat cupiditate assumenda aliquam ratione numquam rerum error quam omnis dolor dolorum. Ut et eius cum harum adipisci, mollitia maxime asperiores?
                        {'\n\n'}
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis quae libero saepe sed molestiae.
                        {'\n\n'}
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse unde iure perspiciatis. Dolorem magni, velit nemo saepe ducimus dignissimos enim nobis quaerat odio beatae atque aut. Deleniti corporis nulla voluptas?
                        {'\n\n'}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, doloribus iure quibusdam deleniti nisi explicabo id asperiores ea vel corrupti modi velit culpa laboriosam veniam consequatur nihil voluptates neque optio!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptas minima culpa, quos fugiat nam, dignissimos corrupti repellendus repudiandae ducimus dolores reprehenderit aspernatur ratione consectetur sit assumenda maiores, eaque iste.
                    </Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(PrivacyPolicy)

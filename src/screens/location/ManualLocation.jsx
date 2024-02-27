import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts } from '../../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackArrow } from '../../components/CommonComp'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import TextInput from '../../components/InputComp/TextInputCommon'

const ManualLocation = ({navigation}) => {

    const [serachValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([
        { location: 'Golden Avenue', address: '8502 Preston Rd.Ingl..' },
        { location: 'Golden Avenue', address: '8502 Preston Rd.Ingl..' },
        { location: 'Golden Avenue', address: '8502 Preston Rd.Ingl..' },
    ])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles?.container]}>
                <View style={[styles?.header]}>
                    <BackArrow style={{ marginLeft: 0 }} onPress={()=>navigation.goBack()}/>
                    <Text style={styles?.headerText}>Enter Your Location</Text>
                    <View />
                </View>
                <View style={styles?.searchBox}>
                    <Feather name='search' color={Colors.black} size={hp(3.3)} />
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={{ borderWidth: 0 }}
                            keyboardType={'default'}
                            onChangeText={(value) => setSearchValue(value)}
                            value={serachValue}
                            placeholder={''}
                        />
                    </View>
                    {serachValue && <MaterialIcons
                        onPress={() => setSearchValue('')}
                        name='highlight-remove'
                        color={Colors?.primaryBrown} size={hp(3.3)} />}
                </View>
                <TouchableOpacity style={[styles.currentLocationBox]}>
                    <FontAwesome6 name='location-arrow' color={Colors.primaryBrown} size={hp(3)} />
                    <Text style={[styles?.currentLocationText]}>Use my current location</Text>
                </TouchableOpacity>
                <Text style={[styles?.resultText]}>search result</Text>
                <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={searchResults}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.searchresult}>
                                <View style={[styles.currentLocationBox, styles.locationBox]}>
                                    <FontAwesome6 name='location-arrow' color={Colors.primaryBrown} size={hp(3)} />
                                    <Text style={[styles?.currentLocationText]}>{item?.location}</Text>
                                </View>
                                <Text style={styles?.addressText}>{item?.address}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default ManualLocation

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: wp(5.2) },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        width: '100%', marginVertical: hp(1)
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1)
    },
    searchBox: {
        height: hp(6.4), borderRadius: hp(6),
        borderWidth: hp(.12),
        borderColor: Colors?.borderGrey, textAlign: 'left',
        width: '100%', marginVertical: hp(2), flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: wp(2.5)
    },
    currentLocationBox: {
        flexDirection: 'row', justifyContent: 'flex-start', gap: wp(3), alignItems: 'center',
        marginVertical: hp(1), borderBottomColor: Colors.borderGrey, width: '100%',
        borderBottomWidth: hp(.2), paddingBottom: hp(2)
    },
    currentLocationText: { color: Colors.black, fontSize: hp(2.3), fontFamily: Fonts?.RobotoMedium },
    resultText: {
        color: Colors.grey, fontFamily: Fonts?.RobotoMedium, fontSize: hp(1.9),
        textAlign: 'left', width: '100%', textTransform: 'uppercase', letterSpacing: wp(.6)
    },
    locationBox: {
        marginVertical: 0,
        borderBottomWidth: 0, paddingBottom: hp(.2)
    },
    searchresult: {
        flexDirection: 'column', gap: hp(.3), justifyContent: 'flex-start',
        alignItems: 'center', marginVertical: hp(2)
    },
    addressText:{textAlign:'left',width:'100%',color:Colors.grey},
})
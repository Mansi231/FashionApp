import { Platform, StatusBar, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/CommonComp'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { Colors, Fonts } from '../../../utils'
import c1 from '../../assets/home/c1.png'
import c2 from '../../assets/home/c2.png'
import c3 from '../../assets/home/c3.png'
import c4 from '../../assets/home/c4.png'
import { Routes } from '../../../services/Routes'
import { IMAGE_URL } from '@env';

const AllCategory = ({ navigation, route }) => {
    
    let {params:{category}} = route;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors?.white, paddingBottom: Platform?.OS == 'ios' ? hp(2) : hp(6) }}>
            <View style={[styles?.container]}>
                <StatusBar backgroundColor={Colors.white} />

                {/* header */}
                <View style={[{ width: '100%' }]}>
                    <Header heading={'All Category'} boxStyle={[{ paddingBottom: hp(2.7) }]} onPress={() => navigation.goBack()} />
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={[{ flex: 1, width: '100%', marginVertical: hp(1) },]}
                    data={category}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={()=>navigation.navigate(Routes.CategoryProducts,{category:item})} style={[styles?.categoryView]}>
                                <Image source={{uri:`${IMAGE_URL}${item?.image}`}} style={[styles?.categoryImage]} />
                                <Text style={[styles?.categoryName]}>{item?.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default AllCategory

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        paddingHorizontal: wp(5.2), backgroundColor: Colors.white
    },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        width: '100%', paddingVertical: hp(1), backgroundColor: Colors?.white
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1), marginTop: hp(1.5)
    },

    categoryView: {
        flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
        height: hp(19), width: '50%',gap:hp(1),
        paddingVertical: hp(2),marginVertical:hp(1)
    },
    categoryImage: { width: hp(19), height: '100%', borderRadius: hp(1) ,resizeMode:'cover',borderWidth:hp(.12),borderColor:Colors.borderGrey},

    categoryName: { color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.RobotoMedium, textAlign: 'left', width: hp(19) },
})
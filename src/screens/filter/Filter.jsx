import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import { Colors, Fonts } from '../../../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/CommonComp'
import { FilledButton } from '../../components/InputComp/Button'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Context } from '../../context/Mycontext'

const Filter = ({ navigation, route }) => {

    let { selectedFilter, setSelectedFilter } = useContext(Context)
    const [brands, setBrands] = useState([
        'All', 'Nike', 'Adidas', 'Puma', 'Zara'
    ])

    const [genders, setGenders] = useState([
        'All', 'Women', 'Men'
    ])

    const [sortBy, setSortBy] = useState([
        'Most Recent', 'Popular', 'Price High', 'Low Price'
    ])
    const [ratings, setRatings] = useState([
        { rating: '4.5 and above' },
        { rating: '4.0 - 4.5' },
        { rating: '3.5 - 4.0' },
        { rating: '3.0 - 3.5' },
        { rating: '2.5 - 3.0' },
        { rating: '2.0 - 2.5' },
        { rating: '1.5 - 2.0' },
    ])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
            <View style={[styles?.container, styles?.paddingX]}>
                <StatusBar backgroundColor={Colors.white} />

                {/* header */}
                <Header heading={'Filter'} onPress={() => navigation.goBack()} boxStyle={[{ paddingBottom: hp(2.7), }]} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10), paddingTop: hp(2) }}
                    style={{ width: '100%' }}
                >
                    <Text style={[styles?.heading]}>Brands</Text>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={[{ width: '100%', }]}
                            data={brands}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={[styles.tag, {
                                        backgroundColor: selectedFilter?.brand == item ? Colors.primaryBrown : Colors.AntiFlashWhite
                                    }]} onPress={() => setSelectedFilter({ ...selectedFilter, brand: item })}>
                                        <Text style={[styles.tagText, {
                                            color: selectedFilter?.brand == item ? Colors.white : Colors.black
                                        }]}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                    <Text style={[styles?.heading,{marginTop:hp(2.5)}]}>Gender</Text>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={[{ width: '100%' }]}
                            data={genders}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={[styles.tag, {
                                        backgroundColor: selectedFilter?.gender == item ? Colors.primaryBrown : Colors.AntiFlashWhite
                                    }]} onPress={() => setSelectedFilter({ ...selectedFilter, gender: item })}>
                                        <Text style={[styles.tagText, {
                                            color: selectedFilter?.gender == item ? Colors.white : Colors.black
                                        }]}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                    <Text style={[styles?.heading,{marginTop:hp(2.5)}]}>Sort by</Text>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={[{ width: '100%' }]}
                            data={sortBy}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={[styles.tag, {
                                        backgroundColor: selectedFilter?.sortBy == item ? Colors.primaryBrown : Colors.AntiFlashWhite
                                    }]} onPress={() => setSelectedFilter({ ...selectedFilter, sortBy: item })}>
                                        <Text style={[styles.tagText, {
                                            color: selectedFilter?.sortBy == item ? Colors.white : Colors.black
                                        }]}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                    <Text style={[styles?.heading,{marginTop:hp(2.5)}]}>Pricing Range</Text>

                    <Text style={[styles?.heading,{marginTop:hp(2.5)}]}>Reviews</Text>
                    {
                        ratings.map((item, index) => {
                            return <View
                                key={index}
                                style={[styles?.ratingBox]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(1) }}>
                                    {
                                        Array.from({ length: 5 }, (v, i, k) => i).map((item) => {
                                            return <FontAwesome key={item} name='star' size={hp(3)} color={Colors?.yellow} />
                                        })
                                    }
                                    <Text style={[styles?.ratingText]}>{item?.rating}</Text>
                                </View>
                                <MaterialIcons
                                    onPress={() => setSelectedFilter({ ...selectedFilter, rating: item?.rating })}
                                    name={selectedFilter?.rating == item?.rating ? 'radio-button-checked' : 'radio-button-unchecked'} size={hp(3.6)}
                                    color={selectedFilter?.rating == item?.rating ? Colors.primaryBrown : Colors.borderGrey} />
                            </View>
                        })
                    }
                </ScrollView>
                <View style={[styles?.bottomBtn, styles.paddingX]}>
                    <FilledButton btnStyle={{ marginTop: 0, width: '48%', height: hp(6), backgroundColor: Colors?.AntiFlashWhite }} text={'reset Filter'} textStyle={{ color: Colors.primaryBrown }} />
                    <FilledButton btnStyle={{ marginTop: 0, width: '48%', height: hp(6) }} text={'Apply'} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Filter

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingBottom: hp(3.3)
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    heading: {
        fontSize: hp(2.1), fontFamily: Fonts?.RobotoMedium, color: Colors?.black,
        marginVertical: hp(1.5)
    },
    tag: {
        backgroundColor: Colors.primaryBrown, paddingHorizontal: wp(4), height: hp(4.5),
        borderRadius: hp(8), marginHorizontal: wp(1), justifyContent: 'center', alignItems: 'center'
    },
    tagText: { color: Colors.white, fontFamily: Fonts.RobotoMedium, fontSize: hp(1.8) },
    bottomBtn: {
        paddingVertical: hp(2), borderColor: Colors?.borderGrey, borderWidth: hp(.12),
        borderTopLeftRadius: hp(2), borderTopRightRadius: hp(2), borderBottomWidth: 0,
        bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: Colors?.white,
        justifyContent: 'space-between', alignItems: 'center',
        flexDirection: 'row',
    },
    ratingBox: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: "center", gap: wp(2), marginVertical: hp(1)
    },
    ratingText: {
        color: Colors.black, fontFamily: Fonts.RobotoMedium,
        fontSize: hp(1.9), marginLeft: wp(1.5)
    },
})